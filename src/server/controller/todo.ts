import { read, create } from "@db-crud-todo";
import { NextRequest, NextResponse } from "next/server";

function get(request: NextRequest, response: NextResponse) {
  if (request.method === "GET") {
    const ALL_TODOS = read();
    return NextResponse.json({ status: 200, todos: ALL_TODOS });
  }
  return NextResponse.json({
    message: "Method not allowed",
    status: 405,
});
}

function create(request: NextRequest , response: NextResponse) {
  const content = request.body;
  console.log(content);
}

export const todoController = {
  get,
  create
};
