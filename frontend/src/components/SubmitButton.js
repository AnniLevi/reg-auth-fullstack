import React from "react";
import { Button } from "@mui/material";

function SubmitButton({ children, ...props }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      {...props}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
