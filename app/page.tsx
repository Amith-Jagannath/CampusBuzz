"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import MainContent from "./components/MainContent";
import { useState } from "react";
import { getColleges } from "./libs/server";
import { addUserToCampus } from "./libs/server";
import Header from "./components/Header";
export default function Home() {
  const { data: session, status } = useSession();
  // const [showModal, setShowModal] = useState(false);
  // const [username, setUsername] = useState("");
  // const [college, setCollege] = useState("");
  // const [colleges, setColleges] = useState<string[]>([]);
  console.log("Session:", session);
  // const openModal = async () => {
  //   const res = await fetch("/api/gemini", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       prompt:
  //         "Please generate a random username for my application user, just return one username without any extra character, since your response will be set as the username",
  //     }),
  //   });

  //   const data = await res.json();
  //   console.log(data);
  //   setUsername(data.result);
  //   setShowModal(true);
  // };

  // if (status === "loading") {
  //   return <div className="text-white p-10">Loading...</div>;
  // }
  return (
    <div className="bg-[#0e0b1f] text-white font-sans min-h-screen">
      {/* Fixed Top Header */}
      <Header />
      <MainContent InsideCampus = {false} />
    </div>
  );
}
