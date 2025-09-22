const form = document.getElementById("signup-form");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const email = form.email.value.trim();

  
  if (!email) {
    errorMsg.textContent = "Email is required.";
    return;
  }

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    return;
  }

  
  try {
    const response = await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

   
    window.location.href = "success.html";
  } catch {
    errorMsg.textContent = "Network error. Please try again.";
  }
});
