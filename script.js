let currentLang = "th";
let selectedWeek = "all";
let selectedDay = "all";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function expandWeeks(text){
  const out = new Set();
  text.replace(/\s/g,"").split(",").forEach(part=>{
    if(!part) return;
    if(part.includes("-")){
      const [a,b] = part.split("-").map(Number);
      for(let i=a;i<=b;i++) out.add(i);
    }else{
      out.add(Number(part));
    }
  });
  return [...out].filter(Boolean);
}
function hasWeek(item, week){
  return week === "all" || expandWeeks(item.weeks).includes(Number(week));
}
function uniqueCourses(){
  const map = new Map();
  scheduleData.forEach(x=>{
    const key=x.zh;
    if(!map.has(key)) map.set(key,x);
  });
  return [...map.values()];
}
function i18nText(key){
  const dict = {
    th:{
      navSchedule:"ตารางเรียน",navCourses:"รายวิชา",navAbout:"ข้อมูล",addImage:"เพิ่มรูปภาพ",
      addImageHint:"เลือกภาพจากเครื่องของคุณได้",uploadImage:"ใส่รูปภาพ",removeImage:"ลบรูปภาพ",
      eyebrow:"CLASS SCHEDULE · 2026",heroTitle:"ตารางเรียน",heroDesc:"ตารางเรียนสองภาษา ไทย–จีน ที่ออกแบบให้ดูง่าย ค้นหาวิชาและเช็กคาบเรียนได้อย่างรวดเร็ว",
      viewSchedule:"ดูตารางเรียน",quickInfo:"QUICK INFO",introTitle:"จัดตารางเรียนให้เข้าใจง่ายในหน้าเดียว",
      introDesc:"เลือกสัปดาห์เพื่อดูเฉพาะวิชาที่มีเรียนในสัปดาห์นั้น หรือเลือก “ทั้งหมด” เพื่อดูภาพรวมทั้งภาคการศึกษา",
      statCourses:"รายวิชา",statWeeks:"สัปดาห์สูงสุด",statPeriods:"ช่วงเวลา",weekLabel:"สัปดาห์",dayLabel:"วัน",
      allWeeks:"ทั้งหมด",allDays:"ทุกวัน",scheduleTitle:"ตารางเรียนรายสัปดาห์",coursesTitle:"รายวิชาทั้งหมด",
      howTitle:"ใช้งานง่าย 1–2–3",step1Title:"เลือกสัปดาห์",step1Desc:"ระบบจะแสดงเฉพาะคาบที่มีเรียน",
      step2Title:"ดูวันและคาบ",step2Desc:"แยกช่วงเช้า บ่าย และเย็นชัดเจน",step3Title:"ใส่รูปของคุณ",step3Desc:"เลือกรูปจากเครื่องเพื่อเปลี่ยนภาพด้านบน",
      footer:"แก้ไขข้อมูลได้จากไฟล์ schedule.js"
    },
    zh:{
      navSchedule:"课程表",navCourses:"课程",navAbout:"信息",addImage:"添加图片",
      addImageHint:"从你的设备选择图片",uploadImage:"上传图片",removeImage:"删除图片",
      eyebrow:"CLASS SCHEDULE · 2026",heroTitle:"课程表",heroDesc:"泰语–中文双语课程表，清晰查看课程、星期和节次。",
      viewSchedule:"查看课程表",quickInfo:"QUICK INFO",introTitle:"把课程安排放在一个页面里",
      introDesc:"选择周数只显示当周课程，也可以选择“全部”查看整个学期。",
      statCourses:"门课程",statWeeks:"最多周数",statPeriods:"时间段",weekLabel:"周",dayLabel:"星期",
      allWeeks:"全部",allDays:"所有星期",scheduleTitle:"每周课程表",coursesTitle:"全部课程",
      howTitle:"简单三步",step1Title:"选择周数",step1Desc:"只显示该周有课的时间",
      step2Title:"查看星期和节次",step2Desc:"上午、下午、晚上清晰分开",step3Title:"添加你的图片",step3Desc:"从设备选择图片替换顶部主图",
      footer:"可在 schedule.js 文件中修改课程资料"
    }
  };
  return dict[currentLang][key] || key;
}
function applyLanguage(){
  $$("[data-i18n]").forEach(el=>el.textContent=i18nText(el.dataset.i18n));
  document.documentElement.lang=currentLang==="th"?"th":"zh";
  $$(".lang-btn").forEach(b=>b.classList.toggle("active",b.dataset.lang===currentLang));
  render();
}
function card(item){
  const metaTeacher = item.teacher ? `👤 ${item.teacher}` : "";
  return `<article class="class-card">
    <span class="badge">${currentLang==="th"?"สัปดาห์ ":"第"}${item.weeks}</span>
    <div class="course">${item.th}</div>
    <div class="zh">${item.zh}</div>
    <div class="class-meta">
      <span>⏱ ${currentLang==="th"?"คาบ ":"节次 "}${item.periods}</span>
      ${metaTeacher ? `<span>${metaTeacher}</span>` : ""}
      <span>⌂ ${item.room}</span>
    </div>
  </article>`;
}
function render(){
  const grid=$("#scheduleGrid");
  const days=Object.keys(dayInfo).filter(d=>selectedDay==="all"||d===selectedDay);
  grid.innerHTML=days.map(day=>{
    const dayItems=scheduleData.filter(x=>x.day===day && hasWeek(x,selectedWeek));
    return `<div class="day-column">
      <div class="day-head"><b>${dayInfo[day].th}</b><span>${dayInfo[day].zh}</span></div>
      ${["morning","afternoon","evening"].map(period=>{
        const items=dayItems.filter(x=>x.period===period);
        return `<div class="period-title">${periodInfo[period].th} · ${periodInfo[period].zh}</div>
          ${items.length ? items.map(card).join("") : `<div class="empty">${currentLang==="th"?"ไม่มีเรียน":"无课程"}</div>`}`;
      }).join("")}
    </div>`;
  }).join("");
  const note = selectedWeek==="all"
    ? (currentLang==="th" ? "แสดงข้อมูลทั้งหมดจากตารางเรียนต้นฉบับ" : "显示原始课程表中的全部资料")
    : (currentLang==="th" ? `กำลังดูสัปดาห์ที่ ${selectedWeek}` : `正在查看第 ${selectedWeek} 周`);
  $("#weekNote").textContent=note;
  renderCourses();
}
function renderCourses(){
  $("#courseCount").textContent=uniqueCourses().length;
  $("#courseList").innerHTML=uniqueCourses().map((x,i)=>`
    <article class="course-item">
      <span class="num">${String(i+1).padStart(2,"0")}</span>
      <h3>${x.th}</h3>
      <p>${x.zh}</p>
      <span>${currentLang==="th"?"อาจารย์":"教师"}: ${x.teacher||"—"}</span>
    </article>`).join("");
}
function initWeekOptions(){
  const select=$("#weekSelect");
  for(let i=1;i<=17;i++){
    const opt=document.createElement("option");
    opt.value=i; opt.textContent=currentLang==="th"?`สัปดาห์ ${i}`:`第 ${i} 周`;
    select.appendChild(opt);
  }
}
$("#weekSelect").addEventListener("change",e=>{selectedWeek=e.target.value;render()});
$("#daySelect").addEventListener("change",e=>{selectedDay=e.target.value;render()});
$$(".lang-btn").forEach(btn=>btn.addEventListener("click",()=>{
  currentLang=btn.dataset.lang;
  const selected=$("#weekSelect").value;
  $("#weekSelect").innerHTML=`<option value="all">${i18nText("allWeeks")}</option>`;
  initWeekOptions();
  $("#weekSelect").value=selected;
  applyLanguage();
}));
$("#imageInput").addEventListener("change",e=>{
  const file=e.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    localStorage.setItem("classScheduleHero",reader.result);
    showImage(reader.result);
  };
  reader.readAsDataURL(file);
});
function showImage(src){
  $("#heroImage").src=src;
  $("#heroImage").classList.remove("hidden");
  $("#heroPlaceholder").classList.add("hidden");
}
function removeImage(){
  localStorage.removeItem("classScheduleHero");
  $("#heroImage").src="";
  $("#heroImage").classList.add("hidden");
  $("#heroPlaceholder").classList.remove("hidden");
  $("#imageInput").value="";
}
$("#clearImage").addEventListener("click",removeImage);

const savedImage=localStorage.getItem("classScheduleHero");
if(savedImage) showImage(savedImage);
initWeekOptions();
applyLanguage();
