let currentWeek = 1;
let currentLang = "th";

const icons = {
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M18 10c0 4.2-6 10-6 10S6 14.2 6 10a6 6 0 1 1 12 0Z"/><circle cx="12" cy="10" r="2"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg>',
  image: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.3"/><path d="m5 17 4.5-4 3.2 2.6 2.3-2.1L19 17"/></svg>'
};

function parseWeeks(str) {
  const out = new Set();
  str.replace(/\s/g, "").split(",").forEach(part => {
    if (!part) return;
    if (part.includes("-")) {
      const [a,b] = part.split("-").map(Number);
      for(let i=a;i<=b;i++) out.add(i);
    } else {
      out.add(Number(part));
    }
  });
  return [...out].filter(Boolean).sort((a,b)=>a-b);
}

function weekHas(item, week){ return parseWeeks(item.weeks).includes(week); }

function getTime(periods){
  return timeMap[periods] || "ดูตามคาบ " + periods;
}

function countForWeek(week){
  return scheduleData.filter(x => weekHas(x, week)).length;
}

function uniqueSubjects(week){
  return new Set(scheduleData.filter(x=>weekHas(x,week)).map(x=>x.zh)).size;
}

function renderIcon(name){
  return icons[name] || "";
}

function renderStats(){
  const stats = document.getElementById("stats");
  const count = countForWeek(currentWeek);
  const subjects = uniqueSubjects(currentWeek);
  const days = new Set(scheduleData.filter(x=>weekHas(x,currentWeek)).map(x=>x.day)).size;
  const total = scheduleData.length;
  stats.innerHTML = `
    <div class="stat"><div class="num">${count}</div><div class="label">รายการเรียนในสัปดาห์นี้</div></div>
    <div class="stat"><div class="num">${subjects}</div><div class="label">รายวิชา</div></div>
    <div class="stat"><div class="num">${days}</div><div class="label">วันที่มีเรียน</div></div>
    <div class="stat"><div class="num">${total}</div><div class="label">รายการทั้งหมดในหลักสูตร</div></div>
  `;
}

function renderWeeks(){
  const tabs = document.getElementById("weekTabs");
  tabs.innerHTML = Array.from({length:17},(_,i)=>i+1).map(w=>`
    <button class="week-tab ${w===currentWeek?'active':''}" data-week="${w}">
      <div class="w">W${String(w).padStart(2,"0")}</div>
      <div class="count">${countForWeek(w)} รายการ</div>
    </button>
  `).join("");
  tabs.querySelectorAll(".week-tab").forEach(btn=>{
    btn.addEventListener("click",()=>{
      currentWeek=Number(btn.dataset.week);
      renderAll();
      window.scrollTo({top:document.querySelector(".schedule-section").offsetTop-95,behavior:"smooth"});
    });
  });
}

function courseCard(item){
  const title = currentLang==="th" ? item.th : item.zh;
  const secondary = currentLang==="th" ? item.zh : item.th;
  return `
    <article class="course">
      <div class="course-time">${renderIcon("clock")} ${getTime(item.periods)}</div>
      <div class="course-title">${title}</div>
      <div class="course-zh">${secondary}</div>
      <div class="course-meta">
        <div class="meta">${renderIcon("layers")} <span>คาบ ${item.periods}</span></div>
        ${item.teacher ? `<div class="meta">${renderIcon("user")} <span>${item.teacher}</span></div>` : ""}
        <div class="meta">${renderIcon("pin")} <span>${item.room}</span></div>
      </div>
    </article>
  `;
}

function renderSchedule(){
  const root=document.getElementById("scheduleRoot");
  const days=Object.keys(dayInfo);
  const periods=["morning","afternoon","evening"];
  root.innerHTML = `<div class="day-grid">${
    days.map(day=>{
      const dayItems=scheduleData.filter(x=>x.day===day && weekHas(x,currentWeek));
      return `
        <section class="day-column">
          <header class="day-head">
            <div class="day-name">${dayInfo[day].th}</div>
            <div class="day-zh">${dayInfo[day].zh}</div>
          </header>
          ${periods.map(p=>{
            const items=dayItems.filter(x=>x.period===p);
            if(!items.length) return "";
            return `<div class="slot ${p}">
              <div class="slot-title">${currentLang==="th"?periodInfo[p].th:periodInfo[p].zh}</div>
              ${items.map(courseCard).join("")}
            </div>`;
          }).join("")}
          ${dayItems.length===0 ? `<div class="empty">NO CLASS</div>` : ""}
        </section>
      `;
    }).join("")
  }</div>`;
}

function renderAll(){
  document.getElementById("weekTitle").textContent = currentLang==="th" ? `สัปดาห์ที่ ${currentWeek}` : `第 ${currentWeek} 周`;
  document.getElementById("timelineTitle").textContent = currentLang==="th" ? `สัปดาห์ที่ ${currentWeek}` : `第 ${currentWeek} 周`;
  renderStats();
  renderWeeks();
  renderSchedule();
}

document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    currentLang=btn.dataset.lang;
    document.querySelectorAll(".lang-btn").forEach(b=>b.classList.toggle("active",b===btn));
    renderAll();
  });
});

document.getElementById("imageBtn").addEventListener("click",()=>document.getElementById("imageInput").click());

document.getElementById("imageInput").addEventListener("change",event=>{
  const file=event.target.files?.[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    const hero=document.getElementById("heroVisual");
    hero.style.backgroundImage=`linear-gradient(135deg,rgba(10,10,12,.42),rgba(10,10,12,.25)),url("${e.target.result}")`;
    hero.style.backgroundSize="cover";
    hero.style.backgroundPosition="center";
  };
  reader.readAsDataURL(file);
});

renderAll();
