"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/Modal";
import { ContactForm } from "@/components/ContactForm";

export function HomeContactButtons({ whatsappLabel }: { whatsappLabel: string }) {
  const tNav = useTranslations("nav");
  const [open, setOpen] = useState<"coaching" | "psicopedagogia" | null>(null);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3.5">
        <a
          href="https://wa.me/34629392949"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary !bg-paper !text-ink"
        >
          {whatsappLabel}
        </a>
        <button
          type="button"
          onClick={() => setOpen("coaching")}
          className="btn border border-white/30 text-paper transition-colors"
        >
          {tNav("coaching")}
        </button>
        <button
          type="button"
          onClick={() => setOpen("psicopedagogia")}
          className="btn border border-white/30 text-paper transition-colors"
        >
          {tNav("psicopedagogia")}
        </button>
      </div>

      <Modal open={open !== null} onClose={() => setOpen(null)}>
        {open && <ContactForm variant={open} />}
      </Modal>
    </>
  );
}
