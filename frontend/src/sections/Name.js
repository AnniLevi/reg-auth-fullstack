import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "../components/Form";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import SubmitButton from "../components/SubmitButton";
import MainContainer from "../components/MainContainer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useData } from "../contex/DataContext";
import { Button, ButtonGroup, Typography } from "@mui/material";
import LoginButton from "../components/LoginButton";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

function Name() {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setValues(data);
    navigate("/contacts");
  };

  return (
    <MainContainer>
      <Typography variant="h6" color="inherit" noWrap>
        Sign Up (step 2)
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("firstName")}
          id="firstName"
          type="text"
          label="First Name"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          {...register("lastName")}
          id="lastName"
          type="text"
          label="Last Name"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <SubmitButton>Next</SubmitButton>

        <ButtonGroup variant="text" aria-label="text button group">
          <Button component={Link} to="/register">
            Previous
          </Button>
          <LoginButton />
        </ButtonGroup>
      </Form>
    </MainContainer>
  );
}

export default Name;
