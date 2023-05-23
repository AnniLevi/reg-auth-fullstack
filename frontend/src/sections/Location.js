import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MainContainer from "../components/MainContainer";
import Form from "../components/Form";
import { Input } from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import React from "react";
import { useData } from "../contex/DataContext";
import { Button, ButtonGroup, Typography } from "@mui/material";
import LoginButton from "../components/LoginButton";

const schema = yup.object().shape({
  country: yup
    .string()
    .matches(/^([^0-9]*)$/, "County should not contain numbers")
    .required("County is a required field"),
  city: yup
    .string()
    .matches(/^([^0-9]*)$/, "City should not contain numbers")
    .required("City is a required field"),
});

function Location() {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { country: data.country, city: data.city },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setValues(data);
    navigate("/result");
  };

  return (
    <MainContainer>
      <Typography variant="h6" color="inherit" noWrap>
        Sign Up (step 4)
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("country")}
          id="country"
          type="text"
          label="Country"
          name="country"
          error={!!errors.country}
          helperText={errors?.country?.message}
        />
        <Input
          {...register("city")}
          id="city"
          type="text"
          label="City"
          name="city"
          error={!!errors.city}
          helperText={errors?.city?.message}
        />
        <SubmitButton>Next</SubmitButton>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button component={Link} to="/contacts">
            Previous
          </Button>
          <LoginButton />
        </ButtonGroup>
      </Form>
    </MainContainer>
  );
}

export default Location;
