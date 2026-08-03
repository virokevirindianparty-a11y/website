import { createEvent } from "@/lib/actions/admin-events";
import { EventForm } from "../event-form";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-navy mb-6">New Event</h1>
      <EventForm action={createEvent} />
    </div>
  );
}
