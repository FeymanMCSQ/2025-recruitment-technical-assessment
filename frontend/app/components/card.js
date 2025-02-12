import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function Card({ image, freeRooms, name }) {
  return (
    <div className="h-72 w-60 border border-solid border-black m-5 rounded-md relative overflow-hidden">
      <Image
        src={image}
        alt="building"
        fill={true}
        className="object-cover absolute"
      ></Image>
      <div className="absolute text-black z-10 top-2 right-2 bg-white rounded-xl p-2 flex flex-row text-center text-xs font-bold">
        <FontAwesomeIcon
          icon={faCircle}
          height={10}
          width={10}
          className="text-green-500 m-1"
        />
        {freeRooms} Rooms Avaliable
      </div>
      <div className="absolute text-white bottom-3 left-2 bg-orange-600 w-11/12 p-3 rounded-xl text-left text-sm ">
        {name}
      </div>
    </div>
  );
}
