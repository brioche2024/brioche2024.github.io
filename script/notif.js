function sendToDiscord(message) {
  const base64Webhook =
    "aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvMTMzNjQyOTg5MDIwMjg5ODQ0My9uTmhwT2NEWnYwWndWOTJRVVBiYTlfeUpuR0VTa1FwcXZIbmtNUEcyNlVWMkZSTF9iaDNzdGtwZGlVVHB3aTA0QkVNWA==";
  const webhookURL = atob(base64Webhook);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    avatar_url:
      "https://img.freepik.com/vecteurs-premium/mignon-bebe-cupidon-arc-vole-illustration-dessin-anime-vecteur_159446-1020.jpg",
    content: message,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(webhookURL, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function askQuestion() {
  const mealChoice = prompt("Qu'est-ce que tu veux manger ?");

  const message = `Réponse reçue : Repas choisi : ${mealChoice}`;
  document.getElementById("selectButton").style.display = "none";
  document.getElementById("nextButton").style.display = "inline-block";
  document.getElementById("confirmationMessage").style.display = "block";

  sendToDiscord(message);
}
  
const choice = document.querySelector("#suggestionButton");
if (choice) {
  choice.addEventListener("click", () => {
    askQuestion();
  });
}
