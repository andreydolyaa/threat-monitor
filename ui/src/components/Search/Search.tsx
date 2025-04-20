import "./Search.css";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { SearchType } from "../../types";

const Search = ({ onSearch, setCurrentPage }: SearchType) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      setCurrentPage(1);
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
