import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '../../icons';

interface ProductTileProps {
  name: string;
  image: string;
  sales: string;
  salesChange: number;
  returns: string;
  netsales: string;
  grossprofit: string;
}

export default function ProductTile({
  name,
  image,
  sales,
  salesChange,
  returns,
  netsales,
  grossprofit
}: ProductTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpIcon className="w-3 h-3" />;
    if (change < 0) return <ArrowDownIcon className="w-3 h-3" />;
    return null;
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-75 object-contain transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-600">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 dark:bg-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-2xl">📦</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Product Image</p>
            </div>
          </div>
        )}

        {/* Quick KPIs Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-3">
          <div className="text-black dark:text-white">
          <p className="text-gray-500 dark:text-gray-400 text-xs">Total Sales</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-medium">{sales}</span>
              <div className={`flex items-center gap-1 text-xs ${getChangeColor(salesChange)}`}>
                {getChangeIcon(salesChange)}
                <span>{Math.abs(salesChange)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Bottom Section */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-b-lg pointer-events-none shadow-lg transition-all duration-300 ease-in-out ${
          isHovered ? 'h-37 opacity-100' : 'h-0 opacity-0'
        }`}
      >
        <div className={`p-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white dark:bg-gray-800">
          <div className="text-black dark:text-white">
          <p className="text-gray-500 dark:text-gray-400 text-xs">Total Sales</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-medium">{sales}</span>
              <div className={`flex items-center gap-1 text-xs ${getChangeColor(salesChange)}`}>
                {getChangeIcon(salesChange)}
                <span>{Math.abs(salesChange)}%</span>
              </div>
            </div>
          </div>
        </div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
            {name}
          </h4>
          
          <div className="grid grid-cols-1 text-xs">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 dark:text-gray-400">Total Returns</p>
              <div className={`flex items-center gap-1 font-medium text-gray-900 dark:text-white`}>
                <span>{returns}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 dark:text-gray-400">Net Sales</p>
              <div className={`flex items-center gap-1 font-medium text-gray-900 dark:text-white`}>
                <span>{netsales}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 dark:text-gray-400">Gross Profit</p>
              <div className={`flex items-center gap-1 font-medium text-gray-900 dark:text-white`}>
                <span>{grossprofit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
