import PageMeta from "../../components/common/PageMeta";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";

const dashboardId = "c1d67cd4-94ad-40aa-91a5-cdf4143f778a";

export default function Products() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <Dashboard
        dashboard={dashboardId}
        config={{
          //initialRenderMode: "edit",
          //overrideDefaultFilters: overrideDefaultFilters,
          mapboxToken:
            "pk.eyJ1IjoiZ29vZGRhdGEiLCJhIjoiY2xlZnMwbjlhMGVsZTNvdHRtNmNuOXJ6ZiJ9.VO4dAkUu0pLge66ZBf99NQ",
          hideShareButton: true,
          //hideSaveAsNewButton: true,
          //isReadOnly: true
        }}
      />
    </>
  );
}
