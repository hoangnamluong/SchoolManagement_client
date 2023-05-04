import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from "../../assets/svg/search.svg";

const SearchForm = ({ placeholder = "", setValue }) => {
  const [query, setQuery] = useState("");

  const debouncedValue = useDebounce(query, 500);

  const onChangedQuery = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="search-form">
      <img src={SearchIcon} width={20} height={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={onChangedQuery}
      />
    </div>
  );
};
export default SearchForm;
