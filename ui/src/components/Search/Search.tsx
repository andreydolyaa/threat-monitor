import "./Search.css";
import { SearchProps } from "../../types";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";

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

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="icon">
        <TbSearch />
      </div>
    </div>
  );
};

export default Search;
