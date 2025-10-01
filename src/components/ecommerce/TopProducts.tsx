import ProductTile from './ProductTile';
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { useExecutionDataView, LoadingComponent, ErrorComponent } from "@gooddata/sdk-ui";
import { createExecution } from "../../components/auth/backend";
import { IDateFilter, newMeasureSort, ISortItem } from "@gooddata/sdk-model";
import * as Md from "../../../md/ecommerce";
import { Fragment } from 'react/jsx-runtime';
import { Link } from "react-router";

interface TopProductsProps {
  dateFilter: IDateFilter;
  backend: IAnalyticalBackend;
  workspace: string;
}

export default function TopProducts({ dateFilter, backend, workspace }: TopProductsProps) {

  const allFilters = dateFilter ? [dateFilter] : [];

  const metrics = [
    Md.TotalSales,
    Md.TotalReturns,
    Md.NetSales,
    Md.GrossProfit,
    Md.TotalSalesPP,
  ];

  const sortItems: ISortItem[] = [
    newMeasureSort(Md.TotalSales, "desc"),
  ];

  const slicesBy = [Md.ProductImage.Web, Md.ProductId.ProductName];

  const execution = createExecution({
    backend: backend,
    workspace: workspace,
    seriesBy: metrics,
    slicesBy: slicesBy,
    sortBy: sortItems,
    filters: allFilters,
  });

  const { result, error, status } = useExecutionDataView({ execution: execution });

  const series = result?.data().series().toArray();
  const slicesAll = result?.data().slices().toArray();

  //console.log("result", series);
  //console.log("slicesAll", slicesAll);


  const sales0 = series?.[0]?.rawData()[0];
  const sales1 = series?.[0]?.rawData()[1];
  const sales2 = series?.[0]?.rawData()[2];
  const sales3 = series?.[0]?.rawData()[3];
  const sales4 = series?.[0]?.rawData()[4];

  const sales0pp = series?.[4]?.rawData()[0];
  const sales1pp = series?.[4]?.rawData()[1];
  const sales2pp = series?.[4]?.rawData()[2];
  const sales3pp = series?.[4]?.rawData()[3];
  const sales4pp = series?.[4]?.rawData()[4];

  const salesChange0 = Math.round(((Number(sales0) - Number(sales0pp)) / Number(sales0pp)) * 100);
  const salesChange1 = Math.round(((Number(sales1) - Number(sales1pp)) / Number(sales1pp)) * 100);
  const salesChange2 = Math.round(((Number(sales2) - Number(sales2pp)) / Number(sales2pp)) * 100);
  const salesChange3 = Math.round(((Number(sales3) - Number(sales3pp)) / Number(sales3pp)) * 100);
  const salesChange4 = Math.round(((Number(sales4) - Number(sales4pp)) / Number(sales4pp)) * 100);


  // TODO: make more dynamic

  const topProducts = [
    {
      id: '1',
      name: (slicesAll?.[0]?.dataPoints()[0]?.sliceDesc?.headers[1] as any)?.attributeHeaderItem?.name || 'Unknown Product',
      image: (slicesAll?.[0]?.dataPoints()[0]?.sliceDesc?.headers[0] as any)?.attributeHeaderItem?.name || '',
      sales: series?.[0]?.dataPoints()[0]?.formattedValue() || '0',
      salesChange: salesChange0,
      returns: series?.[1]?.dataPoints()[0]?.formattedValue() || '0',
      netsales: series?.[2]?.dataPoints()[0]?.formattedValue() || '0',
      grossprofit: series?.[3]?.dataPoints()[0]?.formattedValue() || '0',
      rank: 1
    },
    {
      id: '2',
      name: (slicesAll?.[1]?.dataPoints()[0]?.sliceDesc?.headers[1] as any)?.attributeHeaderItem?.name || 'Unknown Product',
      image: (slicesAll?.[1]?.dataPoints()[0]?.sliceDesc?.headers[0] as any)?.attributeHeaderItem?.name || '',
      sales: series?.[0]?.dataPoints()[1]?.formattedValue() || '0',
      salesChange: salesChange1,
      returns: series?.[1]?.dataPoints()[1]?.formattedValue() || '0',
      netsales: series?.[2]?.dataPoints()[1]?.formattedValue() || '0',
      grossprofit: series?.[3]?.dataPoints()[1]?.formattedValue() || '0',
      rank: 2
    },
    {
      id: '3',
      name: (slicesAll?.[2]?.dataPoints()[0]?.sliceDesc?.headers[1] as any)?.attributeHeaderItem?.name || 'Unknown Product',
      image: (slicesAll?.[2]?.dataPoints()[0]?.sliceDesc?.headers[0] as any)?.attributeHeaderItem?.name || '',
      sales: series?.[0]?.dataPoints()[2]?.formattedValue() || '0',
      salesChange: salesChange2,
      returns: series?.[1]?.dataPoints()[2]?.formattedValue() || '0',
      netsales: series?.[2]?.dataPoints()[2]?.formattedValue() || '0',
      grossprofit: series?.[3]?.dataPoints()[2]?.formattedValue() || '0',
      rank: 3
    },
    {
      id: '4',
      name: (slicesAll?.[3]?.dataPoints()[0]?.sliceDesc?.headers[1] as any)?.attributeHeaderItem?.name || 'Unknown Product',
      image: (slicesAll?.[3]?.dataPoints()[0]?.sliceDesc?.headers[0] as any)?.attributeHeaderItem?.name || '',
      sales: series?.[0]?.dataPoints()[3]?.formattedValue() || '0',
      salesChange: salesChange3,
      returns: series?.[1]?.dataPoints()[3]?.formattedValue() || '0',
      netsales: series?.[2]?.dataPoints()[3]?.formattedValue() || '0',
      grossprofit: series?.[3]?.dataPoints()[3]?.formattedValue() || '0',
      rank: 4
    },
    {
      id: '5',
      name: (slicesAll?.[4]?.dataPoints()[0]?.sliceDesc?.headers[1] as any)?.attributeHeaderItem?.name || 'Unknown Product',
      image: (slicesAll?.[4]?.dataPoints()[0]?.sliceDesc?.headers[0] as any)?.attributeHeaderItem?.name || '',
      sales: series?.[0]?.dataPoints()[4]?.formattedValue() || '0',
      salesChange: salesChange4,
      returns: series?.[1]?.dataPoints()[4]?.formattedValue() || '0',
      netsales: series?.[2]?.dataPoints()[4]?.formattedValue() || '0',
      grossprofit: series?.[3]?.dataPoints()[4]?.formattedValue() || '0',
      rank: 5
    }
  ];
  return (
    <div className="mb-8 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-normal text-gray-900 dark:text-white">
          Top Products
        </h3>
        <Link to="/products" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          All Products →
        </Link>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topProducts.map((product) => (
              <ProductTile
                key={product.id}
                name={product.name}
                image={product.image}
                sales={product.sales}
                salesChange={product.salesChange}
                returns={product.returns}
                netsales={product.netsales}
                grossprofit={product.grossprofit}
              />
            ))}
          </div>
        </Fragment>) : null}
    </div>
  );
}
