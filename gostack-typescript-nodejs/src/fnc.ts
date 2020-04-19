import { Request, Response } from "express";
import { createUser } from "./createUser";

export function helloWorldWithExpress(request: Request, response: Response) {
  const newUser = createUser({
    name: "333",
    email: "pedro@pedro.com",
    password: "123",
    techs: [
      "NodeJS",
      {
        type: "ReactJS",
      },
    ],
  });

  response.json({ message: "Hello " + newUser.name });
}
