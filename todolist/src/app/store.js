import userReducer from "../features/Auth/userSlice";
import todosReducer from "../features/Todolist/todoSlice";

const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
  user: userReducer,
  todos: todosReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
