import React from "react";
import MainContainer from "../components/MainContainer";
import Form from "../components/Form";
import { Input } from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useData } from "../contex/DataContext";
import LoginButton from "../components/LoginButton";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be in the correct format")
    .required("Email is a required field"),
  phoneNumber: yup
    .string()
    .matches(
      /^[/+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Phone number must be in the correct format"
    ),
});

function Contacts() {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: data.email,
      phoneNumber: data.phoneNumber,
      hasPhone: data.hasPhone,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    setValues(data);
    navigate("/location");
  };

  return (
    <MainContainer>
      <Typography variant="h6" color="inherit" noWrap>
        Sign Up (step 3)
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          id="email"
          type="text"
          label="Email"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          control={
            <Switch
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              {...register("hasPhone")}
              name="hasPhone"
            />
          }
          label="Provide a phone number?"
        />

        {hasPhone && (
          <Input
            {...register("phoneNumber")}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
        )}
        <SubmitButton>Next</SubmitButton>

        <ButtonGroup variant="text" aria-label="text button group">
          <Button component={Link} to="/name">
            Previous
          </Button>
          <LoginButton />
        </ButtonGroup>
      </Form>
    </MainContainer>
  );
}

export default Contacts;
