import { Link } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

function Sidebar() {
  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, href: '/', current: true },
    { name: 'Members', icon: UserGroupIcon, href: '/members', current: false },
    { name: 'Books', icon: BookOpenIcon, href: '/books', current: false },
    { name: 'Issuance', icon: ClockIcon, href: '/issuance', current: false },
    { name: 'Reports', icon: ChartBarIcon, href: '/reports', current: false },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <h1 className="text-xl font-bold text-white">Library System</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto bg-gray-800">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 flex-shrink-0 h-6 w-6
                      ${item.current
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-300'
                      }
                    `}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;