"use client";

import { ENGAGE_EVENT } from "./CompanyContact";

/**
 * Jumps to the contact form with this engagement model preselected. An event
 * rather than a query string, so the prerendered page never re-navigates.
 */
export default function EngageButton({ model, className, children }: { model: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent(ENGAGE_EVENT, { detail: model }))}
      className={className}
    >
      {children}
    </a>
  );
}
