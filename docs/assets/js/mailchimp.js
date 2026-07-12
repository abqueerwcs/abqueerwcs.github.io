document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mailchimp-form");
  const message = document.getElementById("form-message");

  if (!form || !message) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    message.textContent = "Submitting...";
    message.className = "form-message";

    const formData = new FormData(form);

    // Convert Mailchimp POST URL → JSONP GET URL
    let url = form.action.replace("/post?", "/post-json?");
    const params = new URLSearchParams(formData).toString();
    url += "&" + params;

    const callbackName = "mcCallback_" + Date.now();
    let timeoutId;

    window[callbackName] = function (data) {
      clearTimeout(timeoutId);
      delete window[callbackName];
      script.remove();

      if (data.result === "success") {
        message.textContent = "🎉 Thanks for subscribing!";
        message.classList.add("success");
        form.reset();
      } else {
        message.textContent = "Something went wrong. Did you fill out all fields?";
        message.classList.add("error");
      }
    };

    const script = document.createElement("script");
    script.src = url + "&c=" + callbackName;

    script.onerror = function () {
      clearTimeout(timeoutId);
      delete window[callbackName];
      script.remove();
      message.textContent = "Network error. Please try again.";
      message.classList.add("error");
    };

    timeoutId = setTimeout(function () {
      delete window[callbackName];
      script.remove();
      message.textContent = "Request timed out. Please try again.";
      message.classList.add("error");
    }, 10000);

    document.body.appendChild(script);
  });
});
