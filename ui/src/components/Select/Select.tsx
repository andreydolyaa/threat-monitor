import { ChangeEvent } from "react";
import "./Select.css";

type OptionType = {
  text: string;
  val: number | string;
};

type SelectProps = {
  handleOnChange: (val: string) => void;
  options: OptionType[];
  label: string;
};

const Select = ({ handleOnChange, options, label }: SelectProps) => {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleOnChange(event.target.value);
  };

  return (
    <select className="select" onChange={onChange}>
      <option label={label} value="">{label}</option>
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
