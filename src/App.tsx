import {
  AppBar,
  Container,
  Stack,
  Toolbar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./components/Todoitem";
import { getTodos, saveTodos } from "./Utils/Features";

type TodoItemType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<string>("");

  const completeHandler = (id: string): void => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  const deleteHandler = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (id: string, newTitle: string): void => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    if (title.trim() !== "") {
      const newTodo: TodoItemType = {
        title: title.trim(),
        isCompleted: false,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      setTodos((prev) => [...prev, newTodo]);
      setTitle("");
    }
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack height="80%" direction="column" spacing="1rem" p="1rem">
        {todos.length === 0 ? (
          <Typography align="center">No tasks yet. Add one!</Typography>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
              editHandler={editHandler}
            />
          ))
        )}
      </Stack>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label="New Task"
        onKeyDown={(e) => {
          if (e.key === "Enter") submitHandler();
        }}
      />
      <Button
        sx={{ margin: "1rem 0" }}
        fullWidth
        variant="contained"
        onClick={submitHandler}
        disabled={title.trim() === ""}
      >
        ADD
      </Button>
    </Container>
  );
};

export default App;
