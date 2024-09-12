import React, { useState, useEffect, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@mui/material/Grid";
import uuid from "react-uuid";

const getContainerStyle = () => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  margin: "10vh auto",
  width: "80%",
  height: "80vh",
  gap: "8px",
});
export default function MultiColumnsBase({ userId, columnsFromDB }) {
  const initialColumns = {
    Monday: {
      id: "Monday",
      list: [
        // { content: "item 1", itemId: "1" },
        // { content: "item 1", itemId: "2" },
        // { content: "item 1", itemId: "3" },
      ],
    },
    Tuesday: {
      id: "Tuesday",
      list: [
        { content: "item 1", itemId: "3", color: "pink", disabled: false },
      ],
    },
    Wednesday: {
      id: "Wednesday",
      list: [],
    },
    Thursday: {
      id: "Thursday",
      list: [],
    },
    Friday: {
      id: "Friday",
      list: [],
    },
    Saturday: {
      id: "Saturday",
      list: [],
    },
    Sunday: {
      id: "Sunday",
      list: [],
    },
  };

  const [columns, setColumns] = useState(
    columnsFromDB ? columnsFromDB : initialColumns
  );
  const [forceRerender, setForceRerender] = useState(false);
  const count = useRef(0);
  const temporaryColumn = useRef(
    columnsFromDB ? columnsFromDB : initialColumns
  );

  async function save() {
    const requestBody = { columns: columns, userId: userId };
    console.log(requestBody);
    await fetch("/api/workplace/save", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  }

  const handleSaveKeyPress = (event) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault(); // Prevent the browser's default save action
      save(); // Call the save function
    }
  };

  useEffect(() => {
    setColumns(temporaryColumn.current);
  }, [forceRerender]);

  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleSaveKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleSaveKeyPress);
    };
  }, []);

  const onDragEnd = ({ source, destination }) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.list.filter((_, idx) => idx !== source.index);

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      temporaryColumn.current = columns;
      return null;
    } else {
      const newStartList = start.list.filter((_, idx) => idx !== source.index);
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };
      const newEndList = end.list;
      newEndList.splice(destination.index, 0, start.list[source.index]);
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      temporaryColumn.current = columns;
      return null;
    }
  };

  function createTask(columnId) {
    console.log(columnId);
    const result = columns;
    result[columnId]?.list.push({
      content: count.current.toString(),
      itemId: uuid(),
    });
    count.current = count.current + 1;
    temporaryColumn.current = result;
    setForceRerender(!forceRerender);
  }
  function deleteTask(id, parentColumn) {
    const start = columns[parentColumn];
    const newList = start.list.filter((_, idx) => idx !== id);

    const newCol = {
      id: start.id,
      list: newList,
    };

    setColumns((state) => ({ ...state, [newCol.id]: newCol }));
  }
  function editTaskContent(column, id, text) {
    const result = columns;
    result[column].list[id].content = text;
    setColumns(result);
  }

  function editTaskColor(column, id, color) {
    const result = columns;
    result[column].list[id].color = color;
    setColumns(result);
  }

  function changeTaskStatus(column, id, disabled) {
    console.log(disabled);
    const result = columns;
    result[column].list[id].disabled = disabled;
    result[column].list[id].color = "disabled";
    setColumns(result);
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div styles={getContainerStyle}>
          <Grid container spacing={2} className="gridCal">
            {Object.values(columns).map((col) => (
              <Grid item className="upperLetter">
                <Column
                  col={col}
                  key={col.id}
                  deleteTask={deleteTask}
                  editTaskContent={editTaskContent}
                  createTask={createTask}
                  editTaskColor={editTaskColor}
                  changeTaskStatus={changeTaskStatus}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </DragDropContext>
      <div>
        <button
          variant="outlined"
          onClick={() => console.log(columns)}
          sx={{ margin: 2, backgroundColor: "#FFB0E5" }}
        >
          Console log Result
        </button>
      </div>
      <button
        variant="outlined"
        onClick={() => {
          createTask("Monday");
        }}
        sx={{ margin: 2, backgroundColor: "#FFB0E5" }}
      >
        Create Sample
      </button>
      <button
        variant="outlined"
        onClick={save}
        sx={{ margin: 2, backgroundColor: "#FFB0E5" }}
      >
        Save
      </button>
    </>
  );
}
