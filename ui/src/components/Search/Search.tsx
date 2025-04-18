import "./Search.css";
import { SearchProps } from "../../types";
import { useEffect, useState } from "react";

const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [search]);

  return <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />;
};

export default Search;
