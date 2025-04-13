import "./CustomButton.css";

type CustomButtonProps = {
  type?: "button" | "submit";
  text: string;
  handleOnClick?: () => void; //TODO: TBD
};

const CustomButton = ({
  type = "button",
  text,
  handleOnClick,
}: CustomButtonProps) => {
  return (
    <button type={type} className="custom-button" onClick={handleOnClick}>
      {text}
    </button>
  );
};

export default CustomButton;
