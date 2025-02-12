"use client";
import TopBar from "@/components/topbar";
import Middleman from "@/components/middleway";
import Card from "@/components/card";
import data from "@/data.json";
import MobilePage from "@/mob_components/totalPage";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSmallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setSmallScreen(window.innerWidth <= 600);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isSmallScreen) {
    return <MobilePage />;
  }

  return (
    <div className="flex flex-col">
      <TopBar />
      <Middleman />
      <div className="flex flex-row flex-wrap justify-around">
        {data.map((datum, index) => (
          <Card
            key={index}
            image={data[index].building_picture}
            freeRooms={data[index].rooms_available}
            name={data[index].name}
          ></Card>
        ))}
      </div>
    </div>
  );
}
