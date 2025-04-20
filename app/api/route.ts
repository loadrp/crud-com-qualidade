import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  return response.status(200).json({ message: "Hello, Next.js!" });
}
