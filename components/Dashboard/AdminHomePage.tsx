"use client";
import React from "react";
import UserVisitEachShopChart from "../Charts/UserVisitEachShopChart";
import TotalShopHaveBeenVisitedChart from "../Charts/TotalShopHaveBeenVisitedChart";
import ListAllShopTable from "../AdminTable/ListAllShopTable";

const AdminHomePage: React.FC = () => {
  return (
    <>
      <p className="text-2xl text-orange-500 py-4">Report Buyer Visit Shop</p> 
      
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 mb-8">
                
        <UserVisitEachShopChart />
        <TotalShopHaveBeenVisitedChart />
        
      </div>
      <ListAllShopTable />
    </>
  );
};

export default AdminHomePage;
