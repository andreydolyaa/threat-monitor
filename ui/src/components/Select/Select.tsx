import { ChangeEvent } from "react";
import "./Select.css";
import { SelectProps } from "../../types";

const Select = ({
  handleOnChange,
  options,
  label,
  setCurrentPage,
}: SelectProps) => {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    handleOnChange(event.target.value);
  };

  return (
    <select className="select" onChange={onChange}>
      <option label={label} value="">
        {label}
      </option>
      {options.map((option) => {
        return (
          <option key={option.text} value={option.text}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
