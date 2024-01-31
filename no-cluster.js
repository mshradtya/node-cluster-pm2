import express from "express";

const port = 3000;
const app = express();

app.get("/heavy", (req, res) => {
  let total = 0;
  for (let i = 0; i < 50_000_000; i++) {
    total++;
  }
  res.send("the result of the CPU intensive task is: " + total);
});
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("worker pid: ", process.pid);
});
