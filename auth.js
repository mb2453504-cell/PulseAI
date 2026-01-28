async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }
  alert("تم إنشاء الحساب! تحقق من الإيميل.");
  window.location.href = "login.html";
}

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }
  window.location.href = "index.html";
}

async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    alert(error.message);
    return;
  }
  alert("تم إرسال رابط إعادة تعيين كلمة المرور.");
}

async function guestLogin() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: "guest@example.com"
  });
  if (error) {
    alert(error.message);
    return;
  }
  alert("تم تسجيل الدخول كـ Guest (تحقق من الإيميل)");
  window.location.href = "index.html";
}

if (document.getElementById("signupBtn")) {
  document.getElementById("signupBtn").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signUp(email, password);
  };
}

if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  };
}

if (document.getElementById("forgotBtn")) {
  document.getElementById("forgotBtn").onclick = () => {
    const email = document.getElementById("email").value;
    resetPassword(email);
  };
}

if (document.getElementById("guestBtn")) {
  document.getElementById("guestBtn").onclick = () => {
    guestLogin();
  };
}
