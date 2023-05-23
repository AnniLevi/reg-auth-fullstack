import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { axiosInstance } from "../api/axios";

function LogoutButton() {
  const handleClick = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
  };

  return (
    <Button component={Link} to="/" variant="text" onClick={handleClick}>
      Log Out
    </Button>
  );
}

export default LogoutButton;
