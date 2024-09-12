import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import useUser from "../lib/useUser";
import fetchJson, { FetchError } from "../lib/fetchJson";

export default () => {
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const { mutateUser } = useUser({
    redirectTo: "calendar",
    redirectIfFound: true,
  });

  const Login = async () => {
    const body = {
      email: email,
      username: username,
      password: password,
      familyAccount: checked,
    };
    try {
      mutateUser(
        await fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
        true //redirect if found
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
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
            <Button variant="contained" onClick={Login} id="loginButton">
              Login
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};
