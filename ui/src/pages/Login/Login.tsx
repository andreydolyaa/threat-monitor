import React, { useState } from "react";
import { useStore } from "../../store/useStore";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useStore();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div>
        <label>email:</label>
        <input name="email" type="email" required onChange={handleChange} />
      </div>
      <div>
        <label>password</label>
        <input
          name="password"
          type="password"
          required
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
