import React from "react";

function Form({ children, ...props }) {
  return (
    <form {...props} noValidate>
      {children}
    </form>
  );
}

export default Form;
