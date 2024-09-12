import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default () => {
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(true);

  const styles = {
    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/002/209/345/original/cute-clouds-pattern-on-blue-background-free-vector.jpg')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",

    label: {
      fontSize: "100px",
      color: "blue",
    },
  };

  const signUpButtonClicked = () => {
    console.log(
      "New User called: %s email: %s pw: %s wants family: ",
      username,
      email,
      password,
      checked
    );
  };

  return (
    <div style={styles}>
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
        <Paper elevation={3}>
          <div className="loginInfo">
            <label>E-mail: </label>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <label>Username: </label>
            <input
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
              onChange={(event) => {
                setChecked(event.target.checked);
              }}
            />
            <Button variant="contained" onClick={signUpButtonClicked}>
              Sign Up
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};
