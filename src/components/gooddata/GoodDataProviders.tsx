import React from "react";
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
import { backend } from "../auth/backend";
import { effectiveWorkspaceId } from "../../config/gooddataConfig";

// Backward-compatible export so existing imports keep working
export const workspaceId = effectiveWorkspaceId;

interface GoodDataProvidersProps {
  children: React.ReactNode;
}

export const GoodDataProviders: React.FC<GoodDataProvidersProps> = ({ children }) => {
  return (
    <BackendProvider backend={backend}>
      <WorkspaceProvider workspace={effectiveWorkspaceId}>
        {children}
      </WorkspaceProvider>
    </BackendProvider>
  );
};

export default GoodDataProviders;
