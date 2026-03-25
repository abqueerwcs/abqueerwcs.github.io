document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mailchimp-form");
  const message = document.getElementById("form-message");

    if (!form) {return};

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    message.textContent = "Submitting...";
    message.className = "form-message";

    const formData = new FormData(form);

    // Convert Mailchimp POST URL → JSONP GET URL
    let url = form.action.replace("/post?", "/post-json?");

    const params = new URLSearchParams(formData).toString();
    url += "&" + params;

    // JSONP callback
    const callbackName = "mcCallback_" + Date.now();

    window[callbackName] = function (data) {
      delete window[callbackName];

      if (data.result === "success") {
        message.textContent = "🎉 Thanks for subscribing!";
        message.classList.add("success");
        form.reset();
      } else {
        // Mailchimp sometimes returns HTML in message
        message.textContent = "Something went wrong. Did you fill out all fields?";
        message.classList.add("error");
      }

      script.remove();
    };

    // Create script tag for JSONP
    const script = document.createElement("script");
    script.src = url + "&c=" + callbackName;

    document.body.appendChild(script);
  });
});
