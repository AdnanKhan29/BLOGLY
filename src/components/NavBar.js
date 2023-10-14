import React, { useState } from "react";
import Switcher from "./Switcher";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-950 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BLOGLY™
          </span>
        </a>
        <div className="flex md:order-2">
          <div className="flex-shrink-0 group block">
            <div className="flex items-center">
              <img
                className="inline-block flex-shrink-0 h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="Image Description"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Maria Wanner
                </h3>
                <p className="text-sm font-medium text-gray-400">
                  maria@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-center ml-2 w-full px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                ↓
              </button>
            </div>

            {isOpen && (
              <div
                className="absolute right-0 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <a
                    href="/profile"
                    className="block px-4 py-2 w-28 text-sm text-center text-gray-700 hover:bg-indigo-500 hover:text-white"
                    role="menuitem"
                    onClick={toggleDropdown}
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 w-28 text-sm text-center text-gray-700 hover:bg-indigo-500 hover:text-white"
                    role="menuitem"
                    onClick={toggleDropdown}
                  >
                    Signout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-950 md:dark:bg-gray-950 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/search"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover-text-blue-700 md:p-0 md:dark:hover-text-blue-500 dark:text-white dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700"
              >
                Search
              </a>
            </li>
            <li>
              <a
                href="/post"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover-text-blue-700 md:p-0 md:dark:hover-text-blue-500 dark:text-white dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700"
              >
                Post
              </a>
            </li>
            <li>
              <a
                href="/recommended"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover-text-blue-700 md:p-0 md:dark:hover-text-blue-500 dark:text-white dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700"
              >
                Recommended
              </a>
            </li>
            <li>
              <a
                href="/announcements"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover-text-blue-700 md:p-0 md:dark:hover-text-blue-500 dark:text-white dark-hover-bg-gray-700 dark-hover-text-white md-dark-hover-bg-transparent dark-border-gray-700"
              >
                Announcements
              </a>
            </li>
            <Switcher />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
