import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
  content?: React.ReactNode;
}

export default function KpiCard({
  title,
  value,
  change,
  changeType,
  icon,
  subtitle
}: KpiCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // TODO: add margin to bottom of the card

  return (
    <div className="h-full rounded-xl bg-white p-6 dark:border-gray-700 dark:bg-gray-800 transition-shadow duration-300 flex flex-col">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg dark:bg-blue-900/20">
          {icon}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      </div>

      <div className="mt-4 flex-1">
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <div className="flex items-center gap-2 mt-1 mb-2">
          <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor()}`}>
            {change}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
