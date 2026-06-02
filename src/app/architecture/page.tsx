import { Disclosure } from "@/components/shared/Disclosure";

const systemFlow = [
  { label: "Work Queue", status: "implemented", description: "5 back-office tasks with types, statuses, and priorities" },
  { label: "Task Instruction", status: "implemented", description: "Detailed instructions for each task including policy references" },
  { label: "Browser Workbench", status: "implemented", description: "3-panel layout with queue, browser frame, and controls" },
  { label: "DOM / Field Observation", status: "simulated", description: "Extracted fields from synthetic invoice and vendor data" },
  { label: "Workflow Memory", status: "implemented", description: "Step plan tracking with state management" },
  { label: "Policy Engine", status: "implemented", description: "7 deterministic policy rules with outcomes" },
  { label: "Approval Gate", status: "implemented", description: "Human-in-the-loop approval for high-risk actions" },
  { label: "Simulated Submit", status: "simulated", description: "No real form submission — state transition only" },
  { label: "Session Recorder", status: "implemented", description: "20 audit events with timestamps and actor tracking" },
  { label: "Audit Report", status: "implemented", description: "Audit trail with filters and event details" },
  { label: "Eval Harness", status: "implemented", description: "60 deterministic test cases across 8 categories" },
];

const statusColors: Record<string, string> = {
  implemented: "bg-[var(--color-approved-bg)] text-[var(--color-approved)]",
  simulated: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  deterministic: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  "future/protected": "bg-gray-100 text-gray-500",
};

const futureComponents = [
  { label: "Live Browser Automation", description: "Playwright/Puppeteer for real browser control" },
  { label: "Computer-Use Model", description: "AI model for visual understanding and action planning" },
  { label: "VNC/Screenshot Loop", description: "Visual feedback for browser state" },
  { label: "Browser Session Recorder", description: "Video recording of browser sessions" },
  { label: "Real Credential Vault", description: "Secure storage for system credentials" },
  { label: "Enterprise Workflow Connector", description: "Integration with real ERP/CRM systems" },
];

export default function ArchitecturePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Architecture</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          System design and workflow explanation
        </p>
      </div>

      {/* System Flow Diagram */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-6">
          System Flow
        </h2>
        <div className="space-y-3">
          {systemFlow.map((component, idx) => (
            <div key={component.label}>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[var(--color-bg-sunken)] border border-[var(--color-border)] flex items-center justify-center text-xs font-mono text-[var(--color-text-subtle)]">
                  {idx + 1}
                </div>
                <div className="flex-1 bg-[var(--color-bg-sunken)] rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-[var(--color-text)]">
                        {component.label}
                      </h3>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                        {component.description}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        statusColors[component.status]
                      }`}
                    >
                      {component.status}
                    </span>
                  </div>
                </div>
              </div>
              {idx < systemFlow.length - 1 && (
                <div className="ml-4 h-4 w-px bg-[var(--color-border)]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">
          Status Labels
        </h2>
        <div className="flex items-center gap-4">
          {Object.entries(statusColors).map(([status, className]) => (
            <div key={status} className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${className}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Implementation */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">
          Current Implementation (Public Demo)
        </h2>
        <div className="grid grid-cols-2 gap-4 text-xs text-[var(--color-text-muted)]">
          <div className="space-y-2">
            <h3 className="font-medium text-[var(--color-text)]">What is implemented:</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Synthetic work queue with 5 tasks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Deterministic policy engine (7 rules)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Approval gates for high-risk actions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Session replay with 8 frames
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Audit trail with 20 events
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                Eval harness with 60 tests
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-[var(--color-text)]">What is simulated:</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-warning)]">~</span>
                Browser actions (no real DOM interaction)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-warning)]">~</span>
                Form submission (state transition only)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-warning)]">~</span>
                ERP system (synthetic LegacyLite portal)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-warning)]">~</span>
                Financial transactions (no real payments)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Future / Protected Mode */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">
          Future / Protected Mode
        </h2>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">
          These components are not implemented in the public demo. They represent potential 
          extensions for production use behind environment flags.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {futureComponents.map((component) => (
            <div
              key={component.label}
              className="bg-[var(--color-bg-sunken)] border border-[var(--color-border)] rounded-lg px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-[var(--color-text)]">
                    {component.label}
                  </h3>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                    {component.description}
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
                  future
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Flags */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">
          Environment Flags (Not Implemented)
        </h2>
        <div className="bg-[var(--color-bg-sunken)] rounded-lg p-4 font-mono text-xs">
          <div className="space-y-1 text-[var(--color-text-muted)]">
            <p>DEMO_MODE=true</p>
            <p>LIVE_BROWSER_MODE=false</p>
            <p>LIVE_COMPUTER_USE_MODE=false</p>
            <p>LIVE_ACTION_MODE=false</p>
            <p>SESSION_RECORDING_MODE=simulated</p>
          </div>
        </div>
        <p className="text-[10px] text-[var(--color-text-subtle)] mt-2">
          These flags are not implemented in the current build. They represent the separation 
          between public demo and potential protected production mode.
        </p>
      </div>

      {/* Safety Model */}
      <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4">
          Safety Model
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-medium text-[var(--color-text)] mb-2">
              Guarantees
            </h3>
            <ul className="space-y-1 text-[10px] text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                No real websites accessed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                No real credentials used
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                No real financial transactions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                No destructive actions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-approved)]">✓</span>
                All actions logged
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium text-[var(--color-text)] mb-2">
              Controls
            </h3>
            <ul className="space-y-1 text-[10px] text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-action)]">→</span>
                Policy engine gates all actions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-action)]">→</span>
                Approval required for high-risk
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-action)]">→</span>
                Blocked actions cannot proceed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-action)]">→</span>
                Audit trail captures everything
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-action)]">→</span>
                Eval harness validates behavior
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Disclosure variant="banner" />
    </div>
  );
}
