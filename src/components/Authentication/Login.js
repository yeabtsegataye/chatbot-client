import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const history = useNavigate();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const api = "http://localhost:8000/api/user/login";

  const handle_submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const configretion = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(api, { password, email }, configretion);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      history("/ChatPage");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error);
      // setError(error)
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handle_submit}>
        <div className="header">LOG IN</div>
        <div className="inputs">
          <input
            placeholder="Email"
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading && (
            <button className="sigin-btn" type="submit" disabled>
              Loading...
            </button>
          )}
          {!loading && (
            <button className="sigin-btn" type="submit">
              Log in
            </button>
          )}
          <button
            className="sigin-btn"
            onClick={() => {
              setEmail("gust");
              setPassword("123");
            }}
          >
            Guset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
