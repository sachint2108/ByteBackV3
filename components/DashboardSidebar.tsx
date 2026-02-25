import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaTable } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { FaStore } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { MdRepeat } from "react-icons/md";

import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <div className="xl:w-[400px] bg-gray-500 w-full max-xl:w-full">
      <Link href="/admin">
        <div className="flex gap-x-2 w-full hover:bg-black cursor-pointer items-center py-6 pl-5 text-xl text-white">
          <MdDashboard className="text-2xl" />{" "}
          <span className="font-normal">Reports</span>
        </div>
      </Link>
      <Link href="/admin/orders">
        <div className="flex gap-x-2 w-full hover:bg-black cursor-pointer items-center py-6 pl-5 text-xl text-white">
          <FaBagShopping className="text-2xl" />{" "}
          <span className="font-normal">Orders</span>
        </div>
      </Link>
      <Link href="/admin/products">
        <div className="flex gap-x-2 w-full hover:bg-black cursor-pointer items-center py-6 pl-5 text-xl text-white">
          <FaTable className="text-2xl" />{" "}
          <span className="font-normal">Products</span>
        </div>
      </Link>
      <Link href="/admin/categories">
        <div className="flex gap-x-2 w-full hover:bg-black cursor-pointer items-center py-6 pl-5 text-xl text-white">
          <MdCategory className="text-2xl" />{" "}
          <span className="font-normal">Categories</span>
        </div>
      </Link>
      <Link href="/admin/users">
        <div className="flex gap-x-2 w-full hover:bg-black cursor-pointer items-center py-6 pl-5 text-xl text-white">
          <FaRegUser className="text-2xl" />{" "}
          <span className="font-normal">Users</span>
        </div>
      </Link>

      <Link href="/admin/tradeins">
        <div className="flex gap-x-2 w-full hover:bg-black cursor-pointer items-center py-6 pl-5 text-xl text-white">
          <MdRepeat className="text-2xl" /> 
          <span className="font-normal">Trade-Ins</span>
        </div>
      </Link>
     
    </div>
  );
};

export default DashboardSidebar;
