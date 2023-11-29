
import { useEffect, useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

type Pokemon = {
  name: string;
  url: string;
};

type SidebarProps = {
  datas: Pokemon[];
};

const Sidebar = ({ datas }: SidebarProps) => {
  const [displayedData, setDisplayedData] = useState<number>(20);
  const container = document.getElementById("scroll");

 

  useEffect(() => {
    const handleScroll = () => {
      if (!container) return;
  
      const scrollPosition = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;
  
      if (scrollPosition + containerHeight === scrollHeight) {
        setDisplayedData((prevCount) => prevCount + 20);
      }
    };
    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [container]);

  return (
    <div id="scroll" className="bg-red-500 flex-[2]   h-[100vh] overflow-y-auto ">
      <div className="sticky w-full p-2 top-0  shadow-lg">
        <Search />
      </div>
      <br />
      <div  className="cursor-pointer p-2">
        {datas?.slice(0, displayedData).map((ele) => {
          const id = parseInt(ele.url.split("pokemon/")[1]);
          return (
            <Link to={`/${id}`} state={ele} key={id} className="flex mb-2 items-center gap-3 p-2 ">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt="pk"
                width={80}
              />
              <div>
                <p className="text-md text-gray-700">#{id}</p>
                <p className="text-xl text-gray-800 capitalize font-semibold">
                  {ele.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
