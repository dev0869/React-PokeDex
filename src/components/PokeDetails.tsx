import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../config";
import PokeDetails2 from "./PokeDetails2";
import PokeLoader from "./loader/PokeLoader";
import { getTypeColor } from "../utils";
import { signal } from "@preact/signals-react";
import {menu } from '../assets';

// eslint-disable-next-line react-refresh/only-export-components
export const pokeName=signal<Pokemon |null>(null)
export const pokeToglle=signal<boolean>(true)
const PokeDetails = () => {

  const { id } = useParams();
  const name = useLocation().state;

   pokeName.value=name;
  const Api = `${baseUrl}/${id ||1}`;
  const pokemonDetails = async () => {
    const res = await axios.get(Api);
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pokemonDetails", id],
    queryFn: pokemonDetails,
  });





  const color = getTypeColor(data?.types[0]?.type?.name);

  return (
    <div className="bg-[#f4f4f5] flex-wrap sm:flex-nowrap relative h-[100vh] flex-[8] flex ">
      {isLoading ? (
        <PokeLoader />
      ) : (
        <>
          <div
            className="flex p-2 flex-wrap sm:flex-nowrap sm:flex-[4]"
            style={{ background: `radial-gradient(#fffADA,${color})` }}
          >
            <img  onClick={()=>pokeToglle.value=!pokeToglle.value} src={menu} alt="asdada" className="h-[28px] w-[28px]  mt-3 cursor-pointer" />
            <p
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              className="text-white capitalize text-[30px] sm:text-[60px] pl-4 pt-1 sm:pt-9 font-bold "
            >
              {name?.name}
            </p>
            <img
              className="relative sm:absolute  bottom-0 "
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
                id || 1
              }.png`}
              loading="lazy"
              alt={name}
              onError={(e) => {
                e.currentTarget.src = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAdwMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABAIDBQEGB//EADUQAAICAQICBwYFBAMAAAAAAAECAAMEERIhMRMUNVFUcZIVQWFzscEFIzKRoSJTgdFCUmL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cYiICIkeRmNXd0NNLW2AakA6aCBZEg63meBb1x1vM8C3rgXxIOt5ngW9cdbzPAt64F8SDreZ4FvXHW8zwLeuBfEg63meBb1zbiZfTu9b1mu1OamBVERAREQEREBIMXtXL8l+kvkGL2rl+S/SBfERAREQEREBIF7ab5P3l8gHbTfJ+8C+IiAiIgIiICQYvauX5L9JfIMXtXL8l+kC+asq4Y9D2kahfdNsxdFsUq41U8xAj/D885bOrIFZePA6giXTTj4tOOD0KbdeZ11M3QEREBIB203yfvL5AO2m+T94F8REBERAREQEgxe1cvyX6S+QYvauX5L9IF8RIs/PXFAVQGsPu7vOBbJ8vMqxVBsOpPJRzMmP4ogxBaVIsPAJ3n/AFONba91hextzGB9Hi5VeUm6s8uanmJvny1Fz0WCys6EfzPocPLTKr3JwI/UvdAokA7ab5P3l8gHbTfJ+8C+IiAiIgIiICQYvauX5L9JfOdb0uJnWXilrK7VH6OYIgV5T2pUTRXvc8AO74zjDByndrLq2Y666EjVp0PaLeDyPTHtFvB5Hpgcx8LNdtzUH4AEaAdwmPUMv+w37idX2i3g8j0x7RbweR6YHK6hl/2G/cTZRi59FgsrpYEfEcf5nR9ot4PI9Me0W8HkemBZSzPWrOhRjzU+6Rjtpvk/ePaTeDyPTPMRbbs2zKes1Ls2KG5mB0IiICIiAiIgJpGVUbba9f6qxqwm6cu/Ete7JtrBDggof+w00IgWNmUrVXYSxFn6QBqT/iZUZFd4bZqCp0ZWGhEjFNtS4dorLGpCrp7+Im7ESxsi6+xDWHAAU8+HvMDacqsdNrr+SNW4THr1G2ptTpadF4Seyi09f0QnpANnx4SZcK5bRqh21uuzyJ1MDqXZNVNldbnRrDoIvya6CobcWbkqjUmQ5OLfk23uNqjQKmo4kDjqO7jM3W/pKck1MzGrY6rpqp7xApGbSaGu1bah0YacQfKZUZC3MQqWDQa6shEhanIfBvVlYl2BQNpu93PSUYIYMwavIXhztfcPrAsiIgIiICIiAkmbmdWZBs3a8W/8r3yuRXYJvyLLLHYAqFUKdOHv1gZ9aC23I40FaB1Ov6hNVn4ga0oL18XAZxr+lddNf5mL/h9r1UK1i7kGxyP+S68v4mdmB0ttr2OQGAVQp5L3GBlk5hpssQIG2VdJrrz48pvNqrR0rcBt3GRnAuZW32IWNHR6/HXnMnxsq2kUWPUK+AO3XXQQPUz92Jbca9Hr5oT+08XPbVw1S6rWXBR9w/zMbPw9vzRXadtibTvOp1HKBgWksWNKfllNKweOvfAosySmF1nZqdgbbr3zzFyLLnIdagANf6LNxmo42U+Kcd2p27Aqka68NJtxaLamO5KFGmn5a6EwKoiICIiAiIgIiICIiAiIgIiICIiAiIgIiIH/2Q==`;
              }}
            />
          </div>
          <div className="flex w-full sm:w-0 sm:flex-[8] p-2">
            <PokeDetails2 idno={id} colors={color} datas={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default PokeDetails;
