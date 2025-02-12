"use client";
import TopBarMobile from "./topbarMob";
import MiddlemanMob from "./middlewayMob";
import CardMob from "./cardMob";
import data from "@/data.json";

export default function MobilePage() {
  return (
    <div className="flex flex-col">
      <TopBarMobile />
      <MiddlemanMob />
      <div className="flex flex-col justify-center flex-wrap">
        {data.map((datum, index) => (
          <CardMob
            key={index}
            image={data[index].building_picture}
            freeRooms={data[index].rooms_available}
            name={data[index].name}
          ></CardMob>
        ))}
      </div>
    </div>
  );
}
