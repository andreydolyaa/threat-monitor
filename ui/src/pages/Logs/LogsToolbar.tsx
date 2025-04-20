import Search from "../../components/Search/Search";
import { LogsToolbarProps } from "../../types";
import Select from "../../components/Select/Select";

const LogsToolbar = ({ onSearch, setSeverity }: LogsToolbarProps) => {
  const selectOptions = [
    { text: "low", val: 5 },
    { text: "medium", val: 7 },
    { text: "high", val: 8 },
  ];

  return (
    <div className="logs-toolbar">
      <Search onSearch={onSearch} />
      <Select
        handleOnChange={setSeverity}
        options={selectOptions}
        label="severity"
      />
    </div>
  );
};

export default LogsToolbar;
