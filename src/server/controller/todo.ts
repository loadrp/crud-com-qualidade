import { read, create } from "@db-crud-todo";
import { NextRequest, NextResponse } from "next/server";

function get(_request: NextRequest, res: NextResponse) {
  const todos = read();
  console.log(todos);
  return NextResponse.json(todos);
}

function post() {}

function update() {}

export const todoController = {
  get,
  post,
  update,
};
