
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Documentation Services', path: '/services#documentation' },
        { name: 'Loan Services', path: '/services#loans' },
      ]
    },
    { name: 'Branches', path: '/branches' },
    { name: 'Tariff Comparison', path: '/tariff-comparison' },
    { name: 'Events', path: '/events' },
    { name: 'Membership', path: '/membership' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-3">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`px-3 py-2 flex items-center rounded-md transition-colors ${
                          isActive(item.path) 
                            ? 'text-ui-blue-600 font-medium' 
                            : 'text-gray-700 hover:text-ui-blue-600 hover:bg-ui-blue-50'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === item.name && (
                        <div 
                          className="absolute right-0 mt-2 w-64 bg-white modern-glass rounded-lg shadow-xl z-10 overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-ui-blue-50 hover:text-ui-blue-600 transition-colors"
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
                      className={`px-3 py-2 rounded-md transition-colors ${
                        isActive(item.path) 
                          ? 'text-ui-blue-600 font-medium' 
                          : 'text-gray-700 hover:text-ui-blue-600 hover:bg-ui-blue-50'
                      }`}
                    >
                      {item.name}
                      {isActive(item.path) && (
                        <div className="h-0.5 bg-ui-blue-500 mt-0.5" />
                      )}
                    </Link>
                  )}
                </div>
              ))}
              <div className="ml-6 flex items-center space-x-3">
                <button className="text-gray-500 hover:text-ui-blue-600 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <Button asChild variant="outline" className="border-ui-blue-200 hover:bg-ui-blue-50 hover:text-ui-blue-600">
                  <Link to="/login"><User className="mr-2 h-4 w-4" /> Login</Link>
                </Button>
                <Button asChild className="bg-ui-blue-600 text-white hover:bg-ui-blue-500">
                  <Link to="/contact">Contact Us</Link>
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
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-4 modern-glass overflow-hidden">
            <div className="px-4 pt-3 pb-5 space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="rounded-lg overflow-hidden">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full text-left px-4 py-3 text-base flex items-center justify-between rounded-lg ${
                          isActive(item.path) ? 'bg-ui-blue-50 text-ui-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === item.name && (
                        <div className="mt-1 ml-2 space-y-1 border-l-2 border-ui-blue-200 pl-4">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-2 rounded-lg text-base text-gray-600 hover:bg-ui-blue-50 hover:text-ui-blue-600"
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
                      className={`block px-4 py-3 text-base rounded-lg ${
                        isActive(item.path) ? 'bg-ui-blue-50 text-ui-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-ui-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" /> Login
                  </Link>
                </Button>
                <Button asChild className="w-full bg-ui-blue-600 hover:bg-ui-blue-500">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
