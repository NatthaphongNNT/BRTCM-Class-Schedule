# BRTCM 2026 Class Schedule — Futuristic Red

เว็บไซต์ตารางเรียน BRTCM 2026 แบบแยกสัปดาห์ 1–17 พร้อมเวลา คาบ ห้อง และผู้สอน

## ไฟล์
- `index.html` — โครงสร้างหน้าเว็บ
- `style.css` — ดีไซน์สีแดง Minimal / Futuristic
- `schedule.js` — ข้อมูลตารางเรียนและเวลา
- `script.js` — ระบบเลือกสัปดาห์ / ภาษา / อัปโหลดภาพ
- `README.md` — คู่มือนี้

## เปิดใน VS Code
แนะนำติดตั้ง Extension ชื่อ **Live Server**
1. เปิดโฟลเดอร์นี้ใน VS Code
2. เปิด `index.html`
3. กด **Go Live** มุมขวาล่าง
4. เว็บจะเปิดที่ `http://127.0.0.1:5500`

## แก้ข้อมูลตาราง
แก้ที่ `schedule.js` เท่านั้น

ตัวอย่าง:
```js
{
  day:"mon",
  period:"morning",
  th:"ชื่อวิชาภาษาไทย",
  zh:"中文课程名称",
  teacher:"ชื่อผู้สอน",
  weeks:"5-16",
  periods:"2-4",
  room:"南6A502"
}
```

เวลาใช้ตาม `periods` ที่กำหนดใน `timeMap` ด้านบนของ `schedule.js`

## อัปเดต GitHub Pages
เมื่อแก้ไฟล์แล้ว:
1. เข้า Repository `BRTCM-Class-Schedule`
2. กด **Add file → Upload files**
3. ลาก `index.html`, `style.css`, `schedule.js`, `script.js` และไฟล์อื่นที่ต้องการขึ้นไป
4. เลือก **Commit directly to the main branch**
5. กด **Commit changes**
6. ไปที่ **Settings → Pages**
7. ตรวจสอบว่า Source = **Deploy from a branch**
8. Branch = **main**
9. Folder = **/(root)**
10. รอ GitHub Pages deploy แล้วเปิดหน้าเว็บ

สำคัญ: `index.html` ต้องอยู่ที่ root ของ repository ไม่ควรอยู่ในโฟลเดอร์ย่อย ถ้า Pages ตั้งเป็น `main / (root)`

## หมายเหตุเรื่องภาพ
ปุ่มภาพด้านบนสามารถเลือกภาพจากเครื่องเพื่อแสดงบนเครื่องนั้นได้ทันที แต่ถ้าต้องการให้คนอื่นเห็นภาพเดียวกันบน GitHub Pages ให้ใส่ภาพไว้ใน repository เช่น `assets/hero.jpg` แล้วแก้ HTML/CSS ให้เรียกไฟล์นั้น
