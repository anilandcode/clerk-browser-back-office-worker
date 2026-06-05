import { tasks } from "@/data/clerk/tasks";
import { QueueTable } from "@/components/queue/QueueTable";
import { Disclosure } from "@/components/shared/Disclosure";

export default function QueuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-ink)] tracking-tight">
          Work Queue
        </h1>
        <p className="text-[13px] text-[var(--color-ink-secondary)] mt-0.5">
          Operational back-office tasks pending processing
        </p>
      </div>

      <QueueTable tasks={tasks} />

      <Disclosure variant="inline" />
    </div>
  );
}
