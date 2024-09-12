import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Box,
  TextField,
  Chip,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";
import { createStyles, withStyles, makeStyles } from "@material-ui/core/styles";
import { alpha, styled } from "@material-ui/core/styles";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import CircleIcon from "@mui/icons-material/Circle";
import themeColorPicker from "../tools/themeColorPicker";
import { useCookies } from "react-cookie";

export default function Item({
  text,
  index,
  deleteTask,
  parentColumn,
  editTaskContent,
  itemId,
  editTaskColor,
  changeTaskStatus,
  colorFromDB,
  disabledFromDB,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorObject, setColorObject] = useState(
    themeColorPicker(colorFromDB ? colorFromDB : "pink").taskPallete
  );
  const [disabled, setDisabled] = useState(disabledFromDB);
  const [cookies, setCookie] = useCookies(["theme"]);
  const currentColor = useRef(colorFromDB ? colorFromDB : "pink");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const grid = 8;

  useEffect(() => {
    let _color = colorFromDB ? colorFromDB : "pink";
    setColorObject(themeColorPicker(_color, cookies.theme).taskPallete);

    setDisabled(disabledFromDB ? disabledFromDB : false);
  }, [colorFromDB, disabledFromDB, cookies.theme]);

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging
      ? colorObject.dragColor
      : colorObject.backgroundColor,
    borderRadius: "10px",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "green",
      },
      // "& .MuiInput-underline:after": {
      //   borderBottomColor: "green",
      // },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: alpha(colorObject.borderColor, 0.1),
        },
        "&:hover fieldset": {
          borderColor: alpha(colorObject.borderColor, 0.6),
        },
        "&.Mui-focused fieldset": {
          borderColor: alpha(colorObject.borderColor, 0.1),
        },
      },
    },
  })(TextField);

  const popOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function taskDone(parentColumn, index) {
    let pickerResult = themeColorPicker("disabled").taskPallete;
    setColorObject(pickerResult);
    setDisabled(true);
    changeTaskStatus(parentColumn, index, true);
  }

  function changeColor(parentColumn, index, inputColor) {
    currentColor.current = inputColor;
    let pickerResult = themeColorPicker(inputColor).taskPallete;
    setColorObject(pickerResult);
    setAnchorEl(null);
    editTaskColor(parentColumn, index, inputColor);
  }

  return (
    <Draggable key={itemId} draggableId={itemId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="itemCard"
        >
          <div>
            {disabled ? (
              <>
                <ClearIcon
                  sx={{ color: "#Ff0000", textAlign: "right" }}
                  onClick={(e) => {
                    deleteTask(index, parentColumn);
                  }}
                />
              </>
            ) : (
              <>
                <ClearIcon
                  sx={{ color: "#Ff0000", textAlign: "right" }}
                  onClick={(e) => {
                    deleteTask(index, parentColumn);
                  }}
                />
                <CheckIcon
                  sx={{ color: "#00ff00", textAlign: "right" }}
                  onClick={(e) => {
                    taskDone(parentColumn, index);
                  }}
                />
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
                  <MenuList>
                    <CircleIcon
                      id="yellow"
                      sx={{ color: "#FEF462", margin: 0.5, marginLeft: 1 }}
                      onClick={() => changeColor(parentColumn, index, "yellow")}
                    />
                    <CircleIcon
                      id="orange"
                      sx={{ color: "#FC9A2E", margin: 0.5 }}
                      onClick={() => changeColor(parentColumn, index, "orange")}
                    />
                    <CircleIcon
                      id="red"
                      sx={{ color: "#FC1C46", margin: 0.5, marginLeft: 1 }}
                      onClick={() => changeColor(parentColumn, index, "red")}
                    />
                    <CircleIcon
                      id="green"
                      sx={{ color: "#1CCDB5", margin: 0.5 }}
                      onClick={() => changeColor(parentColumn, index, "green")}
                    />
                    <CircleIcon
                      id="blue"
                      sx={{ color: "#4AB8F9", margin: 0.5 }}
                      onClick={() => changeColor(parentColumn, index, "blue")}
                    />
                    <CircleIcon
                      id="purple"
                      sx={{ color: "#8965BC", margin: 0.5 }}
                      onClick={() => changeColor(parentColumn, index, "purple")}
                    />
                    <CircleIcon
                      id="pink"
                      sx={{ color: "#FFB0E5", margin: 0.5, marginRight: 1 }}
                      onClick={() => changeColor(parentColumn, index, "pink")}
                    />
                  </MenuList>
                </Popover>
              </>
            )}
            <CssTextField
              onChange={(event) => {
                editTaskContent(parentColumn, index, event.target.value);
              }}
              defaultValue={text}
              multiline
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                paddingBottom: 0,
                marginTop: 0,
                fontWeight: 500,
              }}
              inputProps={{
                style: {
                  textAlign: "center",
                  color: colorObject.borderColor,
                },
              }}
            ></CssTextField>
          </div>
        </div>
      )}
    </Draggable>
  );
}
