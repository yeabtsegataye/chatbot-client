import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [PicLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const api = "http://localhost:8000/api/user/signup";

  // for image uploading

  const handle_uploade = (pic) => {
    const uploade = "https://api.cloudinary.com/v1_1/yeabtsega/";
    setPicLoading(true);
    if (pic === undefined) {
      return alert("please provide image");
    }
    console.log(pic);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "yeabtsega");
      fetch(uploade, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      alert("image type is not supported");
      return setPicLoading(false);
    }
  };
  // for submission of user Info
  const handle_Submit = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (!email || !password || !name) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    if (password !== confPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (!pic) {
      setPic("no pic");
    }
    try {
      const configretion = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        api,
        { name, password, email },
        configretion
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      navigate("/ChatPage");
      setPicLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error.message);
      setPicLoading(false);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handle_Submit}>
        <div className="header">SIGN UP</div>
        <div className="inputs">
          <input
            placeholder="Name"
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
          <input
            placeholder="Confirm Password"
            className="input"
            type="password"
            value={confPassword}
            onChange={(e) => setconfPassword(e.target.value)}
          />
          <input
            type="file"
            className="input"
            onChange={(e) => handle_uploade(e.target.files[0])}
          />
          {!PicLoading && (
            <button className="sigin-btn" type="submit">
              Sign up
            </button>
          )}
          {PicLoading && (
            <button className="sigin-btn" disabled type="submit">
              loading ...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
