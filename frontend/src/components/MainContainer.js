import React from "react";
import { Container } from "@mui/material";


function MainContainer({ children, ...props }) {
  return (
    <Container component="main" maxWidth="sm" {...props}>
      {children}
    </Container>
  );
}

export default MainContainer;
