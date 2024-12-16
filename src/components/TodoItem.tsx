import {
    Paper,
    Typography,
    Checkbox,
    Button,
    Stack,
    TextField,
  } from "@mui/material";
  import { Delete } from "@mui/icons-material";
  import { useState } from "react";

  type TodoItemType = {
    id: string;
    title: string;
    isCompleted: boolean;
  }; 

  type PropsType = {
    todo: TodoItemType;
    deleteHandler: (id: TodoItemType["id"]) => void;
    completeHandler: (id: TodoItemType["id"]) => void;
    editHandler: (
      id: TodoItemType["id"],
      newTitle: TodoItemType["title"]
    ) => void;
  };
  
  const TodoItem = ({
    todo,
    completeHandler,
    deleteHandler,
    editHandler,
  }: PropsType) => {
    const [editActive, setEditActive] = useState<boolean>(false);
    const [textVal, setTextVal] = useState<string>(todo.title);
  
    return (
      <Paper variant="outlined"
        sx={{
          padding: "1rem",
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          {editActive ? (
            <TextField
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && textVal.trim() !== "") {
                  editHandler(todo.id, textVal);
                  setEditActive(false);
                }
              }}
            />
          ) : (
            <Typography
              marginRight={"auto"}
              sx={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
                color: todo.isCompleted ? "grey.500" : "inherit",
              }}
            >
              {todo.title}
            </Typography>
          )}
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => completeHandler(todo.id)}
          />

          <Button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this item?")) {
                deleteHandler(todo.id);
              }
            }}
            sx={{
              color: "grey.600",
              "&:hover": {
                color: "black",
              },
            }}
          >
            <Delete />
          </Button>
          <Button
            sx={{
              fontWeight: "600",
            }}
            onClick={() => {
              if (editActive) {
                if (textVal.trim() !== "") editHandler(todo.id, textVal);
                else setTextVal(todo.title); // Reset invalid changes
              }
              setEditActive((prev) => !prev);
            }}
          >
            {editActive ? "Done" : "Edit"}
          </Button>
        </Stack>
      </Paper>
    );
  };
  
  export default TodoItem;
  