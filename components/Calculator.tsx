"use client";

import { useMemo, useState } from "react";
import {
  DAILY_GOVERNMENT_LIMIT,
  calculateFromGovernmentLeft,
  calculateFromTotalPrice,
  formatBaht,
} from "@/lib/calculate";

type Mode = "government-left" | "total-price";

const quickAmounts = [
  { label: "เต็มวัน 200", value: 200 },
  { label: "เหลือ 150", value: 150 },
  { label: "ครึ่งสิทธิ 100", value: 100 },
  { label: "เหลือ 80", value: 80 },
  { label: "เหลือ 50", value: 50 },
  { label: "เหลือ 30", value: 30 },
];

function normalizeMoneyInput(value: string): string | null {
  const normalized = value.trim().replace(",", ".");

  if (normalized === "") {
    return "";
  }

  if (!/^\d*\.?\d*$/.test(normalized)) {
    return null;
  }

  if (normalized === ".") {
    return "0.";
  }

  const [wholePart, decimalPart] = normalized.split(".");
  const wholeWithoutLeadingZero = wholePart.replace(/^0+(?=\d)/, "");
  const whole = wholeWithoutLeadingZero || "0";

  if (normalized.includes(".")) {
    return `${whole}.${decimalPart ?? ""}`;
  }

  return whole;
}

function parseMoneyInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("government-left");
  const [governmentLeft, setGovernmentLeft] = useState("200");
  const [totalPrice, setTotalPrice] = useState("333.33");
  const [copied, setCopied] = useState(false);

  const resultByGovernment = useMemo(
    () => calculateFromGovernmentLeft(parseMoneyInput(governmentLeft)),
    [governmentLeft]
  );

  const resultByPrice = useMemo(
    () => calculateFromTotalPrice(parseMoneyInput(totalPrice)),
    [totalPrice]
  );

  const shareText =
    mode === "government-left"
      ? `เงินรัฐเหลือ ${formatBaht(resultByGovernment.governmentPay)} บาท
ควรซื้อของไม่เกิน ${formatBaht(resultByGovernment.maxPurchaseAmount)} บาท
เราจ่ายเองประมาณ ${formatBaht(resultByGovernment.userPay)} บาท
รัฐช่วยจ่าย ${formatBaht(resultByGovernment.governmentPay)} บาท
คำนวณได้ที่ https://thai-chuai-calc.vercel.app/`
      : `ราคาสินค้า ${formatBaht(resultByPrice.totalPrice)} บาท
เราจ่ายเองประมาณ ${formatBaht(resultByPrice.userPay)} บาท
รัฐช่วยจ่าย ${formatBaht(resultByPrice.governmentPay)} บาท
คำนวณได้ที่ https://thai-chuai-calc.vercel.app/`;

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const shareResult = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "คำนวณไทยช่วยไทย พลัส 60/40",
          text: shareText,
          url: "https://thai-chuai-calc.vercel.app/",
        });
        return;
      } catch {
        return;
      }
    }

    await copyResult();
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="grid gap-2 rounded-xl bg-slate-100 p-1 sm:grid-cols-2">
        <button
          onClick={() => setMode("government-left")}
          className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
            mode === "government-left"
              ? "bg-slate-950 text-white shadow"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          ผู้ใช้สิทธิ
        </button>
        <button
          onClick={() => setMode("total-price")}
          className={`rounded-lg px-4 py-3 text-sm font-bold transition ${
            mode === "total-price"
              ? "bg-slate-950 text-white shadow"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          ร้านค้า / ราคาสินค้า
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {mode === "government-left"
          ? "กรอกเงินรัฐที่เหลือ แล้วคำนวณยอดซื้อสูงสุด"
          : "กรอกราคาสินค้า แล้วคำนวณว่าลูกค้าจ่ายเองเท่าไหร่ รัฐช่วยเท่าไหร่"}
      </p>

      {mode === "government-left" ? (
        <div className="mt-6">
          <label htmlFor="governmentLeft" className="text-sm font-bold text-slate-700">
            เงินรัฐที่เหลือวันนี้
          </label>
          <div className="mt-3 flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-slate-900">
            <input
              id="governmentLeft"
              type="number"
              inputMode="decimal"
              min={0}
              value={governmentLeft}
              onChange={(event) => {
                const nextValue = normalizeMoneyInput(event.target.value);

                if (nextValue !== null) {
                  setGovernmentLeft(nextValue);
                }
              }}
              className="w-full bg-transparent text-3xl font-black text-slate-950 outline-none"
              placeholder="เช่น 200"
            />
            <span className="text-lg font-bold text-slate-500">บาท</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount.value}
                onClick={() => setGovernmentLeft(String(amount.value))}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
              >
                {amount.label}
              </button>
            ))}
          </div>

          {resultByGovernment.isOverDailyLimit && (
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-800">
              เงินรัฐต่อวันใช้คำนวณได้สูงสุด {DAILY_GOVERNMENT_LIMIT} บาท ระบบจึงคำนวณจากเพดานรัฐช่วยจ่ายต่อวัน
            </p>
          )}

          <ResultCard
            headline={`ถ้าเงินรัฐเหลือ ${formatBaht(resultByGovernment.governmentPay)} บาท`}
            mainValue={`วันนี้คุณควรซื้อของไม่เกิน ${formatBaht(resultByGovernment.maxPurchaseAmount)} บาท`}
            rows={[
              ["คุณจ่ายเองประมาณ", `${formatBaht(resultByGovernment.userPay)} บาท`],
              ["รัฐช่วยจ่าย", `${formatBaht(resultByGovernment.governmentPay)} บาท`],
            ]}
            note="แนะนำให้ซื้อของไม่เกินยอดนี้ เพื่อใช้สิทธิรัฐให้หมดพอดี"
          />
        </div>
      ) : (
        <div className="mt-6">
          <label htmlFor="totalPrice" className="text-sm font-bold text-slate-700">
            ราคาสินค้า / บริการ
          </label>
          <div className="mt-3 flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-slate-900">
            <input
              id="totalPrice"
              type="number"
              inputMode="decimal"
              min={0}
              value={totalPrice}
              onChange={(event) => {
                const nextValue = normalizeMoneyInput(event.target.value);

                if (nextValue !== null) {
                  setTotalPrice(nextValue);
                }
              }}
              className="w-full bg-transparent text-3xl font-black text-slate-950 outline-none"
              placeholder="เช่น 333.33"
            />
            <span className="text-lg font-bold text-slate-500">บาท</span>
          </div>

          {resultByPrice.isOverDailyLimit && (
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-800">
              ยอดนี้เกินเพดานรัฐช่วยจ่ายต่อวันแล้ว รัฐช่วยสูงสุด {DAILY_GOVERNMENT_LIMIT} บาท ส่วนที่เกินคุณต้องจ่ายเองเต็มจำนวน
            </p>
          )}

          <ResultCard
            headline={`ราคาสินค้า ${formatBaht(resultByPrice.totalPrice)} บาท`}
            mainValue={`ลูกค้าจ่ายเองประมาณ ${formatBaht(resultByPrice.userPay)} บาท`}
            rows={[
              ["รัฐช่วยจ่าย", `${formatBaht(resultByPrice.governmentPay)} บาท`],
              ["ยอดสินค้ารวม", `${formatBaht(resultByPrice.totalPrice)} บาท`],
            ]}
          />
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={copyResult}
          className="rounded-xl bg-slate-950 px-5 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          {copied ? "คัดลอกแล้ว" : "คัดลอกผลลัพธ์"}
        </button>
        <button
          onClick={shareResult}
          className="rounded-xl border border-slate-300 bg-white px-5 py-4 text-base font-black text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-950"
        >
          แชร์ให้เพื่อน
        </button>
      </div>
    </section>
  );
}

function ResultCard({
  headline,
  mainValue,
  rows,
  note,
}: {
  headline: string;
  mainValue: string;
  rows: [string, string][];
  note?: string;
}) {
  return (
    <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white md:p-6">
      <p className="text-sm font-bold text-slate-300">{headline}</p>
      <p className="mt-2 text-3xl font-black leading-tight md:text-4xl">{mainValue}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-1 text-xl font-black">{value}</p>
          </div>
        ))}
      </div>
      {note ? <p className="mt-5 rounded-xl bg-white/10 p-4 text-sm leading-6 text-slate-100">{note}</p> : null}
    </div>
  );
}
