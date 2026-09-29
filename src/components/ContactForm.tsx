"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ variant }: { variant: "coaching" | "psicopedagogia" }) {
  const t = useTranslations(`${variant}.form`);
  const tCommon = useTranslations("common.form");
  const [status, setStatus] = useState<Status>("idle");

  const focusOrAreasOptions = (variant === "coaching" ? t.raw("focusOptions") : t.raw("areasOptions")) as string[];
  const otherOption = focusOrAreasOptions[focusOrAreasOptions.length - 1];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
    formData.append("subject", variant === "coaching" ? "Nova consulta de Coaching" : "Nova consulta de Psicopedagogia");
    formData.append("from_name", "Mª del Mar — Web");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center">
        <p className="font-medium text-ink" style={{ fontSize: "var(--fs-h3)" }}>
          {tCommon("success")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow mb-4">{t("eyebrow")}</p>
      <p className="mb-8 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
        {t("title")}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {variant === "psicopedagogia" ? (
          <>
            <Field label={t("guardianLabel")} name="guardian_name" required />
            <Field label={t("childLabel")} name="child_name_age" required />
            <Field label={t("schoolYearLabel")} name="school_year" />
          </>
        ) : (
          <Field label={t("nameLabel")} name="full_name" required />
        )}

        <CheckboxGroup
          label={variant === "coaching" ? t("focusLabel") : t("areasLabel")}
          name={variant === "coaching" ? "focus" : "areas"}
          options={focusOrAreasOptions}
          otherOption={otherOption}
          otherPlaceholder={tCommon("otherPlaceholder")}
        />

        {variant === "coaching" ? (
          <>
            <TextArea label={t("motivationLabel")} name="motivation" />
            <TextArea label={t("goalLabel")} name="goal" />
            <Field label={t("contextLabel")} name="context" />
          </>
        ) : (
          <>
            <TextArea label={t("concernLabel")} name="concern" />
            <RadioGroup
              label={t("priorSupportLabel")}
              name="prior_support"
              yesLabel={tCommon("yes")}
              noLabel={tCommon("no")}
            />
          </>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={t("phoneLabel")} name="phone" type="tel" />
          <Field label={t("emailLabel")} name="email" type="email" required />
        </div>

        {status === "error" && <p className="text-sm text-red-600">{tCommon("error")}</p>}

        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-fit disabled:opacity-60">
          {status === "sending" ? tCommon("sending") : tCommon("submit")}
          <ArrowIcon />
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-ink">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-xl border border-border bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-green-deep focus:ring-2 focus:ring-green-deep/20"
      />
    </label>
  );
}

function TextArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-ink">{label}</span>
      <textarea
        name={name}
        rows={4}
        className="rounded-xl border border-border bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-green-deep focus:ring-2 focus:ring-green-deep/20"
      />
    </label>
  );
}

function CheckboxGroup({
  label,
  name,
  options,
  otherOption,
  otherPlaceholder,
}: {
  label: string;
  name: string;
  options: string[];
  otherOption: string;
  otherPlaceholder: string;
}) {
  const [otherChecked, setOtherChecked] = useState(false);

  return (
    <fieldset className="flex flex-col gap-3 text-sm">
      <legend className="mb-1 font-medium text-ink">{label}</legend>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2.5 text-ink-dim">
            <input
              type="checkbox"
              name={name}
              value={option}
              onChange={option === otherOption ? (e) => setOtherChecked(e.target.checked) : undefined}
              className="h-4 w-4 flex-shrink-0 rounded border-border-strong text-green-deep focus:ring-green-deep/30"
            />
            {option}
          </label>
        ))}
      </div>
      {otherChecked && (
        <input
          type="text"
          name={`${name}_other`}
          placeholder={otherPlaceholder}
          className="mt-1 rounded-xl border border-border bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-green-deep focus:ring-2 focus:ring-green-deep/20"
        />
      )}
    </fieldset>
  );
}

function RadioGroup({
  label,
  name,
  yesLabel,
  noLabel,
}: {
  label: string;
  name: string;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <fieldset className="flex flex-col gap-3 text-sm">
      <legend className="mb-1 font-medium text-ink">{label}</legend>
      <div className="flex gap-6">
        <label className="flex items-center gap-2.5 text-ink-dim">
          <input type="radio" name={name} value={yesLabel} className="h-4 w-4 text-green-deep focus:ring-green-deep/30" />
          {yesLabel}
        </label>
        <label className="flex items-center gap-2.5 text-ink-dim">
          <input type="radio" name={name} value={noLabel} className="h-4 w-4 text-green-deep focus:ring-green-deep/30" />
          {noLabel}
        </label>
      </div>
    </fieldset>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
