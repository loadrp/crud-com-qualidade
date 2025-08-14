import { NextRequest, NextResponse } from "next/server";
import { create, read } from "../../../core/crud";
import { todoController } from "@server/controller/todo";
import { request } from "http";

export async function GET(_request: NextRequest, response: NextResponse) {
  const answer = todoController.get(_request, response);
  return answer;
}

export async function POST(_request: NextRequest) {
  const conteudo = await _request.json();
  await create(conteudo);
  return NextResponse.json({
    status: 201,
  });
  // ou assim return new Response(JSON.stringify({ todos }));
}
