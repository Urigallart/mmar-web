"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { Modal } from "./Modal";
import { dateKey, formatDay, wallNow, weekdayOf } from "@/lib/booking";

export function BookingButton({ label }: { label: string }) {
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
        {open && <BookingFlow />}
      </Modal>
    </>
  );
}

type Status = "idle" | "sending" | "success" | "error" | "taken";

function BookingFlow() {
  const t = useTranslations("booking");
  const locale = useLocale();
  const today = useMemo(() => wallNow(), []);
  const [cursor, setCursor] = useState({ y: today.y, m: today.m });
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [days, setDays] = useState<Record<string, string[]> | null>(null);
  const [loadError, setLoadError] = useState(false);

  const loadDays = useCallback(async () => {
    try {
      const res = await fetch("/api/availability", { cache: "no-store" });
      const json = await res.json();
      setDays(json.days ?? {});
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/availability", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setDays(json.days ?? {});
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });

  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(cursor.y, cursor.m - 1, 1))
  );
  const weekdays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) =>
        new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, 1 + i)))
      ),
    [locale]
  );

  const firstOffset = (weekdayOf(dateKey(cursor.y, cursor.m, 1)) + 6) % 7;
  const daysInMonth = new Date(Date.UTC(cursor.y, cursor.m, 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: firstOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => dateKey(cursor.y, cursor.m, i + 1)),
  ];
  const hasAvailability = (key: string) => (days?.[key]?.length ?? 0) > 0;
  const atCurrentMonth = cursor.y === today.y && cursor.m === today.m;

  const shiftMonth = (delta: number) => {
    const d = new Date(Date.UTC(cursor.y, cursor.m - 1 + delta, 1));
    setCursor({ y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 });
  };

  const times = day ? (days?.[day] ?? []) : [];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!day || !time) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: day, time, ...form }),
      });
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 409) {
        setStatus("taken");
        setTime(null);
        loadDays();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" && day && time) {
    return (
      <div role="status" className="py-6 text-center">
        <p className="font-medium text-ink" style={{ fontSize: "var(--fs-h3)" }}>
          {t("successTitle")}
        </p>
        <p className="mt-3 text-ink-dim">{t("successText", { when: `${formatDay(day, locale)} · ${time}` })}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow mb-4">{t("eyebrow")}</p>
      <h2 className="font-semibold tracking-tight text-ink" style={{ fontSize: "var(--fs-h3)" }}>
        {t("title")}
      </h2>
      <p className="mt-2 text-ink-dim">{t("intro")}</p>

      {days === null ? (
        <p className="mt-8 text-ink-dim">{loadError ? t("error") : t("loading")}</p>
      ) : (
      <div className="mt-8 grid gap-8 sm:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={atCurrentMonth}
              aria-label={t("prevMonth")}
              className="grid h-9 w-9 place-items-center rounded-full border border-border-strong text-ink disabled:opacity-30"
            >
              ‹
            </button>
            <p className="font-medium text-ink first-letter:uppercase">{monthLabel}</p>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label={t("nextMonth")}
              className="grid h-9 w-9 place-items-center rounded-full border border-border-strong text-ink"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase text-ink-dim">
            {weekdays.map((w, i) => (
              <span key={i} className="py-1">
                {w}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((key, i) =>
              key ? (
                <button
                  key={key}
                  type="button"
                  disabled={!hasAvailability(key)}
                  onClick={() => {
                    setDay(key);
                    setTime(null);
                  }}
                  className={clsx(
                    "aspect-square rounded-full text-sm transition-colors",
                    hasAvailability(key)
                      ? day === key
                        ? "bg-ink font-semibold text-paper"
                        : "bg-green-pale font-medium text-ink"
                      : "text-ink-dim/40"
                  )}
                >
                  {Number(key.slice(8))}
                </button>
              ) : (
                <span key={`e${i}`} />
              )
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-ink">
            {day ? formatDay(day, locale) : t("chooseDay")}
          </p>
          {day && (
            <>
              <div className="grid grid-cols-3 gap-2">
                {times.map((tm) => (
                  <button
                    key={tm}
                    type="button"
                    onClick={() => setTime(tm)}
                    className={clsx(
                      "rounded-full border py-2 text-sm transition-colors",
                      time === tm ? "border-ink bg-ink font-semibold text-paper" : "border-border-strong text-ink"
                    )}
                  >
                    {tm}
                  </button>
                ))}
              </div>
              {times.length === 0 && <p className="text-sm text-ink-dim">{t("noTimes")}</p>}
              <p className="mt-3 text-xs text-ink-dim">{t("timeZoneNote")}</p>
            </>
          )}
        </div>
      </div>
      )}

      {day && time && (
        <form onSubmit={submit} className="mt-8 flex flex-col gap-5 border-t border-border pt-8">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <p className="text-sm font-medium text-ink">
            {formatDay(day, locale)} · {time}
          </p>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-ink">{t("nameLabel")}</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-border bg-paper px-4 py-3 text-ink outline-none focus:border-green-deep focus:ring-2 focus:ring-green-deep/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-ink">{t("emailLabel")}</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl border border-border bg-paper px-4 py-3 text-ink outline-none focus:border-green-deep focus:ring-2 focus:ring-green-deep/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-ink">{t("messageLabel")}</span>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-xl border border-border bg-paper px-4 py-3 text-ink outline-none focus:border-green-deep focus:ring-2 focus:ring-green-deep/20"
            />
          </label>
          {status === "taken" && (
            <p role="alert" className="text-sm text-red-600">
              {t("taken")}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-600">
              {t("error")}
            </p>
          )}
          <button type="submit" disabled={status === "sending"} className="btn btn-primary w-fit disabled:opacity-60">
            {status === "sending" ? t("sending") : t("confirm")}
          </button>
        </form>
      )}
    </div>
  );
}
