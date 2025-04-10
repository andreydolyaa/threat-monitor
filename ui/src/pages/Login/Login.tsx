import "./Login.css";
import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import CustomInput from "../../components/CustomInput/CustomInput";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import CustomButton from "../../components/CustomButton/CustomButton";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useStore();

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Container center={true}>
      <form className="login" onSubmit={handleSubmit}>
        <Logo isInLogin={true} />
        <label>Email</label>
        <CustomInput
          type="email"
          name="email"
          required
          inputColor="var(--card-background)"
          handleOnChange={handleOnChange}
        />
        <label>Password</label>
        <CustomInput
          type="password"
          name="password"
          required
          inputColor="var(--card-background)"
          handleOnChange={handleOnChange}
        />
        <CustomButton type="submit" text="LOGIN" />
      </form>
    </Container>
  );
};

export default Login;
