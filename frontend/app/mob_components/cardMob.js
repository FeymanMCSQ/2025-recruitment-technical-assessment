"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "@/mob_components/cardMob.css";

export default function CardMob({ image, freeRooms, name }) {
  return (
    <div className="w-11/12 border-solid border-black border m-3 rounded-md relative overflow-hidden cardContainer">
      <Image
        src={image}
        alt="building"
        fill={true}
        className="object-cover shadow-lg"
      ></Image>
      <div className="absolute text-black z-10 top-2 right-2 bg-white rounded-xl p-2 flex flex-row text-center text-xs font-bold">
        <FontAwesomeIcon
          icon={faCircle}
          height={10}
          width={10}
          className="text-green-500 m-1"
        />
        {freeRooms}/{freeRooms}
      </div>
      <div className="absolute text-white left-2 w-11/12 p-3 rounded-xl text-left text-lg font-bold Name">
        {name}
      </div>
    </div>
  );
}
