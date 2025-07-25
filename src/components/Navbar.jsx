import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex justify-between items-center px-8  md:px-20 py-2 bg-emerald-900 text-white">
        <li className="text-2xl font-semibold">
          Pass <span className="text-emerald-400">MG</span>
        </li>
        <li className="bg-emerald-400 rounded-full px-2 py-1 text-black font-semibold ring ring-white">
          <div className="flex gap-2 ">
            <img src="src\assets\github-logo.png" alt="" />
            Github
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
