import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import useUser from "../lib/useUser";

export default () => {
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const { mutateUser } = useUser({
    redirectTo: "calendar",
    redirectIfFound: true,
  });

  const signUpButtonClicked = async () => {
    const result = {
      email: email,
      username: username,
      password: password,
      familyAccount: checked,
    };
    await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(result),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="loginBack">
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "25ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Paper id="paper" elevation={3}>
          <div className="loginInfo">
            <label>E-mail: </label>
            <input
              type="text"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <label>Username: </label>
            <input
              type="text"
              onChange={(event) => {
                setUserame(event.target.value);
              }}
            />
            <label>Password: </label>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <label>Family Account? </label>
            <Checkbox
              checked={checked}
              onChange={(event) => {
                setChecked(event.target.checked);
              }}
              id="checkSign"
            />
            <Button
              variant="contained"
              onClick={signUpButtonClicked}
              id="buttonSign"
            >
              Sign Up
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};
