import { createNews } from "@/lib/actions/admin-news";
import { NewsForm } from "../news-form";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-navy mb-6">New News Post</h1>
      <NewsForm action={createNews} />
    </div>
  );
}
