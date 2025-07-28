"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditArticleClient({
  article,
  id,
}: {
  article: { title: string; slug: string; content: string };
  id: string;
}) {
  const [form, setForm] = useState(article);
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin");
  };

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6">Modifier l'article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Titre de l'article"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block font-semibold mb-1">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={form.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="slug-pour-url"
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-semibold mb-1">
            Contenu
          </label>
          <textarea
            id="content"
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
            required
            rows={8}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="Contenu de l'article"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Enregistrer
        </button>
      </form>
    </main>
  );
}
