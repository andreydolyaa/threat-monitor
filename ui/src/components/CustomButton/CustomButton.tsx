import "./CustomButton.css";
import React from "react";

type CustomButtonProps = {
  type: "button" | "submit";
  text: string;
  handleOnClick?: () => void; //TODO: TBD
};

const CustomButton = ({ type, text, handleOnClick }: CustomButtonProps) => {
  return (
    <button type={type} className="custom-button" onClick={handleOnClick}>
      {text}
    </button>
  );
};

export default CustomButton;
