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

function askQuestions() {
  const mealChoice = prompt("Qu'est-ce que tu veux manger ?");
  if (mealChoice) {
    const restaurantType = prompt("Quel type de restaurant préfères-tu ? (ex : Italien, Sushi, etc.)");
    const activityChoice = prompt("Quelles activités aimerais-tu faire ? (ex : cinéma, bowling, etc.)");

    const message = `Réponse reçue : \n
    Repas choisi : ${mealChoice}\n
    Type de restaurant préféré : ${restaurantType}\n
    Activité préférée : ${activityChoice}`;

    // Envoie le message à Discord
    sendToDiscord(message);
  }
}
  
const choice = document.querySelector("#sondage");
if (choice) {
  choice.addEventListener("click", () => {
    askQuestions();
  });
}

const path = window.location.pathname;
const fileName = path.substring(path.lastIndexOf("/") + 1);
//sendToDiscord(`Merci d'avoir dit Oui sur la page ${fileName} 🎆`);