import React, { useState } from "react";
import LoginForm from "components/Authentication/Form/LoginForm";
import { useHistory } from "react-router-dom";
import authApi from "apis/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await authApi.login({ session: { email, password } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
