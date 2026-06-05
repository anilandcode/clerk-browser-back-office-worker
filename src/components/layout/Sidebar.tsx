"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Queue,
  Browsers,
  Building,
  ShieldCheck,
  CheckCircle,
  Scroll,
  PlayCircle,
  ChartBar,
  TreeStructure,
  Info,
  List,
  X,
} from "@phosphor-icons/react";

const navigation = [
  { name: "Home", href: "/", icon: House },
  { name: "Queue", href: "/queue", icon: Queue },
  { name: "Workbench", href: "/workbench", icon: Browsers },
  { name: "Legacy Portal", href: "/legacy", icon: Building },
  { name: "Policies", href: "/policies", icon: ShieldCheck },
  { name: "Approvals", href: "/approvals", icon: CheckCircle },
  { name: "Audit", href: "/audit", icon: Scroll },
  { name: "Replay", href: "/replay", icon: PlayCircle },
  { name: "Evals", href: "/evals", icon: ChartBar },
  { name: "Architecture", href: "/architecture", icon: TreeStructure },
  { name: "About", href: "/about", icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--color-surface-elevated)] border-b border-[var(--color-rule)] z-50 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[var(--color-ink)] rounded-[var(--radius-md)] flex items-center justify-center">
            <span className="text-white text-xs font-semibold tracking-tight">C</span>
          </div>
          <span className="text-[15px] font-semibold text-[var(--color-ink)] tracking-tight">
            Clerk
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-sunken)] rounded-[var(--radius-md)] transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={18} /> : <List size={18} />
          }
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-60 bg-[var(--color-surface-elevated)] border-r border-[var(--color-rule)] flex flex-col z-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[var(--color-rule)]">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-8 h-8 bg-[var(--color-ink)] rounded-[var(--radius-md)] flex items-center justify-center">
              <span className="text-white text-[13px] font-semibold tracking-tight">
                C
              </span>
            </div>
            <div>
              <h1 className="text-[15px] font-semibold text-[var(--color-ink)] tracking-tight leading-none">
                Clerk
              </h1>
              <p className="text-[11px] text-[var(--color-ink-tertiary)] mt-0.5 tracking-tight">
                Back-Office Worker
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-0.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-[7px] rounded-[var(--radius-md)] text-[13px] transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-medium"
                        : "text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    <Icon
                      size={16}
                      weight={isActive ? "fill" : "regular"}
                      className="shrink-0"
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Disclosure Footer */}
        <div className="px-4 py-4 border-t border-[var(--color-rule)]">
          <div className="px-3 py-2.5 bg-[var(--color-surface-sunken)] rounded-[var(--radius-md)]">
            <p className="text-[10px] text-[var(--color-ink-ghost)] leading-relaxed">
              Synthetic legacy workspace
              <br />
              Simulated browser actions
              <br />
              No real systems connected
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
