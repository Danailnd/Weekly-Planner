import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@material-ui/core";
import fetchJson from "/lib/fetchJson.js";
import useUser from "/lib/useUser";
import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import { useCookies } from "react-cookie";

export default function NavigationBar() {
  const { user, mutateUser } = useUser({});
  const [winReady, setWinReady] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cookies, setCookie] = useCookies(["theme"]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setWinReady(true);
  }, []);

  const popOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    try {
      await mutateUser(
        fetchJson("/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
        true // redirect if found
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  const changeTheme = (theme) => {
    document.body.setAttribute("data-theme", theme);
    setCookie("theme", theme, { path: "/" });
  };

  return (
    <AppBar position="static" className="appBar">
      <Toolbar className="toolBar">
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div>
            <Button onClick={() => changeTheme("pastel")}>Pastel</Button>
            <Button onClick={() => changeTheme("bubbleGum")}>Bubble Gum</Button>
          </div>
        </Popover>
        <Button href="/">Home</Button>

        {user?.isLoggedIn ? (
          <>
            <Button href="/calendar">Calendar</Button>

            <Button onClick={signOut}>Sign Out</Button>
          </>
        ) : (
          <>
            <Button href="/register">Register</Button>

            <Button href="/login">Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
