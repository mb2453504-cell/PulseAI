const lang = {
  ar: {
    title: "اكتب سؤالك وسيجيبك الذكاء الاصطناعي",
    placeholder: "اكتب هنا...",
    send: "إرسال",
    analyzing: "جارٍ التحليل...",
    contact: "تواصل معنا",
    login: "تسجيل دخول",
    signup: "إنشاء حساب",
    promptSuffix: {
      symptoms: " (تحليل صحة عامة)",
      nutrition: " (تحليل تغذية)",
      fitness: " (تحليل لياقة بدنية)"
    }
  },
  en: {
    title: "Ask your question and AI will answer",
    placeholder: "Type here...",
    send: "Send",
    analyzing: "Analyzing...",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    promptSuffix: {
      symptoms: " (General Health Analysis)",
      nutrition: " (Nutrition Analysis)",
      fitness: " (Fitness Analysis)"
    }
  },
  zh: {
    title: "输入你的问题，AI 会回答",
    placeholder: "在此输入...",
    send: "发送",
    analyzing: "正在分析...",
    contact: "联系",
    login: "登录",
    signup: "注册",
    promptSuffix: {
      symptoms: "（综合健康分析）",
      nutrition: "（营养分析）",
      fitness: "（健身分析）"
    }
  }
};

function setLanguage(l) {
  document.getElementById("mainTitle").innerText = lang[l].title;
  document.getElementById("inputText").placeholder = lang[l].placeholder;
  document.getElementById("analyzeBtn").innerText = lang[l].send;
  document.getElementById("contactBtn").innerText = lang[l].contact;
  document.getElementById("loginBtn").innerText = lang[l].login;
  document.getElementById("signupBtn").innerText = lang[l].signup;
}

document.getElementById("langSelect").onchange = (e) => {
  setLanguage(e.target.value);
};

setLanguage("ar");

async function askAI(prompt) {
  const res = await fetch("https://kiukgdrkctbtknimkpds.supabase.co/functions/v1/openai-analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  return data.text || data.result || data.choices?.[0]?.message?.content || "No response";
}

document.getElementById("analyzeBtn").onclick = async () => {
  const prompt = document.getElementById("inputText").value;
  const langVal = document.getElementById("langSelect").value;
  const analysisVal = document.getElementById("analysisSelect").value;

  if (!prompt.trim()) {
    alert("اكتب شيء أولاً");
    return;
  }

  document.getElementById("aiResult").innerText = lang[langVal].analyzing;

  const fullPrompt = prompt + lang[langVal].promptSuffix[analysisVal];
  const answer = await askAI(fullPrompt);

  document.getElementById("aiResult").innerText = answer;
};

document.getElementById("contactBtn").onclick = () => {
  window.open("https://wa.me/201223547704", "_blank");
};

document.getElementById("loginBtn").onclick = () => {
  window.location.href = "login.html";
};

document.getElementById("signupBtn").onclick = () => {
  window.location.href = "signup.html";
};
