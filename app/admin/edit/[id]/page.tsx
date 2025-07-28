import { use } from "react";
import EditArticleClient from "./Clientpage";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const article = use(
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${id}`).then((res) => res.json())
  );

  return <EditArticleClient article={article} id={id} />;
}
