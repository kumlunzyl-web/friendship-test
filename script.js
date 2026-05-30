const questions = [
  {
    text: "你们约好见面，最可能发生什么？",
    options: [
      { text: "一个人迟到，另一个人已经习惯并点好喝的", score: 18 },
      { text: "两个人都提前到，还互相说“你怎么这么早”", score: 22 },
      { text: "边走边改地点，最后发现更好玩", score: 16 },
      { text: "先在聊天框里讨论半小时穿什么", score: 20 },
    ],
  },
  {
    text: "朋友突然发来一句“我跟你说”，你会？",
    options: [
      { text: "立刻放下手里的事，准备接瓜", score: 23 },
      { text: "回一个问号，但内心已经坐直", score: 19 },
      { text: "先猜三种可能，命中率还挺高", score: 21 },
      { text: "直接打电话，因为文字已经装不下", score: 24 },
    ],
  },
  {
    text: "你们最像哪种组合？",
    options: [
      { text: "一个负责冲动，一个负责假装冷静", score: 20 },
      { text: "两个都很会笑场，正事推进靠缘分", score: 17 },
      { text: "互相吐槽，但别人不能吐槽对方", score: 24 },
      { text: "一个开脑洞，一个负责把脑洞变计划", score: 22 },
    ],
  },
  {
    text: "如果一起旅行，最重要的是？",
    options: [
      { text: "吃到好吃的，路线可以临时变", score: 18 },
      { text: "拍很多照片，留下证据", score: 16 },
      { text: "别太累，快乐比打卡重要", score: 21 },
      { text: "哪怕迷路，也要把它讲成传奇", score: 23 },
    ],
  },
  {
    text: "你们的聊天记录最像什么？",
    options: [
      { text: "大型连续剧，人物关系复杂", score: 22 },
      { text: "表情包资料库，文字只是配菜", score: 18 },
      { text: "人生客服中心，什么都能问", score: 24 },
      { text: "随机灵感仓库，偶尔很有哲理", score: 19 },
    ],
  },
];

const results = [
  {
    min: 108,
    title: "宇宙级默契搭子",
    text: "你们的友情已经进入不用多解释的阶段。一个眼神能开会，一个语气词能报警，聊天记录很可能值得申请非物质快乐遗产。",
    tags: ["默契爆表", "互相偏心", "长期稳定发疯"],
  },
  {
    min: 96,
    title: "高浓度快乐同盟",
    text: "你们很会把普通日子过成小型综艺。哪怕只是买杯饮料，也能发展出三段剧情和一个新梗。",
    tags: ["快乐密度高", "梗很多", "适合一起旅行"],
  },
  {
    min: 84,
    title: "可靠型友谊小队",
    text: "你们不一定天天黏在一起，但关键时刻很能接住彼此。友情不吵闹，却有一种很踏实的存在感。",
    tags: ["稳稳的", "很会倾听", "低调但重要"],
  },
  {
    min: 0,
    title: "潜力型新鲜朋友",
    text: "你们还有很多剧情没有解锁。多一起吃饭、散步、分享奇怪想法，友谊值会涨得很快。",
    tags: ["继续开发", "适合多见面", "未来可期"],
  },
];

const setupPanel = document.querySelector("#setupPanel");
const quizPanel = document.querySelector("#quizPanel");
const resultPanel = document.querySelector("#resultPanel");
const nameForm = document.querySelector("#nameForm");
const questionText = document.querySelector("#questionText");
const progressText = document.querySelector("#progressText");
const meterFill = document.querySelector("#meterFill");
const options = document.querySelector("#options");
const scoreBadge = document.querySelector("#scoreBadge");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const resultTags = document.querySelector("#resultTags");
const againButton = document.querySelector("#againButton");

let names = { a: "", b: "" };
let index = 0;
let total = 0;

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  names = {
    a: document.querySelector("#nameA").value.trim() || "你",
    b: document.querySelector("#nameB").value.trim() || "朋友",
  };
  index = 0;
  total = 0;
  setupPanel.classList.add("hidden");
  resultPanel.classList.add("hidden");
  quizPanel.classList.remove("hidden");
  renderQuestion();
});

againButton.addEventListener("click", () => {
  resultPanel.classList.add("hidden");
  setupPanel.classList.remove("hidden");
  window.scrollTo({ top: document.querySelector(".app").offsetTop - 20, behavior: "smooth" });
});

function renderQuestion() {
  const question = questions[index];
  const count = String(index + 1).padStart(2, "0");
  progressText.textContent = `Question ${count} / ${String(questions.length).padStart(2, "0")}`;
  questionText.textContent = question.text;
  meterFill.style.width = `${(index / questions.length) * 100}%`;
  options.innerHTML = question.options
    .map((option) => `<button class="option" data-score="${option.score}">${option.text}</button>`)
    .join("");

  options.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => choose(Number(button.dataset.score)));
  });
}

function choose(score) {
  total += score;
  index += 1;
  if (index >= questions.length) {
    showResult();
    return;
  }
  renderQuestion();
}

function showResult() {
  const percent = Math.min(99, Math.round((total / 116) * 100));
  const result = results.find((item) => total >= item.min);
  meterFill.style.width = "100%";
  quizPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  scoreBadge.textContent = `${percent}%`;
  resultTitle.textContent = `${names.a} 和 ${names.b}：${result.title}`;
  resultText.textContent = result.text;
  resultTags.innerHTML = result.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  window.scrollTo({ top: resultPanel.offsetTop - 20, behavior: "smooth" });
}
