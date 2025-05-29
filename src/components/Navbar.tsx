import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Documentation Services', path: '/services/documentation' },
        { name: 'Loan Services', path: '/loan-services' },
      ]
    },
    { name: 'Branches', path: '/branches' },
    { name: 'Tariff Comparison', path: '/tariff-comparison' },
    { name: 'Events', path: '/events' },
    { name: 'Membership', path: '/membership' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="px-3 py-2 text-gray-700 hover:text-ui-blue-600 flex items-center"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      {activeDropdown === item.name && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-ui-blue-50 hover:text-ui-blue-600"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="px-3 py-2 text-gray-700 hover:text-ui-blue-600"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="ml-4 flex items-center gap-2">
                <button className="text-gray-500 hover:text-ui-blue-600">
                  <Search className="h-5 w-5" />
                </button>
                <Button asChild className="bg-ui-blue-600 hover:bg-ui-blue-500">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-ui-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-ui-blue-600 flex items-center justify-between"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      {activeDropdown === item.name && (
                        <div className="pl-4 border-l-2 border-ui-blue-400">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-ui-blue-600"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMenuOpen(false);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ui-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/login"
                className="block w-full text-center px-3 py-2 mt-2 bg-ui-blue-600 text-white rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
