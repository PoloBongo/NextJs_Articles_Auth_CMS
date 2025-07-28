"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) router.push("/admin");
  };

  return (
    <main className="max-w-sm mx-auto p-6 dark:bg-gray-800 rounded">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            Se connecter
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => router.push("/")}
          >
            Page d'accueil
          </button>
        </div>
      </form>
    </main>
  );
}
