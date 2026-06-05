import Calculator from "@/components/Calculator";
import { calculateFromGovernmentLeft, formatBaht } from "@/lib/calculate";

const popularAmounts = [200, 150, 120, 100, 80, 50, 30, 10];

const faqs = [
  {
    question: "เงินรัฐเหลือ 200 บาท ซื้อของได้กี่บาท?",
    answer:
      "ซื้อของได้สูงสุดประมาณ 333.33 บาท เราจ่ายเองประมาณ 133.33 บาท และรัฐช่วยจ่าย 200 บาท",
  },
  {
    question: "เงินรัฐเหลือ 150 บาท ซื้อของได้กี่บาท?",
    answer:
      "ซื้อของได้สูงสุดประมาณ 250.00 บาท เราจ่ายเองประมาณ 100.00 บาท และรัฐช่วยจ่าย 150 บาท",
  },
  {
    question: "เงินรัฐเหลือ 100 บาท ซื้อของได้กี่บาท?",
    answer:
      "ซื้อของได้สูงสุดประมาณ 166.67 บาท เราจ่ายเองประมาณ 66.67 บาท และรัฐช่วยจ่าย 100 บาท",
  },
  {
    question: "ทำไมต้องหาร 0.60?",
    answer:
      "เพราะสัดส่วนไทยช่วยไทย พลัส 60/40 คือรัฐช่วย 60% ของยอดซื้อ ถ้ารู้เงินรัฐที่เหลือ ต้องนำยอดนั้นหาร 0.60 เพื่อหายอดซื้อรวม",
  },
  {
    question: "ถ้าซื้อเกินยอดที่แนะนำจะเกิดอะไรขึ้น?",
    answer:
      "รัฐช่วยได้ไม่เกินเงินรัฐที่เหลือและไม่เกินเพดานต่อวัน ส่วนที่เกินจากสิทธิรัฐผู้ใช้ต้องจ่ายเองเพิ่ม",
  },
  {
    question: "ราคาสินค้า 333.33 บาท รัฐช่วยเท่าไหร่?",
    answer:
      "รัฐช่วยประมาณ 200 บาท และลูกค้าจ่ายเองประมาณ 133.33 บาท ซึ่งเป็นยอดที่ใช้เพดานรัฐช่วย 200 บาทได้พอดี",
  },
  {
    question: "ราคาสินค้าเกิน 333.33 บาท คำนวณอย่างไร?",
    answer:
      "รัฐช่วยสูงสุด 200 บาทต่อวัน ส่วนที่เกินจาก 200 บาทจะถูกบวกเป็นเงินที่ลูกค้าต้องจ่ายเอง",
  },
  {
    question: "ใช้กับยอดในแอปเป๋าตังหรือ G-Wallet ได้ไหม?",
    answer:
      "ใช้เป็นเครื่องมือช่วยคำนวณจากยอดเงินรัฐที่เห็นในแอปได้ แต่ควรตรวจสอบสิทธิและเงื่อนไขจริงในแอปเป๋าตังหรือช่องทางทางการอีกครั้ง",
  },
  {
    question: "ร้านค้าถุงเงินใช้เว็บนี้คำนวณให้ลูกค้าได้ไหม?",
    answer:
      "ใช้ได้ โดยเลือกโหมดร้านค้า / ราคาสินค้า แล้วกรอกราคาสินค้า ระบบจะคำนวณว่าลูกค้าจ่ายเองเท่าไหร่และรัฐช่วยจ่ายเท่าไหร่",
  },
  {
    question: "เว็บนี้เป็นเว็บทางการหรือไม่?",
    answer:
      "ไม่ใช่ เว็บไซต์นี้เป็นเครื่องมือคำนวณอย่างไม่เป็นทางการ ไม่ใช่เว็บไซต์ของหน่วยงานรัฐ",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_460px] lg:items-start">
          <header>
            <p className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600">
              เครื่องมือคำนวณอย่างไม่เป็นทางการ
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              เงินรัฐเหลือเท่านี้ ต้องซื้อของกี่บาท?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              คำนวณยอดซื้อจากเงินรัฐที่เหลือ เพื่อใช้สิทธิไทยช่วยไทย พลัส 60/40 ให้หมดพอดี
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              เปิดแอปแล้วเห็นเงินรัฐเหลือ แต่ไม่รู้ว่าต้องซื้อของกี่บาท? กรอกยอดเงินรัฐที่เหลือวันนี้ แล้วระบบจะคำนวณให้ทันที
            </p>
            <p className="mt-5 max-w-2xl rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              เว็บไซต์นี้เป็นเครื่องมือคำนวณอย่างไม่เป็นทางการ ไม่ใช่เว็บไซต์ของหน่วยงานรัฐ
            </p>
          </header>

          <Calculator />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <section>
          <h2 className="text-2xl font-black">ตารางเงินรัฐเหลือยอดฮิต</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-black">เงินรัฐเหลือ</th>
                  <th className="px-4 py-3 font-black">ซื้อของได้สูงสุด</th>
                  <th className="px-4 py-3 font-black">เราจ่ายเอง</th>
                </tr>
              </thead>
              <tbody>
                {popularAmounts.map((amount) => {
                  const result = calculateFromGovernmentLeft(amount);

                  return (
                    <tr key={amount} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-bold">{amount} บาท</td>
                      <td className="px-4 py-3">{formatBaht(result.maxPurchaseAmount)} บาท</td>
                      <td className="px-4 py-3">{formatBaht(result.userPay)} บาท</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <InfoBlock
            title="ต่างจากเครื่องคิดเลขทั่วไป"
            text="เว็บนี้เริ่มจากเงินรัฐที่เหลือวันนี้ แล้วแปลงกลับเป็นยอดซื้อสูงสุดที่ควรซื้อ เพื่อใช้สิทธิให้หมดพอดี"
          />
          <InfoBlock
            title="รองรับผู้ใช้สิทธิและร้านค้า"
            text="ผู้ใช้สิทธิกรอกเงินรัฐที่เหลือ ส่วนร้านค้าถุงเงินกรอกราคาสินค้าเพื่อดูยอดลูกค้าจ่ายเองและรัฐช่วยจ่าย"
          />
          <InfoBlock
            title="ยึดสูตร 60/40"
            text="รัฐช่วยจ่าย 60% เราจ่าย 40% และคำนวณเพดานรัฐช่วยจ่ายสูงสุด 200 บาทต่อวัน"
          />
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black">คำนวณไทยช่วยไทย พลัส 60/40 แบบใช้งานจริง</h2>
          <div className="mt-4 space-y-4 leading-7 text-slate-700">
            <p>
              เครื่องมือนี้เหมาะสำหรับคนที่เปิดแอปเป๋าตังหรือ G-Wallet แล้วเห็นว่าเงินรัฐเหลือ 200, 150 หรือ 100 บาท
              แต่อยากรู้ทันทีว่ายอดซื้อคุ้มสุดต่อวันควรเป็นเท่าไหร่
            </p>
            <p>
              หากเงินรัฐเหลือ 200 ซื้อได้กี่บาท คำตอบคือประมาณ 333.33 บาท เพราะรัฐช่วยจ่าย 60% หรือ 200 บาท
              และเราจ่าย 40% ประมาณ 133.33 บาท การคำนวณไทยช่วยไทยแบบนี้ช่วยลดการกะยอดผิดและช่วยใช้สิทธิให้หมดพอดี
            </p>
            <p>
              ร้านค้าถุงเงินสามารถใช้โหมดราคาสินค้าเพื่อบอกลูกค้าว่าเราจ่าย 40% เท่าไหร่ รัฐช่วย 60% เท่าไหร่
              โดยระบบจะแสดงคำเตือนเมื่อราคาสินค้าเกินเพดานรัฐช่วยสูงสุด 200 บาทต่อวัน
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black">คำถามที่พบบ่อย</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600">
          เว็บไซต์นี้เป็นเครื่องมือคำนวณอย่างไม่เป็นทางการ ไม่ใช่เว็บไซต์ของหน่วยงานรัฐ กรุณาตรวจสอบสิทธิและข้อมูลจริงผ่านแอปเป๋าตังหรือช่องทางทางการของโครงการ
        </footer>
      </div>
    </main>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="font-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
