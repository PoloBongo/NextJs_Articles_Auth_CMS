import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

import AdminClient from "./AdminClient";

type Article = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdBy: string;
  createdAt: string;
};

async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/articles`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erreur de chargement des articles");
  return res.json();
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const articles = await fetchArticles();

  return <AdminClient session={session} articles={articles} />;
}
