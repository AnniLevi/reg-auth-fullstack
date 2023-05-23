import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import SubmitButton from "../components/SubmitButton";
import MainContainer from "../components/MainContainer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useData } from "../contex/DataContext";
import { ButtonGroup, Typography } from "@mui/material";

import LoginButton from "../components/LoginButton";

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]{4,20}$/,
      "Username should start with alphanumeric and contain 4-20 symbols"
    )
    .required("Username is a required field"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password should contain minimum 8 characters, at least one letter and one number"
    )
    .required("Password is a required field"),
});

function Register() {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: data.username, password: data.password },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setValues(data);
    navigate("/name");
  };

  return (
    <MainContainer>
      <Typography variant="h6" color="inherit" noWrap>
        Sign Up (step 1)
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          id="username"
          type="text"
          label="Username"
          name="username"
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <Input
          {...register("password")}
          id="password"
          type="password"
          label="Password"
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <SubmitButton>Next</SubmitButton>

        <ButtonGroup
          variant="text"
          aria-label="text button group"
          margin="normal"
        >
          <LoginButton />
        </ButtonGroup>
      </Form>
    </MainContainer>
  );
}

export default Register;
