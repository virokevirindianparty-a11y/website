import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { listAllNews } from "@/lib/data/news";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteNews } from "@/lib/actions/admin-news";

export const dynamic = "force-dynamic";

export default async function AdminNewsListPage() {
  const posts = await listAllNews();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-extrabold text-2xl text-navy">News</h1>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 bg-saffron text-white text-sm font-heading font-semibold px-4 py-2.5 rounded-full hover:bg-saffron-dark transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted text-sm">No news posts yet.</p>
      ) : (
        <div className="bg-surface border border-border rounded-xl divide-y divide-border overflow-hidden">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="font-heading font-bold text-navy truncate">{post.titleEn}</p>
                <p className="text-xs text-muted mt-0.5">
                  /{post.slug} ·{" "}
                  <span className={post.published ? "text-green-dark" : "text-amber-600"}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/news/${post.id}/edit`}
                  className="p-2 rounded-lg border border-border hover:border-saffron text-navy"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </Link>
                <DeleteButton action={deleteNews.bind(null, post.id)} label={`Delete "${post.titleEn}"`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
