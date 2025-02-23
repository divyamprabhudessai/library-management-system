import { BellIcon } from '@heroicons/react/24/outline';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Library Dashboard</h1>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BellIcon className="h-6 w-6 text-gray-500" />
            </button>
            <div className="ml-4 relative">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;