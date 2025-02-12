import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function MiddlemanMob() {
  return (
    <div className="flex flex-col justify-between items-center mt-1">
      {" "}
      <input className="w-11/12 border-solid border-gray-400 rounded-md border h-11 mt-3 p-3"></input>
      <div className="flex flex-row w-full h-16 justify-between mt-1">
        <div className="cursor-pointer flex flex-row w-28 text-xl text-orange-600 border-solid border-2 border-orange-600 rounded-md justify-around items-center m-3 p-3">
          <FontAwesomeIcon
            icon={faFilter}
            height={20}
            width={20}
            className="text-orange-600"
          />
          <div className=" cursor-pointer">Filter</div>
        </div>
        <div className="flex flex-row w-28 text-xl text-orange-600 border-solid border-2 border-orange-600 rounded-md justify-around items-center m-3 p-3 cursor-pointer">
          <FontAwesomeIcon
            icon={faSort}
            height={20}
            width={20}
            className="text-orange-600"
          />
          <div>Sort</div>
        </div>
      </div>
    </div>
  );
}
