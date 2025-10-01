import PageMeta from "../../components/common/PageMeta";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";

const dashboardId = "bf439696-d6c6-4d41-a102-dd98e2f3da35";

export default function Sales() {
  return (
    <>
      <PageMeta
        title="Sales Dashboard | Good eCommerce"
        description="Sales dashboard overview powered by GoodData"
      />

      <Dashboard
        dashboard={dashboardId}
        config={{
          mapboxToken:
            "pk.eyJ1IjoiZ29vZGRhdGEiLCJhIjoiY2xlZnMwbjlhMGVsZTNvdHRtNmNuOXJ6ZiJ9.VO4dAkUu0pLge66ZBf99NQ",
          hideShareButton: true,
        }}
      />
    </>
  );
}
