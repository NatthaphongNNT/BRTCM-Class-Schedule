let currentWeek = 1;
let currentLang = "th";

/* LIVE CLASS STATUS
   The live clock is ALWAYS calculated in China Standard Time.
   IANA timezone: Asia/Shanghai = UTC+8.

   IMPORTANT:
   Set currentAcademicWeek to the real academic week.
   The source timetable does not provide a semester-start date, so the site
   intentionally does not guess the current academic week.
*/
const LIVE_SETTINGS = {
  timeZone: "Asia/Shanghai",
  currentAcademicWeek: 1,
  warningMinutes: 15,
  tickMs: 1000
};

const icons = {
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M18 10c0 4.2-6 10-6 10S6 14.2 6 10a6 6 0 1 1 12 0Z"/><circle cx="12" cy="10" r="2"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg>',
  image: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.3"/><path d="m5 17 4.5-4 3.2 2.6 2.3-2.1L19 17"/></svg>',
  live: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.2"/></svg>'
};

const dayKeyFromChinaWeekday = { Mon:"mon", Tue:"tue", Wed:"wed", Thu:"thu", Fri:"fri", Sat:"sat", Sun:"sun" };

function parseWeeks(str) {
  const out = new Set();
  str.replace(/\s/g, "").split(",").forEach(part => {
    if (!part) return;
    if (part.includes("-")) {
      const [a,b] = part.split("-").map(Number);
      for(let i=a;i<=b;i++) out.add(i);
    } else out.add(Number(part));
  });
  return [...out].filter(Boolean).sort((a,b)=>a-b);
}

function weekHas(item, week){ return parseWeeks(item.weeks).includes(week); }
function getTime(periods){ return timeMap[periods] || "ดูตามคาบ " + periods; }
function countForWeek(week){ return scheduleData.filter(x => weekHas(x, week)).length; }
function uniqueSubjects(week){ return new Set(scheduleData.filter(x=>weekHas(x,week)).map(x=>x.zh)).size; }
function renderIcon(name){ return icons[name] || ""; }

function getChinaNowParts() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LIVE_SETTINGS.timeZone,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());
  const get = type => parts.find(p => p.type === type)?.value || "00";
  return {
    weekday: get("weekday"),
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    second: Number(get("second"))
  };
}

function minutesOfDay(h, m){ return h * 60 + m; }

function parseTimeRange(periods){
  const range = timeMap[periods];
  if(!range) return null;
  const [start,end] = range.split("–");
  const parse = value => {
    const [h,m] = value.trim().split(":").map(Number);
    return minutesOfDay(h,m);
  };
  return { start: parse(start), end: parse(end) };
}

function getLiveState(item, now) {
  if (currentWeek !== LIVE_SETTINGS.currentAcademicWeek) return "offline";
  if (dayKeyFromChinaWeekday[now.weekday] !== item.day) return "offline";

  const range = parseTimeRange(item.periods);
  if (!range) return "offline";

  const nowMin = minutesOfDay(now.hour, now.minute) + now.second / 60;
  const warningStart = range.start - LIVE_SETTINGS.warningMinutes;

  if (nowMin >= range.end) return "ended";
  if (nowMin >= range.start && nowMin < range.end) return "live";
  if (nowMin >= warningStart && nowMin < range.start) return "soon";
  return "upcoming";
}

function liveLabel(state){
  if(currentLang === "zh") {
    return { soon:"即将开始", live:"正在上课", ended:"课程结束", upcoming:"未开始", offline:"" }[state];
  }
  return { soon:"ใกล้ถึงเวลา", live:"กำลังเรียน", ended:"เรียนจบแล้ว", upcoming:"ยังไม่ถึงเวลา", offline:"" }[state];
}

function liveSubLabel(state, item){
  const range = parseTimeRange(item.periods);
  if(!range) return "";
  if(state === "soon") {
    const now = getChinaNowParts();
    const nowSec = now.hour * 3600 + now.minute * 60 + now.second;
    const startSec = Math.floor(range.start) * 60;
    const mins = Math.max(1, Math.ceil((startSec - nowSec) / 60));
    return currentLang === "zh" ? `${mins} 分钟后开始` : `เริ่มใน ${mins} นาที`;
  }
  if(state === "live") return currentLang === "zh" ? `结束 ${getTime(item.periods).split("–")[1]}` : `จบ ${getTime(item.periods).split("–")[1]}`;
  if(state === "ended") return currentLang === "zh" ? "今日已结束" : "วันนี้จบแล้ว";
  return currentLang === "zh" ? `上课时间 ${getTime(item.periods)}` : `เวลาเรียน ${getTime(item.periods)}`;
}

