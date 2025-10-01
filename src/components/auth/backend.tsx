import tigerFactory, {
    ContextDeferredAuthProvider,
    redirectToTigerAuthentication,
} from "@gooddata/sdk-backend-tiger";
import { IAnalyticalBackend, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import {
    IAttribute,
    IAttributeOrMeasure,
    IDimension,
    INullableFilter,
    ISortItem,
    ITotal,
    MeasureGroupIdentifier,
    isAttribute,
    isMeasure,
    newDimension,
    newTwoDimensional,
} from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty";
import compact from "lodash/compact";
import { effectiveHostname } from "../../config/gooddataConfig";

// Initialize GoodData backend using the effective hostname
export const backend = tigerFactory()
    .onHostname(effectiveHostname) // this should be the domain where the GoodData Cloud or GoodData.CN is hosted
    .withAuthentication(new ContextDeferredAuthProvider(redirectToTigerAuthentication));

export type CreateExecutionOptions = {
    /**
     * Backend to execute against.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;

    /**
     * Workspace in whose context to perform the execution.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;

    /**
     * Data series will be built using the provided measures that are further scoped for
     * elements of the specified attributes.
     */
    seriesBy?: IAttributeOrMeasure[];

    /**
     * Slice all data series by elements of these attributes.
     */
    slicesBy?: IAttribute[];

    /**
     * Include these totals among the data slices.
     */
    totals?: ITotal[];

    /**
     * Filters to apply on server side.
     */
    filters?: INullableFilter[];

    /**
     * Sorting to apply on server side.
     */
    sortBy?: ISortItem[];

    /**
     * Informative name of the component.
     *
     * @remarks
     * This value is sent as telemetry information together
     * with the actual execution request. We recommend to set this because it can be useful for diagnostic
     * purposes.
     *
     * Defaults 'Execute'.
     */
    componentName?: string;
};

export function seriesOnlyDim(seriesBy: IAttributeOrMeasure[]): IDimension[] {
    return [
        newDimension(
            compact([
                ...seriesBy.filter(isAttribute),
                // only include MeasureGroupIdentifier if there are some measures, otherwise the execution will always fail on the backend
                seriesBy.some(isMeasure) && MeasureGroupIdentifier,
            ]),
        ),
    ];
}

export function seriesAndSlicesDim(
    seriesBy: IAttributeOrMeasure[],
    slices: IAttribute[],
    totals: ITotal[],
): IDimension[] {
    return newTwoDimensional(
        [...slices, ...totals],
        compact([
            ...seriesBy.filter(isAttribute),
            // only include MeasureGroupIdentifier if there are some measures, otherwise the execution will always fail on the backend
            seriesBy.some(isMeasure) && MeasureGroupIdentifier,
        ]),
    );
}

export function createExecution(options: CreateExecutionOptions): IPreparedExecution {
    const {
        backend,
        workspace,
        seriesBy = [],
        slicesBy = [],
        filters = [],
        sortBy = [],
        totals = [],
        componentName = "Execution",
    } = options;
    invariant(
        backend && workspace,
        "backend and workspace must be either specified explicitly or be provided by context",
    );

    const dimensions = isEmpty(slicesBy)
        ? seriesOnlyDim(seriesBy)
        : seriesAndSlicesDim(seriesBy, slicesBy, totals);

    return backend
        .withTelemetry(componentName, options)
        .workspace(workspace)
        .execution()
        .forItems(seriesBy.concat(slicesBy), filters)
        .withSorting(...sortBy)
        .withDimensions(...dimensions);
}