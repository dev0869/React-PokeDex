import { useParams, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../config";
const PokeDetails = () => {
  const { id } = useParams();
  const name = useLocation().state;

  const Api = `${baseUrl}/${id}`;
  const pokemonDetails = async () => {
    const res = await axios.get(Api);
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pokemonDetails", id],
    queryFn: pokemonDetails,
  });

  const typeColors = [
    { type: "bug", code: "#8CB230" },
    { type: "dark", code: "#58575F" },
    { type: "dragon", code: "#0F6ACO" },
    { type: "electric", code: "#eab308" },
    { type: "fairy", code: "#ED6EC7" },
    { type: "fighting", code: "#D04164" },
    { type: "fire", code: "#FD7D24" },
    { type: "flying", code: "#748FC9" },
    { type: "ghost", code: "#556AAE" },
    { type: "grass", code: "#62B957" },
    { type: "ground", code: "#DD7748" },
    { type: "normal", code: "#9DA0AA" },
    { type: "poison", code: "#A552CC" },
    { type: "ice", code: "#61CECO" },
    { type: "psychic", code: "#EA5D60" },
    { type: "rock", code: "#BAAB82" },
    { type: "steel", code: "#417D9A" },
    { type: "water", code: "#4A90DA" },
  ];

  const getTypeColor = (type: string) => {
    const matchingType = typeColors.find((ele) => ele.type === type);
    return matchingType ? matchingType.code : "#6366f1";
  };
  const color = getTypeColor(data?.types[0]?.type?.name);

  return (
    <div className="bg-[#f4f4f5] relative flex-[8] flex ">
      {isLoading ? (
        <>Loding...</>
      ) : (
        <>
          <div className="flex p-2 flex-[4]" style={{ background: `radial-gradient(#fffADA,${color})` }}>
            <p
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              className="text-white capitalize text-[60px] pl-4 pt-9 font-bold "
            >
              {name?.name}
            </p>
            <img style={{ filter: `drop-shadow( -9px 2px 20px ${color}`}}
              className="absolute  top-10  left-0 bottom-0 "
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
                id || 1
              }.png`}
              alt={name}
            />
          </div>
          <div className="flex flex-[8] p-2">sadad</div>
        </>
      )}
    </div>
  );
};

export default PokeDetails;
