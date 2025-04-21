import Search from "../../components/Search/Search";
import { LogsToolbarProps } from "../../types";
import Select from "../../components/Select/Select";
import Toolbar from "../../components/Toolbar/Toolbar";

const LogsToolbar = ({
  onSearch,
  setSeverity,
  setCurrentPage,
}: LogsToolbarProps) => {
  const selectOptions = [
    { text: "low", val: 5 },
    { text: "medium", val: 7 },
    { text: "high", val: 8 },
  ];

  return (
    <Toolbar>
      <Search onSearch={onSearch} setCurrentPage={setCurrentPage} />
      <Select
        setCurrentPage={setCurrentPage}
        handleOnChange={setSeverity}
        options={selectOptions}
        label="severity"
      />
    </Toolbar>
  );
};

export default LogsToolbar;
