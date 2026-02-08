const form = document.getElementById("form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // <--- C'EST CETTE LIGNE QUI BLOQUE LA POPUP WEB3FORMS

  const formData = new FormData(form);
  formData.append("access_key", "d26c93ec-7242-4689-a332-f956f4e69bc3");

  const btnTextSpan = submitBtn.querySelector("span") || submitBtn;
  const originalText = btnTextSpan.textContent;
  btnTextSpan.textContent = "Envoi en cours...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      notifier("Message envoyé avec succès !");
      form.reset();
    } else {
      notifier("Erreur : " + data.message, true);
    }
  } catch (error) {
    notifier("Une erreur est survenue.", true);
  } finally {
    btnTextSpan.textContent = originalText;
    submitBtn.disabled = false;
  }
});

function notifier(message, isError = false) {
  // Correction ici : on cherche "notifier" et non "toast"
  const bulle = document.getElementById("notifier");

  if (!bulle) {
    console.error("L'élément HTML avec l'id 'notifier' est introuvable !");
    return;
  }

  bulle.textContent = message;
  bulle.style.backgroundColor = isError ? "#e74c3c" : "#1abc9c";

  bulle.classList.add("show");

  setTimeout(() => {
    bulle.classList.remove("show");
  }, 3000);
}
