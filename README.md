# BRTCM 2026 — Thai / Chinese Class Schedule

เว็บไซต์ Prototype ตารางเรียนสองภาษา โดยแยกเป็น HTML / CSS / JavaScript เพื่อแก้ไขง่ายใน Visual Studio Code

## ไฟล์
- `index.html` — โครงสร้างหน้าเว็บ
- `style.css` — สี ฟอนต์ ระยะห่าง และ Responsive
- `schedule.js` — ข้อมูลตารางเรียน แก้ชื่อวิชา อาจารย์ สัปดาห์ คาบ และห้องที่นี่
- `script.js` — ระบบเลือกสัปดาห์/วัน, สลับภาษา, และอัปโหลดรูป
- `README.md` — คู่มือนี้

## วิธีเปิดใน Visual Studio Code
1. แตก ZIP
2. เปิดโฟลเดอร์ `class-schedule-website` ใน Visual Studio Code
3. เปิด `index.html`
4. แนะนำให้ติดตั้งส่วนขยาย **Live Server**
5. คลิกขวา `index.html` → **Open with Live Server**

ไม่ต้องติดตั้ง Node.js และไม่ต้องมีฐานข้อมูลสำหรับ Prototype นี้

## วิธีเปลี่ยนข้อมูลตารางเรียน
เปิด `schedule.js` แล้วแก้ข้อมูล เช่น

```js
{
  day:"mon",
  period:"morning",
  th:"ภาษาจีนขั้นสูง (III)",
  zh:"高级汉语（Ⅲ）",
  teacher:"闻齐家",
  weeks:"5-16",
  periods:"2-4",
  room:"南6A502"
}
```

ค่า `day`: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`

ค่า `period`: `morning`, `afternoon`, `evening`

## วิธีใส่รูป
กด **ใส่รูปภาพ** บนหน้าเว็บ แล้วเลือกรูปจากคอมพิวเตอร์ รูปจะถูกจำไว้ใน browser เครื่องนั้นด้วย Local Storage

หมายเหตุ: รูปที่ผู้ใช้เลือกจากเครื่อง **ไม่ได้ถูกอัปโหลดขึ้นเซิร์ฟเวอร์** ดังนั้นถ้าจะให้คนอื่นเห็นรูปเดียวกันบนเว็บไซต์จริง ควรใส่ไฟล์รูปไว้ในโฟลเดอร์โปรเจกต์แล้วกำหนด `src="images/ชื่อรูป.jpg"` ใน `index.html` แทน

## วิธีเอาขึ้นเว็บให้คนอื่นเปิดได้

### วิธีที่ 1 — GitHub Pages (แนะนำสำหรับ Prototype)
1. สมัคร/เข้าสู่ GitHub
2. สร้าง Repository ใหม่ เช่น `brtcm-class-schedule`
3. อัปโหลด `index.html`, `style.css`, `schedule.js`, `script.js`
4. ไปที่ **Settings → Pages**
5. เลือก **Deploy from a branch**
6. เลือก branch `main` และ folder `/root`
7. Save
8. รอสักครู่ แล้ว GitHub จะให้ลิงก์เว็บไซต์

### วิธีที่ 2 — Netlify
1. เข้า Netlify
2. สร้าง site ใหม่
3. ลากโฟลเดอร์โปรเจกต์ขึ้นไป
4. ระบบจะสร้าง URL ให้ทันที

## ถ้าต้องการแก้บนเว็บจริงภายหลัง
Prototype นี้เป็น Static Website จึงเหมาะกับงานนำเสนอ/ฝึกงาน หากต้องการให้ผู้ดูแลสามารถล็อกอินแล้วเพิ่ม/แก้ตารางจากหน้าเว็บได้จริง จะต้องเพิ่ม Backend + Database หรือใช้บริการจัดเก็บข้อมูลเพิ่มเติม
