import AppBar from "@mui/material/AppBar";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@material-ui/core";
import fetchJson from "/lib/fetchJson.js";
import useUser from "/lib/useUser";
import React, { useState, useEffect } from "react";
import PaletteIcon from "@mui/icons-material/Palette";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";
import { useCookies } from "react-cookie";

export default function NavigationBar() {
  const { mutateUser } = useUser({});
  // const { events } = useEvents(user);
  const [winReady, setwinReady] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [cookies, setCookie] = useCookies(["theme"]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setwinReady(true);
  }, []);

  const popOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function signOut() {
    try {
      mutateUser(
        fetchJson("/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
        true //redirect if found
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  }

  function changeTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    setCookie("theme", theme, { path: "/" });
  }
  // background: "#F45489" }
  return (
    <AppBar
      // style={{}}
      position="sticky"
      className="appBar"
    >
      <Toolbar className="toolBar">
        <PaletteIcon
          sx={{ color: "#7B4F35", textAlign: "right" }}
          onClick={popOpen}
        />
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
          <>
            <div>
              <Button
                onClick={() => {
                  changeTheme("pastel");
                }}
              >
                Pastel
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  changeTheme("bubbleGum");
                }}
              >
                Bubble gum
              </Button>
            </div>
          </>
        </Popover>
        <Button href="/">Home</Button>
        <Button href="calendar">Calendar</Button>
        <Button href="register">Sign Up</Button>
        <Button href="login">Login</Button>
        <Button onClick={signOut}>Sign Out</Button>
      </Toolbar>
    </AppBar>
  );
}
