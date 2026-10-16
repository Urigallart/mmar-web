"use client";

import { useState } from "react";
import { Modal } from "./Modal";

export function BookingButton({
  label,
  url,
  openLabel,
}: {
  label: string;
  url: string;
  openLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-primary relative flex-shrink-0 !bg-paper !text-ink hover:!bg-green-pale"
      >
        {label}
        <span className="btn-arrow bg-ink text-paper">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <iframe
          src={url}
          title={label}
          loading="lazy"
          className="h-[620px] w-full rounded-xl border-0 bg-white"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-ink-dim underline underline-offset-4"
        >
          {openLabel}
        </a>
      </Modal>
    </>
  );
}
