import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { backend } from "../../components/auth/backend";
// GoodData imports for future integration
import { DateFilterHelpers, DateFilterOption, RelativeDateFilterOption } from "@gooddata/sdk-ui-filters";
// import "@gooddata/sdk-ui-dashboard/styles/css/main.css";
// import "@gooddata/sdk-ui-filters/styles/css/main.css";

import * as Md from "../../../md/ecommerce";
import KpiMetrics from "../../components/ecommerce/KpiMetrics";
import TopProducts from "../../components/ecommerce/TopProducts";
import DateFilter from "../../components/ui/datefilter/DateFilter";
import CustomersMap from "../../components/ecommerce/CustomersMap";
import { workspaceId } from "../../components/gooddata/GoodDataProviders";

// Interface for future GoodData date filter integration
export interface IDateFilterComponentExampleState {
    selectedFilterOption: DateFilterOption;
    excludeCurrentPeriod: boolean;
}

const selectedValue: RelativeDateFilterOption = {
    from: -1,
    to: -1,
    granularity: "GDC.time.month",
    localIdentifier: "LAST_MONTH",
    type: "relativePreset",
    visible: true,
    name: "",
};

export default function Home() {
  // State for future GoodData date filter integration
  const [filter, setFilter] = useState<IDateFilterComponentExampleState>({
    selectedFilterOption: selectedValue,
    excludeCurrentPeriod: false,
  });

  // Date filter for future GoodData integration
  const dateFilter = DateFilterHelpers.mapOptionToAfm(
    filter.selectedFilterOption,
    Md.DateDatasets.Date.ref,
    filter.excludeCurrentPeriod,
  );

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* Header with Title and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <h1 className="text-4xl font-light text-gray-900 dark:text-white">
          Good eCommerce
        </h1>
        <div className="flex justify-end">
          <DateFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>

      {/* KPI Metrics with Integrated Charts */}
      <KpiMetrics dateFilter={dateFilter} backend={backend} workspace={workspaceId} />

      {/* Top Products Section */}
      <TopProducts dateFilter={dateFilter} backend={backend} workspace={workspaceId} />

      {/* Customers & Orders Locations Section */}
      <CustomersMap dateFilter={dateFilter} backend={backend} workspace={workspaceId} />
    </>
  );
}
