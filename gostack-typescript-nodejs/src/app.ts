import express from "express";
import { helloWorldWithExpress } from "./fnc";

const server = express();

server.get("/", helloWorldWithExpress);

server.listen(3333);
