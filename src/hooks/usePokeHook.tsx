import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../config";

const usePokeHook = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Pokemon[]>([]);
  const pokemon = data;
  const fetchPoke = async (page: number) => {
    const res = await axios.get(`${baseUrl}?offset=${page}&limit=20`);
    setPage((prev) => prev + 20);
    const obdata = res.data.results;
    return setData((prev) => [...prev, ...obdata]);
  };

  return { pokemon, page, fetchPoke };
};

export default usePokeHook;
