import { connectDB } from "@/lib/mongoose";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const articles = await Article.find().sort({ createdAt: -1 });
  return NextResponse.json(articles);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newArticle = await Article.create(body);

  return NextResponse.json(newArticle);
}
