"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CtaBanner } from "./CtaBanner";
import { Modal } from "./Modal";
import { ContactForm } from "./ContactForm";

export function ContactCta({ variant }: { variant: "coaching" | "psicopedagogia" }) {
  const t = useTranslations(variant);
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <>
      <CtaBanner
        title={t("cta.title")}
        lede={t("cta.lede")}
        ctaLabel={tCommon("writeUs")}
        onClick={() => setOpen(true)}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <ContactForm variant={variant} />
      </Modal>
    </>
  );
}
