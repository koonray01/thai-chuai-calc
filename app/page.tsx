import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_28rem),radial-gradient(circle_at_bottom_right,#fef3c7,transparent_30rem)] px-4 py-8 md:py-14">
      <div className="absolute left-1/2 top-0 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
            เครื่องมือคำนวณอย่างไม่เป็นทางการ
          </p>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            คำนวณไทยช่วยไทย พลัส 60/40
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            กรอกเงินรัฐที่เหลือวันนี้ แล้วระบบจะคำนวณให้ทันทีว่า
            ซื้อของได้สูงสุดกี่บาท เพื่อใช้สิทธิให้หมดพอดีโดยไม่สับสน
          </p>
        </header>

        <div className="mt-10">
          <Calculator />
        </div>

        <section className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
          <InfoCard title="สูตรหลัก" text="ราคาสูงสุด = เงินรัฐที่เหลือ ÷ 0.60" />
          <InfoCard title="ตัวอย่าง" text="เงินรัฐเหลือ 200 บาท ซื้อได้สูงสุด 333.33 บาท" />
          <InfoCard title="เหมาะกับ" text="ผู้ใช้สิทธิและร้านค้าที่อยากคำนวณยอดเร็ว ๆ" />
        </section>

        <section className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-black text-slate-950">คำถามที่พบบ่อย</h2>
          <div className="mt-5 space-y-5 text-slate-700">
            <div>
              <h3 className="font-black">เงินรัฐเหลือ 200 บาท ซื้อของได้กี่บาท?</h3>
              <p className="mt-1 leading-7">ซื้อได้สูงสุดประมาณ 333.33 บาท และคุณจ่ายเองประมาณ 133.33 บาท</p>
            </div>
            <div>
              <h3 className="font-black">เว็บนี้เป็นเว็บทางการไหม?</h3>
              <p className="mt-1 leading-7">ไม่ใช่ เว็บนี้เป็นเครื่องมือคำนวณอย่างไม่เป็นทางการ กรุณาตรวจสอบสิทธิและเงื่อนไขจริงผ่านช่องทางทางการของโครงการ</p>
            </div>
            <div>
              <h3 className="font-black">ทำไมต้องหาร 0.60?</h3>
              <p className="mt-1 leading-7">เพราะโครงการเป็นสัดส่วน 60/40 ถ้าเงินรัฐคือ 60% ของยอดซื้อทั้งหมด ยอดซื้อทั้งหมดจึงเท่ากับเงินรัฐ ÷ 0.60</p>
            </div>
          </div>
        </section>

        <footer className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-slate-500">
          เว็บไซต์นี้จัดทำเพื่อช่วยคำนวณเบื้องต้นเท่านั้น ไม่ใช่เว็บไซต์ของหน่วยงานรัฐ
          และไม่รับประกันความถูกต้องของเงื่อนไขโครงการที่อาจเปลี่ยนแปลงได้
        </footer>
      </div>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <p className="font-black text-slate-950">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
