import { useEffect, useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { pokeToglle } from "./PokeDetails";
type SidebarProps = {
  datas: Pokemon[];
};

const Sidebar = ({ datas }: SidebarProps) => {
  const poke = useAppSelector((state) => state.pokemon.data);

  const [displayedData, setDisplayedData] = useState<number>(20);
  const container = document.getElementById("scroll");

  const filterPokemon = datas?.filter((ele) => ele.name.includes(poke));
  const data =
    filterPokemon && filterPokemon.length <= 0 ? datas : filterPokemon;
  const [error, setError] = useState(false);

  const handleImageError = () => {
    if (!error) {
      setError(true);
    }
  };
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
    <div
      id="scroll"
      className={`bg-white ${pokeToglle.value ?'flex-[2]':'hidden' }    h-[100vh] overflow-y-auto `}
    >
      <div className="sticky w-full bg-white p-2 top-0  shadow-lg">
        <Search />
      </div>
      <br />
      <div className="cursor-pointer p-2">
        {data?.slice(0, displayedData).map((ele) => {
          const id = parseInt(ele.url.split("pokemon/")[1]);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
          const alternativeImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

          return (
            <Link
              to={`/${id}`}
              state={ele}
              key={id}
              className="flex mb-2 items-center gap-3 p-2 "
            >
              <img className=""
                src={error ? alternativeImageUrl : imageUrl}
                alt={`Pokemon ${id}`}
                width={80}
                onError={handleImageError}
              />
              <div>
                <p className="text-md text-gray-700">#{id}</p>
                <p className="text-xl text-gray-800 capitalize font-semibold">
                  {ele.name}
                </p>
              <hr className="border-lg" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
