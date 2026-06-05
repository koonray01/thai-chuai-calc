# คำนวณไทยช่วยไทย พลัส 60/40

เว็บคำนวณอย่างไม่เป็นทางการสำหรับช่วยดูว่า หากเงินรัฐที่เหลือวันนี้มีจำนวนหนึ่ง จะซื้อของได้สูงสุดกี่บาทเพื่อใช้สิทธิให้หมดพอดี

## ฟีเจอร์

- กรอกเงินรัฐที่เหลือวันนี้ แล้วคำนวณราคาสินค้าสูงสุด
- กรอกราคาสินค้า แล้วคำนวณว่ารัฐช่วยจ่ายเท่าไหร่ และเราจ่ายเองเท่าไหร่
- ปุ่มลัด 200 / 150 / 100 / 50 / 30 บาท
- ปุ่มคัดลอกผลลัพธ์
- SEO metadata พร้อมใช้งาน
- sitemap.xml และ robots.txt สำหรับ Google Search Console
- Deploy บน Vercel ได้ทันที

## สูตรคำนวณ

โครงการ 60/40:

```txt
ราคาสินค้าสูงสุด = เงินรัฐที่เหลือ ÷ 0.60
คุณจ่ายเอง = ราคาสินค้าสูงสุด × 0.40
```

ตัวอย่าง:

```txt
เงินรัฐเหลือ 200 บาท
ซื้อของได้สูงสุด 333.33 บาท
คุณจ่ายเอง 133.33 บาท
รัฐช่วยจ่าย 200 บาท
```

## วิธีรันในเครื่อง

ติดตั้ง dependency:

```bash
npm install
```

รัน dev server:

```bash
npm run dev
```

เปิดเว็บ:

```txt
http://localhost:3000
```

## วิธี Build

```bash
npm run build
```

## วิธี Deploy บน Vercel

1. อัปโหลดโปรเจกต์นี้ขึ้น GitHub
2. เข้า Vercel
3. Import Git Repository
4. เลือกโปรเจกต์นี้
5. กด Deploy

หลัง Deploy จะได้ URL ประมาณ:

```txt
https://thai-chuai-thai-calculator.vercel.app
```

## สิ่งที่ต้องแก้ก่อนใช้งานจริง

ถ้าเปลี่ยนชื่อโดเมน ให้แก้ URL ในไฟล์เหล่านี้:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

ค้นหาคำนี้แล้วแทนที่ด้วยโดเมนของคุณ:

```txt
https://thai-chuai-thai-calculator.vercel.app
```

## ส่งให้ Google เจอ

หลัง Deploy แล้วให้ทำ:

1. เข้า Google Search Console
2. Add property แบบ URL Prefix
3. ใส่ URL เว็บ Vercel
4. Verify ownership
5. Submit sitemap:

```txt
https://your-domain.vercel.app/sitemap.xml
```

6. ใช้ URL Inspection แล้วกด Request Indexing

## หมายเหตุสำคัญ

เว็บนี้เป็นเครื่องมือคำนวณอย่างไม่เป็นทางการ ไม่ใช่เว็บไซต์ของหน่วยงานรัฐ กรุณาตรวจสอบข้อมูลจริงผ่านช่องทางทางการของโครงการเสมอ
