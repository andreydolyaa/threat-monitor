import "./CustomInput.css";
import { ChangeEventHandler } from "react";

type CustomInput = {
  type: "email" | "text" | "password";
  name: string;
  required: boolean;
  placeholder: string;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
};

const CustomInput = ({
  type,
  name,
  required,
  placeholder,
  handleOnChange,
}: CustomInput) => {
  return (
    
      <input
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
