import { connectDB } from "@/lib/mongoose";
import Article from "@/models/Article";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const article = await Article.findById(id);

    if (!article) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  const data = await req.json();
  const updated = await Article.findByIdAndUpdate(id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();
  const deleted = await Article.findByIdAndDelete(id);
  return NextResponse.json({ success: !!deleted });
}
