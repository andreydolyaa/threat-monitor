import "./CustomInput.css";
import { ChangeEventHandler } from "react";

type CustomInput = {
  type: "email" | "text" | "password";
  name: string;
  required: boolean;
  placeholder?: string;
  inputColor: "var(--main-background)" | "var(--card-background)";
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
};

const CustomInput = ({
  type,
  name,
  required,
  placeholder,
  inputColor,
  handleOnChange,
}: CustomInput) => {
  return (
    <input
      style={{ backgroundColor: inputColor }}
      className="custom-input"
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
};

export default CustomInput;
