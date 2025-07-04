import express from "express";
const app = express();
export default app;
import tasksRouter from "#api/tasks";
import usersRouter from "#api/users";


app.use(express.json())

app.use("/users", usersRouter)

app.use("/tasks", tasksRouter)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
