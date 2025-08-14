import { NextRequest, NextResponse } from "next/server";
import { create, read } from "../../../core/crud";
import { todoController } from "@server/controller/todo";

export async function GET(_request: NextRequest, response: NextResponse) {
  const answer = todoController.get(_request, response);
  return answer;
}

// export async function POST(_request: Request) {
//   const response = await create();
//   return response;
//   // ou assim return new Response(JSON.stringify({ todos }));
// }
