"use client";

import { useState } from "react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Article = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdBy: string;
  createdAt: string;
};

export default function AdminClient({
  session,
  articles: initialArticles,
}: {
  session: Session;
  articles: Article[];
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [filterMine, setFilterMine] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Erreur lors du chargement des articles");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        content,
        createdBy: session.user.id.toString(),
      }),
    });

    setTitle("");
    setSlug("");
    setContent("");
    fetchArticles();
  };

  const filteredArticles = filterMine
    ? articles.filter((a) => a.createdBy === session.user.id)
    : articles;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenue, {session.user?.email}</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
        >
          Se déconnecter
        </button>
      </div>
      <div className="dark:bg-gray-800 rounded">
        <h3 className="text-2xl font-bold p-3">Ajouter un article</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-3">
          <input
            className="w-full p-2 border rounded"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Contenu"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Ajouter
          </button>
        </form>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Articles existants</h2>
        <div className="space-x-2">
          <button
            type="submit"
            onClick={() => setFilterMine(false)}
            className={`px-4 py-2 rounded cursor-pointer ${
              !filterMine ? "bg-blue-600 text-white" : "bg-blue-300"
            }`}
          >
            Tous les articles
          </button>{" "}
          <button
            type="submit"
            onClick={() => setFilterMine(true)}
            className={`px-4 py-2 rounded cursor-pointer ${
              filterMine ? "bg-blue-600 text-white" : "bg-blue-300"
            }`}
          >
            Vos articles créent
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {filteredArticles.map((article) => (
          <li
            key={article._id}
            className="border p-4 rounded shadow dark:bg-gray-800"
          >
            <h3 className="font-bold">{article.title}</h3>
            <p className="text-sm text-gray-500">{article.slug}</p>
            <Link
              href={`/admin/edit/${article._id}`}
              className="text-blue-600 underline mt-2 inline-block cursor-pointer"
            >
              Modifier
            </Link>
            <button
              onClick={async () => {
                if (confirm("Supprimer cet article ?")) {
                  await fetch(`/api/articles/${article._id}`, {
                    method: "DELETE",
                  });
                  fetchArticles();
                }
              }}
              className="text-red-600 underline ml-4 cursor-pointer"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
