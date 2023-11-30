import { typeColors } from "../types/Poketype";
import { pokeName } from "./PokeDetails";
/* eslint-disable no-constant-condition */
type Props = {
  datas: data;
  colors: string;
  idno?: string;
};

const PokeDetails2 = ({ datas, idno, colors }: Props) => {
  const Stats = datas.stats as data[];
  const type = datas.types as data[];

  const differntTypes = type.map((ele) => (ele.type as Pokemon).name);

  const filterdats = typeColors.filter((ele) =>
    differntTypes.some((elem) => ele.type.toLowerCase() === elem.toLowerCase())
  );
  return (
    <>
      <div className="shadow-2xl  w-full p-[10px] rounded-lg">
        <p className="text-[40px] text-gray-300 font-bold ">#{idno}</p>

        <p className="text-[40px] text-gray-600 capitalize text-center font-bold ">
          {pokeName.value && pokeName.value.name}
        </p>
        <div className="flex gap-2 justify-center m-4">
          {filterdats.map((ele, id) => {
            const { type } = ele;
            return (
              <div
                className="p-2 rounded-lg min-w-[30px]"
                style={{ background: `${filterdats[id].code}` }}
                key={id}
              >
                <p>{type} </p>
              </div>
            );
          })}
        </div>

        <div className="shadow-2xl m-auto w-[90%] p-[30px] rounded-lg">
          {Stats.map((ele, id) => {
            const { base_stat, stat } = ele;
            const width =
              (base_stat as number) > 100 ? "100%" : `${base_stat}%`;
            return (
              <div key={id}>
                <div className="flex m-3 justify-between mb-1">
                  <span className="text-xl capitalize font-medium text-[#27272a] ">
                    {(stat as Pokemon).name}
                  </span>
                  <span className="text-xl font-medium text-[#27272a] ">
                    {base_stat as string}
                  </span>
                </div>

                <div className="w-full bg-gray-400 rounded-full h-2.5 ">
                  <div
                    className={` h-2.5 rounded-full`}
                    style={{ width: `${width}`, backgroundColor: `${colors}` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PokeDetails2;
