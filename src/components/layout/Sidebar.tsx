"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/", icon: "◉" },
  { name: "Queue", href: "/queue", icon: "☰" },
  { name: "Workbench", href: "/workbench", icon: "⊞" },
  { name: "Legacy Portal", href: "/legacy", icon: "❐" },
  { name: "Policies", href: "/policies", icon: "⊘" },
  { name: "Approvals", href: "/approvals", icon: "⊙" },
  { name: "Audit", href: "/audit", icon: "⊟" },
  { name: "Replay", href: "/replay", icon: "▶" },
  { name: "Evals", href: "/evals", icon: "◈" },
  { name: "Architecture", href: "/architecture", icon: "⊡" },
  { name: "About", href: "/about", icon: "◎" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)] z-50 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[var(--color-text)] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-semibold">C</span>
          </div>
          <span className="text-sm font-semibold text-[var(--color-text)]">Clerk</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-sunken)] rounded-md"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[var(--color-bg-elevated)] border-r border-[var(--color-border)] flex flex-col z-50 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-[var(--color-text)] rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-semibold">C</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[var(--color-text)]">Clerk</h1>
              <p className="text-[10px] text-[var(--color-text-subtle)]">Back-Office Worker</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href));
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--color-action-muted)] text-[var(--color-action)] font-medium"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-sunken)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    <span className="text-xs w-4 text-center opacity-70">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Disclosure Footer */}
        <div className="px-4 py-4 border-t border-[var(--color-border)]">
          <div className="px-3 py-2 bg-[var(--color-bg-sunken)] rounded-md">
            <p className="text-[10px] text-[var(--color-text-subtle)] leading-relaxed">
              Synthetic legacy workspace · Simulated browser actions · No real systems connected
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
