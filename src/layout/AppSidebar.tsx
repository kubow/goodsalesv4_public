import { useLocation } from "react-router";
import { Link } from "react-router";
import { HomeIcon, DollarIcon, GroupIcon, ShoppingBagIcon, ChartIcon } from "../icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    icon: <HomeIcon className="w-6 h-6" />,
    name: "Home",
    path: "/",
  },
  {
    icon: <DollarIcon className="w-6 h-6" />,
    name: "Sales",
    path: "/sales",
  },
  {
    icon: <GroupIcon className="w-6 h-6" />,
    name: "Customers",
    path: "/customers",
  },
  {
    icon: <ShoppingBagIcon className="w-6 h-6" />,
    name: "Products",
    path: "/products",
  },
  {
    icon: <ChartIcon className="w-6 h-6" />,
    name: "Benefits",
    path: "/benefits",
  },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-6 z-50">
      {/* App Icon */}
      <div className="w-10 h-10 mb-8 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-1">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={{ pathname: item.path, search: location.search }}
            className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              isActive(item.path)
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-xs font-medium leading-none">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
