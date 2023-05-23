import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MainContainer from "../components/MainContainer";
import { axiosInstance } from "../api/axios";
import LogoutButton from "../components/LogoutButton";

function Profile() {
  const profileUrl = "/api/auth/profile/";
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(profileUrl)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  return (
    <MainContainer>
      <Typography variant="h6" color="inherit" noWrap>
        User Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData &&
              Object.entries(userData).map((entry) => (
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
      <LogoutButton />
    </MainContainer>
  );
}

export default Profile;
