import React, { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Employee", path: "/Employee" },
    { id: 3, name: "Company", path: "/Hire" },
  ];

  const registrationMenu = (
    <Menu>
      <Menu.Item key="employee">
        <Link to="/register/employee">Employee</Link>
      </Menu.Item>
      <Menu.Item key="company">
        <Link to="/register/company">Company</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">JEEVIKA</Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <ul className="flex space-x-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <Dropdown overlay={registrationMenu} trigger={['click']}>
                  <Button className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-700">Register</Button>
                </Dropdown>
              </li>

              {!isAuthenticated && (
                <li>
                  <Link to="/Login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* ... (rest of the mobile menu button code) ... */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (replaces previous mobile menu code) */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* ... (mobile menu links - same as desktop menu links) ... */}
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {link.name}
              </Link>
            ))}
            <Dropdown overlay={registrationMenu} trigger={['click']}>
              <Button className="block px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-700">Register</Button>
            </Dropdown>
            {!isAuthenticated && (
              <Link
                to="/Login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
