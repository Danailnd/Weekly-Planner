import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Item from "./Item";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  backgroundColor: isDraggingOver
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(237, 246, 229, 0.7)",
  padding: grid,
  width: 200,
  height: 800,
  borderRadius: "25px",
});

export default function Column({
  col: { list, id },
  deleteTask,
  editTaskContent,
  createTask,
  editTaskColor,
  changeTaskStatus,
  colorFromDB,
}) {
  return (
    <>
      <div
        style={{
          borderRadius: "10px",
          // backgroundColor: "#B1ECFD",
        }}
      >
        <h2 style={{ color: "#F45489", textAlign: "center" }}>{id}</h2>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className="columnGross"
            onClick={(e) => {
              if (e?.detail > 1) {
                createTask(e.target.id);
              }
            }}
            id={id}
          >
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map(({ content, itemId, color, disabled }, index) => (
                <Item
                  text={content}
                  itemId={itemId}
                  index={index}
                  deleteTask={deleteTask}
                  parentColumn={id}
                  editTaskContent={editTaskContent}
                  editTaskColor={editTaskColor}
                  changeTaskStatus={changeTaskStatus}
                  colorFromDB={color}
                  disabledFromDB={disabled}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
}
