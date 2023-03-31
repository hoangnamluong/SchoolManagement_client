import JsonData from "../data/data.json";

const useGetJsonData = (name) => {
  const item = JsonData.find((i) => i.name === name);

  const content = item.content;

  return content;
};
export default useGetJsonData;
