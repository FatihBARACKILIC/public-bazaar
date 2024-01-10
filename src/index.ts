import express, { Request, Response } from "express";

const app = express();

app.all("/", (req: Request, res: Response) => {
  res.status(201).json({
    message: "Hello, World!",
  });
});

app.listen(3000, () => console.log("http://localhost:3000"));
