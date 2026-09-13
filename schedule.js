/*
  BRTCM 2026 CLASS SCHEDULE
  แก้ข้อมูลรายวิชาได้ที่ไฟล์นี้
  โครงสร้าง:
  day / period / th / zh / teacher / weeks / periods / room

  เวลาอ้างอิงจากตารางต้นฉบับ:
  1-2   08:30-09:55
  1-4   08:30-11:35
  2-4   09:15-11:35
  3-4   10:10-11:35
  6-7   13:10-14:35
  6-8   13:10-15:25
  6-10  13:10-16:10
  7-8   13:55-15:25
  7-9   13:55-16:10
  8-9   14:45-16:10
  11-12 18:00-19:25
  11-13 18:00-20:10
*/

const timeMap = {
  "1-2": "08:30–09:55",
  "1-4": "08:30–11:35",
  "2-4": "09:15–11:35",
  "3-4": "10:10–11:35",
  "6-7": "13:10–14:35",
  "6-8": "13:10–15:25",
  "6-10": "13:10–16:10",
  "7-8": "13:55–15:25",
  "7-9": "13:55–16:10",
  "8-9": "14:45–16:10",
  "11-12": "18:00–19:25",
  "11-13": "18:00–20:10"
};

const scheduleData = [
  {day:"mon",period:"morning",th:"ภาษาจีนขั้นสูง (III)",zh:"高级汉语（Ⅲ）",teacher:"闻齐家",weeks:"5-16",periods:"2-4",room:"南6A502"},
  {day:"mon",period:"morning",th:"การปฐมนิเทศนักศึกษา",zh:"始业教育",teacher:"万朵",weeks:"3",periods:"1-4",room:"富春北图书馆二楼报告厅"},
  {day:"tue",period:"morning",th:"ทฤษฎีพื้นฐานการแพทย์แผนจีน",zh:"中医基础理论",teacher:"张天星",weeks:"1-2, 9-17",periods:"3-4",room:"南6A206"},
  {day:"tue",period:"morning",th:"ทฤษฎีพื้นฐานการแพทย์แผนจีน",zh:"中医基础理论",teacher:"张天星",weeks:"3-8",periods:"3-4",room:"慕课自主学习"},
  {day:"tue",period:"morning",th:"การปฐมนิเทศนักศึกษา",zh:"始业教育",teacher:"万朵",weeks:"3",periods:"1-4",room:"富春北图书馆二楼报告厅"},
  {day:"wed",period:"morning",th:"ศึกษาประเทศจีน",zh:"留学中国Study in China ABC",teacher:"罗丹曦",weeks:"3, 5-7",periods:"1-4",room:"南6A206"},
  {day:"wed",period:"morning",th:"ศึกษาประเทศจีน",zh:"留学中国Study in China ABC",teacher:"罗丹曦",weeks:"8-9",periods:"1-4",room:"慕课自主学习"},
  {day:"wed",period:"morning",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"8, 11",periods:"2-4",room:"网课"},
  {day:"wed",period:"morning",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"9-10, 12-15",periods:"2-4",room:"南6A206"},
  {day:"wed",period:"morning",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"16",periods:"3-4",room:"南6A206"},
  {day:"thu",period:"morning",th:"ไท่เก๊ก",zh:"太极拳 (The Chinese Shadowboxing)",teacher:"赵奕旸",weeks:"1-16",periods:"1-2",room:"操场"},
  {day:"thu",period:"morning",th:"ทฤษฎีพื้นฐานการแพทย์แผนจีน",zh:"中医基础理论",teacher:"张天星",weeks:"1-10, 12-17",periods:"3-4",room:"南6B204"},
  {day:"thu",period:"morning",th:"ทฤษฎีพื้นฐานการแพทย์แผนจีน",zh:"中医基础理论",teacher:"张天星",weeks:"11",periods:"3-4",room:"慕课自主学习"},
  {day:"fri",period:"morning",th:"ภาษาจีนขั้นสูง (III)",zh:"高级汉语（Ⅲ）",teacher:"闻齐家",weeks:"1-2, 4-7, 14-15",periods:"2-4",room:"南6A309"},
  {day:"fri",period:"morning",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"13",periods:"1-4",room:"5B508"},

  {day:"mon",period:"afternoon",th:"ภาษาจีนขั้นสูง (III)",zh:"高级汉语（Ⅲ）",teacher:"闻齐家",weeks:"1-2",periods:"7-9",room:"南6A508"},
  {day:"mon",period:"afternoon",th:"ภาพรวมประเทศจีน (I)",zh:"中国概况（Ⅰ）",teacher:"林洁",weeks:"5-14",periods:"6-8",room:"南6A311"},
  {day:"tue",period:"afternoon",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"1-2",periods:"6-8",room:"南6B307"},
  {day:"tue",period:"afternoon",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"5-10",periods:"6-8",room:"南6B307"},
  {day:"tue",period:"afternoon",th:"การปฐมนิเทศนักศึกษา",zh:"始业教育",teacher:"万朵",weeks:"3",periods:"6-10",room:"富春北图书馆二楼报告厅"},
  {day:"wed",period:"afternoon",th:"ภาษาจีนการแพทย์แผนจีน (I)",zh:"中医汉语（Ⅰ）",teacher:"崔小强",weeks:"1-3, 5-11",periods:"7-9",room:"南6B403"},
  {day:"wed",period:"afternoon",th:"ภาษาจีนการแพทย์แผนจีน (I)",zh:"中医汉语（Ⅰ）",teacher:"崔小强",weeks:"12",periods:"7-8",room:"南6B403"},
  {day:"thu",period:"afternoon",th:"วิทยาศาสตร์ใกล้ตัวกับการแพทย์แผนจีน",zh:"科学走近中医",teacher:"张铭珈",weeks:"1-2, 4-17",periods:"6-7",room:"南6A304"},
  {day:"thu",period:"afternoon",th:"ภาษาจีนขั้นสูง (III)",zh:"高级汉语（Ⅲ）",teacher:"闻齐家",weeks:"1-2, 4-16",periods:"8-9",room:"南6B309"},
  {day:"fri",period:"afternoon",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"5",periods:"6-7",room:"网课"},
  {day:"fri",period:"afternoon",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"13",periods:"6-10",room:"5B508"},
  {day:"fri",period:"afternoon",th:"สุขภาพจิตสำหรับนักศึกษา",zh:"大学生心理健康教育",teacher:"",weeks:"6, 17",periods:"6-7",room:"南6A411"},
  {day:"fri",period:"afternoon",th:"สุขภาพจิตสำหรับนักศึกษา",zh:"大学生心理健康教育",teacher:"",weeks:"7-9, 14-15",periods:"6-8",room:"南6A411"},
  {day:"sat",period:"afternoon",th:"การปฐมนิเทศนักศึกษา",zh:"始业教育",teacher:"万朵",weeks:"3",periods:"7-9",room:"网课"},

  {day:"tue",period:"evening",th:"การสื่อสารระหว่างวัฒนธรรม",zh:"跨文化交际学",teacher:"陈晔",weeks:"5-7, 9-12, 14",periods:"11-13",room:"南6A311"},
  {day:"tue",period:"evening",th:"การสื่อสารระหว่างวัฒนธรรม",zh:"跨文化交际学",teacher:"陈晔",weeks:"16",periods:"11-12",room:"南6A311"},
  {day:"tue",period:"evening",th:"ภาพรวมประเทศจีน (I)",zh:"中国概况（Ⅰ）",teacher:"林洁",weeks:"15",periods:"11-12",room:"网课"},
  {day:"wed",period:"evening",th:"สุขภาพจิตสำหรับนักศึกษา",zh:"大学生心理健康教育",teacher:"",weeks:"13",periods:"11-12",room:"南6A211"},
  {day:"wed",period:"evening",th:"การสื่อสารระหว่างวัฒนธรรม",zh:"跨文化交际学",teacher:"陈晔",weeks:"14-15",periods:"11-13",room:"南6A311"},
  {day:"fri",period:"evening",th:"สุขภาพจิตสำหรับนักศึกษา",zh:"大学生心理健康教育",teacher:"",weeks:"4-5, 10",periods:"11-13",room:"南6A411"},
  {day:"fri",period:"evening",th:"สุขภาพจิตสำหรับนักศึกษา",zh:"大学生心理健康教育",teacher:"",weeks:"11",periods:"11-12",room:"南6A411"},
  {day:"fri",period:"evening",th:"ชีวเคมี B",zh:"生物化学B",teacher:"陈晓玲",weeks:"13",periods:"11-13",room:"南5B508"}
];

const dayInfo = {
  mon:{th:"จันทร์",zh:"星期一"}, tue:{th:"อังคาร",zh:"星期二"}, wed:{th:"พุธ",zh:"星期三"},
  thu:{th:"พฤหัสบดี",zh:"星期四"}, fri:{th:"ศุกร์",zh:"星期五"}, sat:{th:"เสาร์",zh:"星期六"}, sun:{th:"อาทิตย์",zh:"星期天"}
};
const periodInfo = {
  morning:{th:"ช่วงเช้า",zh:"上午 AM"},
  afternoon:{th:"ช่วงบ่าย",zh:"下午 PM"},
  evening:{th:"ช่วงเย็น",zh:"晚上 EVE"}
};
