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
    { id: 3, name: "Hire", path: "/Hire" },
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
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold text-gray-800">
            JEEVIKA
          </span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`w-full md:flex md:w-auto ${isMenuOpen ? "block" : "hidden"}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded md:p-0 hover:bg-gray-200 hover:text-gray-900 ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-700"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <li>
              <Dropdown overlay={registrationMenu} trigger={['click']}>
                <Button className="py-2 px-4 bg-blue-500 text-white rounded md:hover:bg-blue-700">Register</Button>
              </Dropdown>
            </li>

            {!isAuthenticated && (
              <li>
                <Link
                  to="/Login"
                  className="block py-2 px-3 text-gray-700 rounded md:p-0 hover:bg-gray-200 hover:text-gray-900"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

