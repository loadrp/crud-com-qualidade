import { NextRequest, NextResponse } from "next/server";
import { create, read } from "../../../core/crud";
import { todoController } from "@server/controller/todo";

export async function GET(_request: NextRequest, response: NextResponse) {
  const answer = todoController.get(_request, response);
  return answer;
}

export async function POST(_request: Request) {
  const todos = await create();
  return NextResponse.json({ todos });
  // ou assim return new Response(JSON.stringify({ todos }));
}
