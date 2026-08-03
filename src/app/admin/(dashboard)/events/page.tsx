import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { listAllEvents } from "@/lib/data/events";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteEvent } from "@/lib/actions/admin-events";

export const dynamic = "force-dynamic";

export default async function AdminEventsListPage() {
  const items = await listAllEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-extrabold text-2xl text-navy">Events</h1>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 bg-saffron text-white text-sm font-heading font-semibold px-4 py-2.5 rounded-full hover:bg-saffron-dark transition-colors"
        >
          <Plus size={16} />
          New Event
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-muted text-sm">No events yet.</p>
      ) : (
        <div className="bg-surface border border-border rounded-xl divide-y divide-border overflow-hidden">
          {items.map((event) => (
            <div key={event.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="font-heading font-bold text-navy truncate">{event.titleEn}</p>
                <p className="text-xs text-muted mt-0.5">
                  {new Date(event.eventDate).toLocaleString()} · {event.location}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/events/${event.id}/edit`}
                  className="p-2 rounded-lg border border-border hover:border-saffron text-navy"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </Link>
                <DeleteButton action={deleteEvent.bind(null, event.id)} label={`Delete "${event.titleEn}"`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
