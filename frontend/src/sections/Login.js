import React, { useState } from "react";
import MainContainer from "../components/MainContainer";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import Form from "../components/Form";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { useData } from "../contex/DataContext";
import { axiosInstance } from "../api/axios";
import { Button, ButtonGroup, FormLabel, Typography } from "@mui/material";

const LOGIN_URL = "/api/auth/token/";

function Login() {
  const navigate = useNavigate();
  const { data } = useData();
  const [errMsg, setErrMsg] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: { username: data.username, password: data.password },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        LOGIN_URL,
        JSON.stringify(data)
      );

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      axiosInstance.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("accessToken");
      navigate("/profile");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        console.log(err?.response.data);
        setErrMsg("Username provided is not unique");
      } else if (
        err.response.status === 401 &&
        err.response.data.detail ===
          "No active account found with the given credentials"
      ) {
        setErrMsg("No active account found with the given credentials");
      } else {
        console.log(err?.response.data);
      }
    }
  };

  return (
    <MainContainer>
      <Typography variant="h6" color="inherit" noWrap>
        Sign In
      </Typography>
      <FormLabel error id="demo-error-radios">
        {errMsg}
      </FormLabel>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          id="username"
          type="text"
          label="Username"
          name="username"
        />
        <Input
          {...register("password")}
          id="password"
          type="password"
          label="Password"
          name="password"
        />
        <SubmitButton>Sign In</SubmitButton>

        <ButtonGroup variant="text" aria-label="text button group">
          <Button component={Link} to={data.regLink || "/register"}>
            Sign Up
          </Button>
        </ButtonGroup>
      </Form>
    </MainContainer>
  );
}

export default Login;
