// Centralized GoodData configuration
// Priority for values:
// 1) URL query params (?hostname=...&workspaceId=...)
// 2) package.json gooddata.{hostname, workspaceId}
// 3) sensible defaults

// Vite supports importing JSON by default
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pkg from "../../package.json";

const pkgGooddata = (pkg as any)?.gooddata ?? {};

const urlParams = new URLSearchParams(window.location.search);

const defaultHostname: string = pkgGooddata.hostname || "https://see-dev.cloud.gooddata.com/";
const defaultWorkspaceId: string = pkgGooddata.workspaceId || "ecommerce-parent";

export const effectiveHostname: string = urlParams.get("hostname") || defaultHostname;
export const effectiveWorkspaceId: string = urlParams.get("workspaceId") || defaultWorkspaceId;
