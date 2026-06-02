import { tasks } from "@/data/clerk/tasks";
import { QueueTable } from "@/components/queue/QueueTable";
import { Disclosure } from "@/components/shared/Disclosure";

export default function QueuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Work Queue</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Operational back-office tasks pending processing
        </p>
      </div>

      <QueueTable tasks={tasks} />

      <Disclosure variant="inline" />
    </div>
  );
}
