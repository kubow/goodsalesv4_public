import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import React, { useState } from "react";
import GoodDataProviders from "../components/gooddata/GoodDataProviders";
import AIAssistant from "../components/gooddata/AIAssistant";

const LayoutContent: React.FC = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <GoodDataProviders>
      <div className="min-h-screen flex">
        <AppSidebar />
        <div className="flex-1 ml-20">
          <AppHeader />
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            <Outlet />
          </div>
        </div>

        {/* Global AI Assistant */}
        <div className="fixed bottom-6 right-6 z-50">
          {!isAIAssistantOpen && (
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="bg-brand-500 hover:bg-brand-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:shadow-xl"
              title="Open AI Assistant"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
          )}

          {isAIAssistantOpen && (
            <div className="relative">
              <div className="absolute bottom-0 right-0 mb-20 mr-0">
                <AIAssistant
                  width={400}
                  height={500}
                  className="rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700"
                />
              </div>
              <button
                onClick={() => setIsAIAssistantOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-2 shadow-lg transition-all duration-200"
                title="Close AI Assistant"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </GoodDataProviders>
  );
};

const AppLayout: React.FC = () => {
  return <LayoutContent />;
};

export default AppLayout;
