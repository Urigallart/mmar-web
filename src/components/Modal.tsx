"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { lenisRef } from "@/lib/lenis";

function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const isClient = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <div
      aria-hidden={!open}
      className={clsx(
        "fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 sm:py-10",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={clsx(
          "relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[var(--radius-card)] bg-paper shadow-[0_30px_80px_-20px_rgba(32,43,40,0.45)] transition-all duration-300",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"
        )}
        style={{ maxHeight: "min(85vh, 900px)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-border-strong bg-paper text-ink transition-colors hover:border-ink"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <div
          data-lenis-prevent
          className="min-h-0 overflow-y-auto overscroll-contain px-6 py-10 sm:px-12 sm:py-12"
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
