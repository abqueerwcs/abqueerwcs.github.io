document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mailchimp-form");
  const message = document.getElementById("form-message");
      console.log(form);

    if (!form) {

      console.log("Test2");
    return};
      console.log("Test3");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    message.textContent = "Submitting...";
    message.className = "form-message";
      console.log("Test");

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
