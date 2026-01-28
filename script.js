const texts = {
  ar: {
    title: "اكتب سؤالك وسيجيبك الذكاء الاصطناعي",
    placeholder: "اكتب هنا...",
    sending: "جارٍ التحليل..."
  },
  en: {
    title: "Ask your question and AI will answer",
    placeholder: "Type here...",
    sending: "Analyzing..."
  },
  zh: {
    title: "输入你的问题，AI 将回答",
    placeholder: "在此输入...",
    sending: "正在分析..."
  }
};

const langSelect = document.getElementById("lang");
const typeSelect = document.getElementById("type");
const title = document.getElementById("title");
const textarea = document.getElementById("question");
const result = document.getElementById("result");
const sendBtn = document.getElementById("send");

function updateLang() {
  const l = langSelect.value;
  title.innerText = texts[l].title;
  textarea.placeholder = texts[l].placeholder;
}

langSelect.onchange = updateLang;
updateLang();

sendBtn.onclick = async () => {
  const question = textarea.value.trim();
  if (!question) return alert("اكتب سؤالك");

  const l = langSelect.value;
  const type = typeSelect.value;

  result.innerText = texts[l].sending;

  try {
    const res = await fetch(
      "https://kiukgdrkctbtknimkpds.supabase.co/functions/v1/openai-analyze",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${question}\nنوع التحليل: ${type}`
        })
      }
    );

    const data = await res.json();
    result.innerText =
      data.text ||
      data.result ||
      "لم يتم الحصول على رد من الذكاء الاصطناعي";
  } catch (e) {
    result.innerText = "حصل خطأ في الاتصال بالذكاء الاصطناعي";
  }
};
