import Logo from "../Logo";

import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-black">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center">
              <Logo width="100px" />
            </div>
          </div>

          <div>
            <h3 className="text-black text-sm font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="text-black  transition-colors">
                  Features
                </Link>
              </li>

              <li>
                <Link to="/" className="text-black  transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-black  transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="text-black transition-colors">
                  Press kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-black text-sm font-semibold mb-2">Support</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <Link to="/" className="text-black  transition-colors">
                  Account
                </Link>
              </li>
              <li className="flex items-start">
                <Link to="/" className="text-black  transition-colors">
                  Contact us
                </Link>
              </li>
              <li className="flex items-start">
                <Link to="/" className="text-black transition-colors">
                  Help
                </Link>
              </li>
              <li className="flex items-start">
                <Link to="/" className="text-black  transition-colors">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-black text-sm">
              &copy; {new Date().getFullYear()} Company Name. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
