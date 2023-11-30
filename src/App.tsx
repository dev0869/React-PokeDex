import { Container, Sidebar } from "./components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "./config";

const Api = `${baseUrl}/?offset=0&limit=30000`;
const App = () => {
  const pokemonData = async () => {
    const res = await axios.get(Api);
    return res.data;
  };

  const { isError, error, data } = useQuery({
    queryKey: ["pokemon"],
    queryFn: pokemonData,
  });

  if (isError) {  
    console.log(error.message);
  }

  
  return (
    <>

      <div className="flex">
        <Sidebar datas={data?.results} />
        <Container />
      </div>
    </>
  );
};

export default App;
