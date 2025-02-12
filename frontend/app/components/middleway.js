import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function Middleman() {
  return (
    <div className="flex flex-row w-full h-16 justify-between mt-3">
      <div className="cursor-pointer flex flex-row w-28 text-xl text-orange-600 border-solid border-2 border-orange-600 rounded-md justify-around items-center m-3 p-3">
        <FontAwesomeIcon
          icon={faFilter}
          height={20}
          width={20}
          className="text-orange-600"
        />
        <div className=" cursor-pointer">Filter</div>
      </div>
      <input className="w-2/3 border-solid border-gray-400 rounded-md border h-11 m-3 p-3"></input>
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
  );
}
