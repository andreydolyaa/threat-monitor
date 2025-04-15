import Container from "../Container/Container";
import "./Empty.css";

type EmptyProps = {
  message?: string;
};

const Empty = ({ message }: EmptyProps) => {
  return (
    <Container center>
      <div className="empty">{message || "something went wrong"}</div>
    </Container>
  );
};

export default Empty;
