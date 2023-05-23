import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import MainContainer from "../components/MainContainer";
import { useData } from "../contex/DataContext";
import {
  Button,
  ButtonGroup,
  FormLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SubmitButton from "../components/SubmitButton";
import LoginButton from "../components/LoginButton";

const REGISTER_URL = "/api/auth/register/";

function Result() {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const entries = Object.entries(data);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async () => {
    data["first_name"] = data["firstName"];
    data["last_name"] = data["lastName"];
    delete data["firstName"];
    delete data["lastName"];
    delete data["hasPhone"];
    if (data.phoneNumber) {
      data["phone_number"] = data["phoneNumber"];
      delete data["phoneNumber"];
    }

    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify(data));
      // console.log(JSON.stringify(response?.data));
      navigate("/profile");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        console.log(err?.response.data);
        setErrMsg("Username provided is not unique");
      } else {
        console.log(err?.response.data);
      }
    }
  };

  return (
    <MainContainer>
      <Typography variant="h6" color="inherit" noWrap>
        Sign Up (review)
      </Typography>
      <FormLabel error id="demo-error-radios">
        {errMsg}
      </FormLabel>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell component="th" scope="row">
                  {entry[0]}
                </TableCell>
                <TableCell align="right">{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SubmitButton onClick={onSubmit}>Sign Up</SubmitButton>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button component={Link} to="/location">
          Previous
        </Button>
        <LoginButton />
      </ButtonGroup>
    </MainContainer>
  );
}

export default Result;
