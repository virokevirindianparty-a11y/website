import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/data/news";
import { updateNews } from "@/lib/actions/admin-news";
import { NewsForm } from "../../news-form";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getNewsById(Number(id));
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-navy mb-6">Edit News Post</h1>
      <NewsForm action={updateNews.bind(null, post.id)} post={post} />
    </div>
  );
}
