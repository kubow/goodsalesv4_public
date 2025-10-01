import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IDateFilter } from "@gooddata/sdk-model";
import { InsightView } from '@gooddata/sdk-ui-ext';
import { GoodDataWrapper } from '../gooddata/GoodDataWrapper';
import { MapboxTokenProvider } from "@gooddata/sdk-ui-geo";
import { Link } from "react-router";

interface CustomersMapProps {
  dateFilter: IDateFilter;
  backend: IAnalyticalBackend;
  workspace: string;
}

export default function CustomersMap({ dateFilter }: CustomersMapProps) {

  const allFilters = dateFilter ? [dateFilter] : [];


  return (
    <div className="dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-normal text-gray-900 dark:text-white">
          Customers & Orders Locations
        </h3>
        <Link to="/customers" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Customer Details →
        </Link>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 h-160">
            <GoodDataWrapper>
              <MapboxTokenProvider token={"pk.eyJ1IjoiZ29vZGRhdGEiLCJhIjoiY2xlZnMwbjlhMGVsZTNvdHRtNmNuOXJ6ZiJ9.VO4dAkUu0pLge66ZBf99NQ"}>
                <div className="h-150">
                  <InsightView
                      insight="8eec84f3-88f7-42d7-9472-da144be7f2c4"
                      filters={allFilters}
                  />
                </div>
              </MapboxTokenProvider>
            </GoodDataWrapper>
        </div>
      </div>
    </div>
  );
}
