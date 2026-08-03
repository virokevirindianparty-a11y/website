import { notFound } from "next/navigation";
import { getEventById } from "@/lib/data/events";
import { updateEvent } from "@/lib/actions/admin-events";
import { EventForm } from "../../event-form";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(Number(id));
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-navy mb-6">Edit Event</h1>
      <EventForm action={updateEvent.bind(null, event.id)} event={event} />
    </div>
  );
}
