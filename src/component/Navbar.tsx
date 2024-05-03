import React from 'react';
import iconSearch from '../../public/icon/search.png';

const Navbar = () => {
  return (
    <div className="bg-[#4F4F4F] text-white h-10 p-4 flex items-center">
      <img src={iconSearch} alt="Search Icon" className="w-4" />
    </div>
  );
};

export default Navbar;
