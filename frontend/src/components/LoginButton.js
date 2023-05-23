import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../contex/DataContext";
import { Button } from "@mui/material";

function LoginButton() {
  const location = useLocation();
  const { setValues } = useData();

  return (
    <Button
      component={Link}
      to="/"
      onClick={() => setValues({ regLink: location.pathname })}
    >
      Log In
    </Button>
  );
}

export default LoginButton;
