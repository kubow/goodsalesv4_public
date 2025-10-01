import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeProvider } from "@gooddata/sdk-ui-theme-provider";


interface GoodDataWrapperProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const darkGDTheme: any = {
  chart: {
    backgroundColor: "#1F2937",
    tooltipBackgroundColor: "#1F2937",
    tooltipBorderColor: "#ffffff",
    tooltipLabelColor: "#ffffff",
    tooltipValueColor: "#ffffff"
  },
  tooltip: {
     backgroundColor: "#1F2937"
  }
};

const lightGDTheme: any = {
  chart: {
    backgroundColor: "#ffffff"
  }
};

export const GoodDataWrapper: React.FC<GoodDataWrapperProps> = ({
  children
}) => {
  const { theme } = useTheme();

  return (
      <div className="dark:bg-gray-800">
        <ThemeProvider theme={theme === "dark" ? darkGDTheme : lightGDTheme}>
          {children}
        </ThemeProvider>
      </div>
  );
};