function renderChinaClock(){
  const clock = document.getElementById("chinaClock");
  if(!clock) return;
  const now = getChinaNowParts();
  const hh = String(now.hour).padStart(2,"0");
  const mm = String(now.minute).padStart(2,"0");
  const ss = String(now.second).padStart(2,"0");
  clock.innerHTML = `${renderIcon("live")} <span>CHINA <b>${hh}:${mm}:${ss}</b></span>`;
  clock.title = `China Standard Time — ${now.year}-${String(now.month).padStart(2,"0")}-${String(now.day).padStart(2,"0")}`;
}

function updateLiveStatus(){
  const now = getChinaNowParts();
  renderChinaClock();

  document.querySelectorAll(".course[data-day]").forEach(card => {
    const item = {
      day: card.dataset.day,
      periods: card.dataset.periods
    };
    const state = getLiveState(item, now);
    card.dataset.liveState = state;
    card.classList.remove("is-soon","is-live","is-ended");
    if(state === "soon") card.classList.add("is-soon");
    if(state === "live") card.classList.add("is-live");
    if(state === "ended") card.classList.add("is-ended");

    const badge = card.querySelector(".live-badge");
    const sub = card.querySelector(".live-sub");
    const progress = card.querySelector(".course-progress > span");
    if(badge){
      badge.textContent = liveLabel(state);
      badge.hidden = state === "offline" || state === "upcoming";
    }
    if(sub){
      sub.textContent = liveSubLabel(state, item);
      sub.hidden = state === "offline";
    }

    if(progress){
      const range = parseTimeRange(item.periods);
      let pct = 0;
      if(range && dayKeyFromChinaWeekday[now.weekday] === item.day && currentWeek === LIVE_SETTINGS.currentAcademicWeek){
        const nowMin = minutesOfDay(now.hour, now.minute) + now.second / 60;
        pct = Math.max(0, Math.min(100, ((nowMin - range.start) / (range.end - range.start)) * 100));
      }
      progress.style.width = `${pct}%`;
    }
  });
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
  const title = currentLang === "th" ? item.th : item.zh;
  const secondary = currentLang === "th" ? item.zh : item.th;
  return `
    <article class="course" data-day="${item.day}" data-periods="${item.periods}">
      <div class="course-status-row">
        <div class="course-time">${renderIcon("clock")} ${getTime(item.periods)}</div>
        <span class="live-badge" hidden></span>
      </div>
      <div class="course-title">${title}</div>
      <div class="course-zh">${secondary}</div>
      <div class="course-meta">
        <div class="meta">${renderIcon("layers")} <span>คาบ ${item.periods}</span></div>
        ${item.teacher ? `<div class="meta">${renderIcon("user")} <span>${item.teacher}</span></div>` : ""}
        <div class="meta">${renderIcon("pin")} <span>${item.room}</span></div>
      </div>
      <div class="live-detail"><span class="live-sub" hidden></span><div class="course-progress"><span></span></div></div>
    </article>
  `;
}

function renderSchedule(){
  const root=document.getElementById("scheduleRoot");
  const days=Object.keys(dayInfo);
  const periods=["morning","afternoon","evening"];
  root.innerHTML = `<div class="day-grid">${days.map(day=>{
    const dayItems=scheduleData.filter(x=>x.day===day && weekHas(x,currentWeek));
    return `
      <section class="day-column">
        <header class="day-head">
          <div class="day-name">${currentLang === "th" ? dayInfo[day].th : dayInfo[day].zh}</div>
          <div class="day-zh">${currentLang === "th" ? dayInfo[day].zh : dayInfo[day].th}</div>
        </header>
        ${periods.map(p=>{
          const items=dayItems.filter(x=>x.period===p);
          if(!items.length) return "";
          return `<div class="slot ${p}">
            <div class="slot-title">${currentLang === "th" ? periodInfo[p].th : periodInfo[p].zh}</div>
            ${items.map(courseCard).join("")}
          </div>`;
        }).join("")}
        ${dayItems.length===0 ? `<div class="empty">NO CLASS</div>` : ""}
      </section>
    `;
  }).join("")}</div>`;
  updateLiveStatus();
}

function renderAll(){
  document.getElementById("weekTitle").textContent = currentLang === "th" ? `สัปดาห์ที่ ${currentWeek}` : `第 ${currentWeek} 周`;
  document.getElementById("timelineTitle").textContent = currentLang === "th" ? `สัปดาห์ที่ ${currentWeek}` : `第 ${currentWeek} 周`;
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
    hero.style.backgroundImage=`linear-gradient(135deg,rgba(10,10,12,.55),rgba(10,10,12,.28)),url("${e.target.result}")`;
    hero.style.backgroundSize="cover";
    hero.style.backgroundPosition="center";
  };
  reader.readAsDataURL(file);
});

renderAll();
setInterval(updateLiveStatus, LIVE_SETTINGS.tickMs);
