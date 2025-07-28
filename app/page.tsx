"use client";

import { useEffect, useState } from "react";

type Article = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-6 max-w-3xl mx-auto border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold">Articles</h1>
        <nav className="space-x-4">
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => (window.location.href = "/register")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
          >
            Register
          </button>
        </nav>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">Aucun article disponible.</p>
        ) : (
          <ul className="space-y-6">
            {articles.map((article) => (
              <li
                key={article._id}
                className="p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 transition hover:shadow-lg"
              >
                <h2 className="text-2xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
                  {article.title}
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                  {new Date(article.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {article.content.length > 150
                    ? article.content.slice(0, 150) + "..."
                    : article.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
