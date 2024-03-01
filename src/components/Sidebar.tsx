import { useEffect, useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { pokeToglle } from "./PokeDetails";
import usePokeHook from "../hooks/usePokeHook";
import { useInView } from "react-intersection-observer";
const Sidebar = () => {
  const { ref, inView } = useInView();
  const { page, fetchPoke, pokemon } = usePokeHook();

  useEffect(() => {
    if (inView) {
      fetchPoke(page);
    }
  }, [inView]);

  const poke = useAppSelector((state) => state.pokemon.data);
  const filterPokemon = pokemon?.filter((ele) => ele.name.includes(poke));
  const datas =
    filterPokemon && filterPokemon.length <= 0 ? pokemon : filterPokemon;
  const [error, setError] = useState(false);

  const handleImageError = () => {
    if (!error) {
      setError(true);
    }
  };

  return (
    <div
      id="scroll"
      className={`bg-white ${
        pokeToglle.value ? "flex-[2]" : "hidden"
      } w-full sm:w-0  absolute z-[9999]  sm:relative  h-[100vh] overflow-y-auto `}
    >
      <div className="sticky w-full   bg-white p-2 top-0  shadow-lg">
        <Search />
      </div>
      <br />
      <div className="cursor-pointer p-2">
        {datas?.map((ele) => {
          const id = parseInt(ele.url.split("pokemon/")[1]);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
          const alternativeImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

          return (
            <Link
              onClick={() => {
                if (window.innerWidth <= 500) {
                  pokeToglle.value = !pokeToglle.value;
                }
              }}
              to={`/${id}`}
              state={ele}
              key={id}
              className="flex mb-2 items-center gap-3 p-2  "
            >
              <img
                className=""
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
      <p ref={ref}></p>
    </div>

  );
};

export default Sidebar;
