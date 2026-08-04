import {
  listContactSubmissions,
  listVolunteerSubmissions,
  listJoinSubmissions,
  listDonationInterest,
} from "@/lib/data/submissions";

export const dynamic = "force-dynamic";

function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Record<string, React.ReactNode>>;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted py-6">No submissions yet.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-cream text-navy text-left">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2.5 font-heading font-semibold whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface">
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col} className="px-4 py-2.5 align-top text-muted">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function SubmissionsPage() {
  const [contact, volunteer, join, donate] = await Promise.all([
    listContactSubmissions(),
    listVolunteerSubmissions(),
    listJoinSubmissions(),
    listDonationInterest(),
  ]);

  return (
    <div className="space-y-12">
      <h1 className="font-heading font-extrabold text-2xl text-navy">Submissions</h1>

      <section id="join">
        <h2 className="font-heading font-bold text-lg text-navy mb-3">
          Join Applications ({join.length})
        </h2>
        <Table
          columns={["Date", "Name", "Phone", "City/Village", "Volunteer?", "Motivation"]}
          rows={join.map((r) => ({
            Date: new Date(r.createdAt).toLocaleString(),
            Name: r.name,
            Phone: r.phone,
            "City/Village": r.constituency,
            "Volunteer?": r.wantsToVolunteer ? "Yes" : "No",
            Motivation: r.motivation || "—",
          }))}
        />
      </section>

      <section id="volunteer">
        <h2 className="font-heading font-bold text-lg text-navy mb-3">
          Volunteers ({volunteer.length})
        </h2>
        <Table
          columns={["Date", "Name", "Phone", "Email", "City/Village", "Help types", "Message"]}
          rows={volunteer.map((r) => ({
            Date: new Date(r.createdAt).toLocaleString(),
            Name: r.name,
            Phone: r.phone,
            Email: r.email ?? "—",
            "City/Village": r.constituency ?? "—",
            "Help types": r.helpTypes.join(", "),
            Message: r.message ?? "—",
          }))}
        />
      </section>

      <section id="contact">
        <h2 className="font-heading font-bold text-lg text-navy mb-3">
          Contact Messages ({contact.length})
        </h2>
        <Table
          columns={["Date", "Name", "Email", "Phone", "Message"]}
          rows={contact.map((r) => ({
            Date: new Date(r.createdAt).toLocaleString(),
            Name: r.name,
            Email: r.email,
            Phone: r.phone ?? "—",
            Message: r.message,
          }))}
        />
      </section>

      <section id="donate">
        <h2 className="font-heading font-bold text-lg text-navy mb-3">
          Donation Interest ({donate.length})
        </h2>
        <Table
          columns={["Date", "Name", "Phone", "Email", "Amount", "Message"]}
          rows={donate.map((r) => ({
            Date: new Date(r.createdAt).toLocaleString(),
            Name: r.name,
            Phone: r.phone,
            Email: r.email ?? "—",
            Amount: r.amountRange ?? "—",
            Message: r.message ?? "—",
          }))}
        />
      </section>
    </div>
  );
}
