import { useState, Fragment } from 'react';
import KpiCard from './KpiCard';
import { DollarIcon, ShoppingBagIcon, GroupIcon, ChartIcon } from '../../icons';
import { useExecutionDataView, LoadingComponent, ErrorComponent } from "@gooddata/sdk-ui";
import { InsightView } from '@gooddata/sdk-ui-ext';
import { ColumnChart, LineChart, DonutChart, ComboChart } from "@gooddata/sdk-ui-charts";
import { IDateFilter } from '@gooddata/sdk-model';
import { GoodDataWrapper } from '../gooddata/GoodDataWrapper';
import { createExecution } from "../../components/auth/backend";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import * as Md from "../../../md/ecommerce";


interface KpiData {
    id: string;
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
    subtitle?: string;
    content: React.ReactNode;
}

interface KpiMetricsProps {
    dateFilter?: IDateFilter;
    backend?: IAnalyticalBackend;
    workspace?: string;
}

export default function KpiMetrics({ dateFilter, backend, workspace }: KpiMetricsProps) {
    const [selectedKpi, setSelectedKpi] = useState('net-sales');

    const allFilters = dateFilter ? [dateFilter] : [];

    const metrics = [
        Md.NetSales,
        Md.NetSalesPP,
        Md.NetOrders,
        Md.NetOrdersPP,
        Md.ActiveCustomers,
        Md.ActiveCustomersPP,
        Md.GrossProfitMargin,
        Md.GrossProfitMarginPP,
    ];

    const execution = createExecution({
        backend: backend,
        workspace: workspace,
        seriesBy: metrics,
        filters: allFilters,
    });

    const { result, error, status } = useExecutionDataView({ execution: execution });

    const series = result?.data().series().toArray();

    const m0raw = series?.[0]?.rawData();
    const m1raw = series?.[1]?.rawData();
    const m2raw = series?.[2]?.rawData();
    const m3raw = series?.[3]?.rawData();
    const m4raw = series?.[4]?.rawData();
    const m5raw = series?.[5]?.rawData();
    const m6raw = series?.[6]?.rawData();
    const m7raw = series?.[7]?.rawData();
    const diff1 = Math.round(((Number(m0raw) - Number(m1raw)) / Number(m1raw)) * 100);
    const diff2 = Math.round(((Number(m2raw) - Number(m3raw)) / Number(m3raw)) * 100);
    const diff3 = Math.round(((Number(m4raw) - Number(m5raw)) / Number(m5raw)) * 100);
    const diff4 = Math.round(((Number(m6raw) - Number(m7raw)) / Number(m7raw)) * 100);

    const netSalesString: string = series?.[0]?.dataPoints()[0]?.formattedValue() || "";
    const nrOfOrdersString: string = series?.[2]?.dataPoints()[0]?.formattedValue() || "";
    const activeCustomersString: string = series?.[4]?.dataPoints()[0]?.formattedValue() || "";
    const grossProfitMarginString: string = series?.[6]?.dataPoints()[0]?.formattedValue() || "";

    const kpiData: KpiData[] = [
        {
            id: 'net-sales',
            title: "Net Sales",
            value: netSalesString,
            change: `${diff1}%`,
            changeType: diff1 <= 0 ? "negative" : "positive",
            icon: <DollarIcon className="w-6 h-6 text-blue-600" />,
            subtitle: "vs. last month",
            content:
                <div className="p-4 grid grid-cols-12 h-90">
                    <div className="col-span-7 h-80">
                        <h3 className="text-center text-gray-800 dark:text-white">Net Sales Trend</h3>
                        <GoodDataWrapper>
                            <div className="h-80">
                                <LineChart
                                    measures={[Md.NetSales, Md.TotalSales]}
                                    trendBy={Md.DateDatasets.Date.DateDate.Default}
                                    filters={allFilters}
                                    config={{
                                        colors: ["#9D1D00", "#E1340D"],
                                        legend: {
                                            enabled: true,
                                            position: "bottom"
                                        }
                                    }}
                                />
                            </div>
                        </GoodDataWrapper>
                    </div>
                    <div className="col-span-5 h-80">
                        <h3 className="text-center text-gray-800 dark:text-white">Orders and sales per category</h3>
                        <GoodDataWrapper>
                            <div className="h-80">
                                <ColumnChart
                                    measures={[Md.NetSales]}
                                    viewBy={Md.DateDatasets.Date.DateDate.Default}
                                    stackBy={Md.ProductCategory}
                                    filters={allFilters}
                                    config={{
                                        colors: ["#9D1D00", "#E1340D", "#F14F2A", "#F5846B", "#F8AD9C"]
                                    }}
                                />
                            </div>
                        </GoodDataWrapper>
                    </div>
                </div>
        },
        {
            id: 'orders',
            title: "Orders",
            value: nrOfOrdersString,
            change: `${diff2}%`,
            changeType: diff2 <= 0 ? "negative" : "positive",
            icon: <ShoppingBagIcon className="w-6 h-6 text-green-600" />,
            subtitle: "vs. last month",
            content:
                <div className="p-4 grid grid-cols-12 h-90">
                    <div className="col-span-12 h-80">
                        <h3 className="text-center">Orders and sales per category</h3>
                        <GoodDataWrapper>
                            <div className="h-80">
                                <InsightView
                                    insight="15a498b5-2cfc-4267-8145-146da63ec96c"
                                    filters={allFilters}
                                />
                            </div>
                        </GoodDataWrapper>
                    </div>
                </div>
        },
        {
            id: 'customers',
            title: "Customers",
            value: activeCustomersString,
            change: `${diff3}%`,
            changeType: diff3 <= 0 ? "negative" : "positive",
            icon: <GroupIcon className="w-6 h-6 text-purple-600" />,
            subtitle: "vs. last month",
            content:
                <div className="p-4 grid grid-cols-12 h-90">
                    <div className="col-span-7 h-80">
                        <h3 className="text-center text-gray-800 dark:text-white">New / Returning Customers Trend</h3>
                        <GoodDataWrapper>
                            <div className="h-80">
                                <ColumnChart
                                    measures={[Md.NewCustomersMonthly, Md.ReturnCustomersMonthly]}
                                    viewBy={Md.DateDatasets.Date.DateDate.Default}
                                    filters={allFilters}
                                    config={{
                                        colors: ["#CFD3DB", "#E1340D"],
                                        stackMeasures: true,
                                        dataLabels: {
                                            visible: "false"
                                        },
                                        legend: {
                                            enabled: true,
                                            position: "bottom"
                                        }
                                    }}
                                />
                            </div>
                        </GoodDataWrapper>
                    </div>
                    <div className="col-span-5 h-80">
                        <h3 className="text-center text-gray-800 dark:text-white">New / Returning Customers</h3>
                        <GoodDataWrapper>
                            <div className="h-80">
                                <DonutChart
                                    measures={[Md.ReturnCustomers, Md.NewCustomers]}
                                    filters={allFilters}
                                    config={{
                                        colors: ["#9D1D00", "#F8AD9C"],
                                        legend: {
                                            enabled: true,
                                            position: "bottom"
                                        }
                                    }}
                                />
                            </div>
                        </GoodDataWrapper>
                    </div>
                </div>
        },
        {
            id: 'gross-profit',
            title: "Gross profit margin",
            value: grossProfitMarginString,
            change: `${diff4}%`,
            changeType: diff4 <= 0 ? "negative" : "positive",
            icon: <ChartIcon className="w-6 h-6 text-orange-600" />,
            subtitle: "vs. last month",
            content:
                <div className="p-4 grid grid-cols-12 h-90">
                    <div className="col-span-7 h-80">
                        <h3 className="text-center text-gray-800 dark:text-white">Gross Profit vs. Gross Margin</h3>
                        <GoodDataWrapper>
                            <div className="h-80">
                                <ComboChart
                                    primaryMeasures={[Md.GrossProfit]}
                                    secondaryMeasures={[Md.GrossProfitMargin]}
                                    viewBy={Md.DateDatasets.Date.DateDate.Default}
                                    filters={allFilters}
                                    config={{
                                        colors: ["#F5846B", "#9D1D00"],
                                        stackMeasures: true,
                                        dataLabels: {
                                            visible: "false"
                                        },
                                        legend: {
                                            enabled: true,
                                            position: "bottom"
                                        }
                                    }}
                                />
                            </div>
                        </GoodDataWrapper>
                    </div>
                    <div className="col-span-5 h-80">
                        <h3 className="text-center text-gray-800 dark:text-white">Total Sales Breakdown</h3>
                        <GoodDataWrapper>
                            <div className="h-80">
                                <DonutChart
                                    measures={[Md.COGS, Md.GrossProfit, Md.TotalDiscounts, Md.TotalReturns]}
                                    filters={allFilters}
                                    config={{
                                        colors: ["#9D1D00", "#E1340D", "#F14F2A", "#F5846B", "#F8AD9C"],
                                        legend: {
                                            enabled: true,
                                            position: "bottom"
                                        }
                                    }}
                                />
                            </div>
                        </GoodDataWrapper>
                    </div>
                </div>
        }
    ];

    const selectedKpiData = kpiData.find(k => k.id === selectedKpi);

    return (
        <div className="mb-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-0 items-stretch">
                {status === "error" ? (
                    <ErrorComponent
                        message="There was an error getting your execution"
                        description={JSON.stringify(error, null, 2)}
                    />
                ) : null}
                {status === "loading" ? (
                    <div>
                        <div className="gd-message progress">
                            <div className="gd-message-text">Loading…</div>
                        </div>
                        <LoadingComponent />
                    </div>
                ) : null}
                {status === "success" ? (
                    <Fragment>
                        {kpiData.map((kpi) => (
                            <div
                                key={kpi.id}
                                onClick={() => setSelectedKpi(kpi.id)}
                                className={`h-full cursor-pointer transition-all duration-300 ${selectedKpi === kpi.id
                                    ? 'z-20'
                                    : 'opacity-60 hover:opacity-90'
                                    }`}
                            >
                                <KpiCard
                                    title={kpi.title}
                                    value={kpi.value}
                                    change={kpi.change}
                                    changeType={kpi.changeType}
                                    icon={kpi.icon}
                                    subtitle={kpi.subtitle}
                                    content={kpi.content}
                                />
                            </div>
                        ))}
                    </Fragment>) : null}
            </div>

            {/* Charts Section with Connected White Background */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 -mt-6">
                {selectedKpiData?.content}
            </div>
        </div>
    );
}
