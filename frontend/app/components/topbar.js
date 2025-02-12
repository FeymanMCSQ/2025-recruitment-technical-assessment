"use client";
import Image from "next/image";
import logo from "@/public/assets/freeRoomsLogo.png";
import closedLogo from "@/public/assets/freeroomsDoorClosed.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function TopBar() {
  const [clicked, setClicked] = useState(true);

  const changeClicked = () => {
    setClicked(!clicked);
  };

  return (
    <div className="w-full h-20 flex flex-row justify-between border-black border-solid border-b border-opacity-20">
      <div className="flex flex-row items-center">
        {clicked ? (
          <Image
            src={logo}
            alt="Logo of app"
            height={80}
            width={80}
            onClick={changeClicked}
            className="cursor-pointer"
          />
        ) : (
          <Image
            src={closedLogo}
            alt="Logo of app"
            height={80}
            width={80}
            onClick={changeClicked}
            className="cursor-pointer"
          />
        )}
        <div className="text-3xl font-bold text-orange-600">Freerooms</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="border-orange-600 border-solid border-2 p-3 rounded-md m-1">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            height={30}
            width={30}
            className="text-orange-600"
          />
        </div>
        <div className="border-orange-600 border-solid border-2 p-3 rounded-md	m-1 bg-orange-600">
          <FontAwesomeIcon
            icon={faBorderAll}
            height={30}
            width={30}
            className="text-white"
          />
        </div>
        <div className="border-orange-600 border-solid border-2 p-3 rounded-md	m-1">
          <FontAwesomeIcon
            icon={faMap}
            height={30}
            width={30}
            className="text-orange-600"
          />
        </div>
        <div className="border-orange-600 border-solid border-2 p-3 rounded-md	m-1 mr-3">
          <FontAwesomeIcon
            icon={faMoon}
            height={30}
            width={30}
            className="text-orange-600"
          />
        </div>
      </div>
    </div>
  );
}
