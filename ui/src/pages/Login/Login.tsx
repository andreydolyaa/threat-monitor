import React, { useState } from "react";
import { useStore } from "../../store/useStore";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { user, login, loading, error } = useStore();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(formData);
    console.log("submit", formData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (user) return <pre>{JSON.stringify(user, null, 2)}</pre>;

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
