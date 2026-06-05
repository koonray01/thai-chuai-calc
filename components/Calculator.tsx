"use client";

import { useMemo, useState } from "react";
import {
  DAILY_GOVERNMENT_LIMIT,
  calculateFromGovernmentLeft,
  calculateFromTotalPrice,
  formatBaht,
} from "@/lib/calculate";

type Mode = "government-left" | "total-price";

const quickAmounts = [200, 150, 100, 50, 30];

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("government-left");
  const [governmentLeft, setGovernmentLeft] = useState<number>(200);
  const [totalPrice, setTotalPrice] = useState<number>(333.33);
  const [copied, setCopied] = useState(false);

  const resultByGovernment = useMemo(
    () => calculateFromGovernmentLeft(governmentLeft),
    [governmentLeft]
  );

  const resultByPrice = useMemo(
    () => calculateFromTotalPrice(totalPrice),
    [totalPrice]
  );

  const copyResult = async () => {
    const text =
      mode === "government-left"
        ? `ไทยช่วยไทย พลัส 60/40\nเงินรัฐที่เหลือ: ${formatBaht(
            resultByGovernment.governmentPay
          )} บาท\nซื้อของได้สูงสุด: ${formatBaht(
            resultByGovernment.maxPurchaseAmount
          )} บาท\nเราจ่ายเอง: ${formatBaht(resultByGovernment.userPay)} บาท`
        : `ไทยช่วยไทย พลัส 60/40\nราคาสินค้า: ${formatBaht(
            resultByPrice.totalPrice
          )} บาท\nรัฐช่วยจ่าย: ${formatBaht(
            resultByPrice.governmentPay
          )} บาท\nเราจ่ายเอง: ${formatBaht(resultByPrice.userPay)} บาท`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-3 rounded-2xl bg-slate-100 p-1 sm:grid-cols-2">
        <button
          onClick={() => setMode("government-left")}
          className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
            mode === "government-left"
              ? "bg-slate-950 text-white shadow"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          เงินรัฐเหลือวันนี้
        </button>
        <button
          onClick={() => setMode("total-price")}
          className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
            mode === "total-price"
              ? "bg-slate-950 text-white shadow"
              : "text-slate-600 hover:bg-white"
          }`}
        >
          ราคาสินค้า
        </button>
      </div>

      {mode === "government-left" ? (
        <div className="mt-8">
          <label htmlFor="governmentLeft" className="text-sm font-bold text-slate-700">
            กรอกเงินรัฐที่เหลือในวันนี้
          </label>
          <div className="mt-3 flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-slate-900">
            <input
              id="governmentLeft"
              type="number"
              inputMode="decimal"
              min={0}
              value={governmentLeft}
              onChange={(event) => setGovernmentLeft(Number(event.target.value))}
              className="w-full bg-transparent text-3xl font-black text-slate-950 outline-none"
              placeholder="เช่น 200"
            />
            <span className="text-lg font-bold text-slate-500">บาท</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setGovernmentLeft(amount)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
              >
                {amount} บาท
              </button>
            ))}
          </div>

          {resultByGovernment.isOverDailyLimit && (
            <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-medium text-amber-800">
              วงเงินรัฐต่อวันถูกจำกัดที่ {DAILY_GOVERNMENT_LIMIT} บาท ระบบจึงคำนวณจาก {DAILY_GOVERNMENT_LIMIT} บาท
            </p>
          )}

          <ResultCard
            headline="วันนี้ซื้อของได้สูงสุด"
            mainValue={`${formatBaht(resultByGovernment.maxPurchaseAmount)} บาท`}
            rows={[
              ["รัฐช่วยจ่าย", `${formatBaht(resultByGovernment.governmentPay)} บาท`],
              ["คุณจ่ายเอง", `${formatBaht(resultByGovernment.userPay)} บาท`],
            ]}
          />
        </div>
      ) : (
        <div className="mt-8">
          <label htmlFor="totalPrice" className="text-sm font-bold text-slate-700">
            กรอกราคาสินค้า/บริการ
          </label>
          <div className="mt-3 flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-slate-900">
            <input
              id="totalPrice"
              type="number"
              inputMode="decimal"
              min={0}
              value={totalPrice}
              onChange={(event) => setTotalPrice(Number(event.target.value))}
              className="w-full bg-transparent text-3xl font-black text-slate-950 outline-none"
              placeholder="เช่น 333.33"
            />
            <span className="text-lg font-bold text-slate-500">บาท</span>
          </div>

          {resultByPrice.isOverDailyLimit && (
            <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-medium text-amber-800">
              ราคานี้ใช้เงินรัฐเกินเพดาน {DAILY_GOVERNMENT_LIMIT} บาท ส่วนที่เกินผู้ซื้อจะจ่ายเองเพิ่ม
            </p>
          )}

          <ResultCard
            headline="สรุปยอดจ่าย"
            mainValue={`คุณจ่ายเอง ${formatBaht(resultByPrice.userPay)} บาท`}
            rows={[
              ["ราคาสินค้า", `${formatBaht(resultByPrice.totalPrice)} บาท`],
              ["รัฐช่วยจ่าย", `${formatBaht(resultByPrice.governmentPay)} บาท`],
            ]}
          />
        </div>
      )}

      <button
        onClick={copyResult}
        className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        {copied ? "คัดลอกแล้ว" : "คัดลอกผลลัพธ์"}
      </button>
    </section>
  );
}

function ResultCard({
  headline,
  mainValue,
  rows,
}: {
  headline: string;
  mainValue: string;
  rows: [string, string][];
}) {
  return (
    <div className="mt-6 rounded-[1.5rem] bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white">
      <p className="text-sm font-bold text-slate-300">{headline}</p>
      <p className="mt-2 text-3xl font-black leading-tight md:text-5xl">{mainValue}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-1 text-xl font-black">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
