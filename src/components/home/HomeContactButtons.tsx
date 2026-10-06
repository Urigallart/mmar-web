"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/Modal";
import { ContactForm } from "@/components/ContactForm";

export function HomeContactButtons({ emailLabel }: { emailLabel: string }) {
  const tNav = useTranslations("nav");
  const [open, setOpen] = useState<"coaching" | "psicopedagogia" | null>(null);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3.5">
        <a
          href="mailto:mmarserracanta@gmail.com"
          className="btn btn-primary !bg-paper !text-ink hover:!bg-green-pale"
        >
          {emailLabel}
        </a>
        <button
          type="button"
          onClick={() => setOpen("coaching")}
          className="btn border border-white/30 text-paper transition-colors hover:border-white/60 hover:bg-white/10"
        >
          {tNav("coaching")}
        </button>
        <button
          type="button"
          onClick={() => setOpen("psicopedagogia")}
          className="btn border border-white/30 text-paper transition-colors hover:border-white/60 hover:bg-white/10"
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
