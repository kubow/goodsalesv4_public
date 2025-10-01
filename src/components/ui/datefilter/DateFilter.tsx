import React from "react";
import { DateFilter, DateFilterOption, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import { DateFilterGranularity } from "@gooddata/sdk-model";
import { GoodDataWrapper } from "../../gooddata/GoodDataWrapper";

const availableGranularities: DateFilterGranularity[] = [
    "GDC.time.date",
    "GDC.time.month",
    "GDC.time.quarter",
    "GDC.time.year",
];

export interface IDateFilterState {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
}

export interface IFilterComponentProps {
    filter: IDateFilterState;
    setFilter: (filter: IDateFilterState) => void;
}

const Filter: React.FC<IFilterComponentProps> = (props) => {
    const { filter, setFilter } = props;
    const { excludeCurrentPeriod, selectedFilterOption } = filter;
    
    const onApply = (selectedFilterOption: DateFilterOption, excludeCurrentPeriod: boolean) => {
        setFilter({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    return (
        <GoodDataWrapper className="w-full h-10">
            <DateFilter
                excludeCurrentPeriod={excludeCurrentPeriod}
                selectedFilterOption={selectedFilterOption}
                filterOptions={defaultDateFilterOptions}
                availableGranularities={availableGranularities}
                customFilterName="Date Filter"
                dateFilterMode="active"
                onApply={onApply}
            />
        </GoodDataWrapper>
    );
};

export default Filter;