export const getTodos = (): TodoItemType[] => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };
  
  export const saveTodos = (todos: TodoItemType[]): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };