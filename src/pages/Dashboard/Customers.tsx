import PageMeta from "../../components/common/PageMeta";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";

const dashboardId = "370ec88c-2235-4e65-bb7c-5318280069a1";

export default function Customers() {
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
