import { typeColors } from "../types/Poketype";
export const getTypeColor = (type: string) => {
    const matchingType = typeColors.find((ele) => ele.type === type);
    return matchingType ? matchingType.code : "#6366f1";
  };