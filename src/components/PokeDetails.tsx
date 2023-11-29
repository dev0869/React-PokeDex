import { useParams,useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../config";
const PokeDetails = () => {
  const { id } = useParams();
  const name=useLocation().state;

  const Api = `${baseUrl}/${id}`;
  const pokemonDetails = async () => {
    const res = await axios.get(Api);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ["pokemonDetails", id],
    queryFn: pokemonDetails,
  });

  console.log(data);
  return (
    <div className="bg-[#f4f4f5] relative flex-[8] flex ">
      <div className="flex bg-[#6366f1] p-2 flex-[4]">
        <p style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }} className="text-white capitalize text-[60px] pl-4 pt-9 font-bold ">
          {name?.name}
        </p>
        <img
          className="absolute drop-shadow-2xl top-0 left-0 bottom-0 "
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
            id || 1
          }.png`}
          alt={name}
        />
      </div>
      <div className="flex flex-[8] p-2">sadad</div>
    </div>
  );
};

export default PokeDetails;
