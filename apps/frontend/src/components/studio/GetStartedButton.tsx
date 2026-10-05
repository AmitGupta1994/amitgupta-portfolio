"use client";

import { useRef } from "react";

import type { Profile } from "@/types/profile";
import { enquiryMessage, mailtoHref, whatsappHref } from "./contactLinks";
import { Icon } from "./icons";

interface GetStartedButtonProps {
  contact: Profile["contact"];
  /** Named in the prefilled message when the button belongs to a package. */
  packageName?: string;
  /** Line under the dialog title, in the site's voice. */
  prompt: string;
  className?: string;
  children: React.ReactNode;
}

/** Opens a small dialog: continue on WhatsApp, or by email. */
export default function GetStartedButton({ contact, packageName, prompt, className, children }: GetStartedButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const message = enquiryMessage(packageName);
  const whatsapp = whatsappHref(contact, message);
  const subject = packageName ? `Enquiry: ${packageName} package` : "New project enquiry";

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()} className={className}>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="get-started-title"
        // A click on the backdrop lands on the dialog element itself.
        onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-surface p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-8">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-1 text-muted transition-colors hover:text-foreground"
          >
            <Icon name="close" size={20} />
          </button>

          <h2 id="get-started-title" className="text-center text-2xl font-bold">
            Get started
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            {packageName ? `About the ${packageName} package — ` : ""}
            {prompt}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#128C7E]"
              >
                <Icon name="whatsapp" />
                Continue with WhatsApp
              </a>
            )}
            {contact.email && (
              <a
                href={mailtoHref(contact.email, subject, message)}
                className="flex items-center justify-center gap-2 rounded-xl border border-brand px-6 py-4 text-lg font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <Icon name="mail" />
                Continue with email
              </a>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
