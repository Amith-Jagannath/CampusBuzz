"use client";
import React from "react";
import Header from "@/app/components/Header";
import MainContent from "@/app/components/MainContent";
const page = () => {
  return (
    <div className="bg-[#0e0b1f] text-white font-sans min-h-screen">
      {/* Fixed Top Header */}
      <Header />
      <MainContent InsideCampus={true} />
    </div>
  );
};

export default page;
