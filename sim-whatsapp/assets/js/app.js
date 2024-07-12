class App {
  static messages = [];

  static sendMessageA() {
    // on récupere le message dans l'input du userA
    let message = document.getElementById("newMessageA").value;
    // on cree un objet de classe Message et on l'insere
    // dans le tableau static messages:
    App.messages.push(new Message(message, "a"));
    console.log(App.messages);
    // on vide l'input
    document.querySelector("#newMessageA").value = "";
    // on appelle la méthode de traitement
    // de rafraichissement du tchat:
    App.refreshChat();
  }

  static sendMessageB() {
    // on récupere le message dans l'input du userA
    let message = document.getElementById("newMessageB").value;
    // on cree un objet de classe Message et on l'insere
    // dans le tableau static messages:
    App.messages.push(new Message(message, "b"));
    console.log(App.messages);
    // on vide l'input
    document.querySelector("#newMessageB").value = "";
    // on appelle la méthode de traitement
    // de rafraichissement du tchat:
    App.refreshChat();
  }

  static refreshChat() {
    // on récupere dans le DOM les divs de classe .convA et .convB
    let divA = document.querySelector(".convA");
    let divB = document.querySelector(".convB");

    // on cree une div en MEMOIRE pour chaque zone de message
    let msgContainerA = document.createElement("div");
    let msgContainerB = document.createElement("div");

    // on récupere le dernier message du tableau messages:
    let dernierMessage = App.messages[App.messages.length - 1];

    // fabrication du message en mémoire:
    let msg = document.createElement("span");
    msg.classList.add("msg");
    msg.innerHTML = "<div class='body'>" + dernierMessage.message + "</div>";
    msg.innerHTML += "<div class='footer'>" + dernierMessage.timeStr + "</div>";

    // intégration du dernier message dans le DOM
    msgContainerA.appendChild(msg.cloneNode(true));
    msgContainerB.appendChild(msg);

    // definition de la position de chaque message en fonction
    // de sa provenance (user A ou user B)
    if (dernierMessage.from === "a") {
      //le dernier message a été ecrit par le userA
      // le message doit être inséré dans le containerA en vert et sur la droite
      msgContainerA.classList.add("right-conv");
      divA.appendChild(msgContainerA);
      // le message doit être inséré dans le containerB en bleu et sur la gauche
      msgContainerB.classList.add("left-conv");
      divB.appendChild(msgContainerB);
    } else {
      //le dernier message a été ecrit par le userA
      // le message doit être inséré dans le containerA en bleu et sur la gauche
      msgContainerA.classList.add("left-conv");
      divA.appendChild(msgContainerA);
      // le message doit être inséré dans le containerB en vert et sur la droite
      msgContainerB.classList.add("right-conv");
      divB.appendChild(msgContainerB);
    }
    // auto-scroll
    divA.scroll({ top: divA.scrollHeight, behavior: "smooth" });
    divB.scroll({ top: divB.scrollHeight, behavior: "smooth" });
  }
}

class Message {
  // classe message permettant de stocker
  // toutes les données du message necessaire
  // au traitement
  constructor(msg, from) {
    this.message = msg;
    this.from = from;
    this.time = new Date(Date.now());
    this.timeStr = this.time.toLocaleTimeString();
  }
}

function domReady(callback) {
  // cas: le document est déjà rendu
  if (document.readyState != "loading") callback();
  //pour les navigateur modernes
  else if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", callback);
  // les anciens navigateurs
  else
    document.attachEvent("onReadyStateChange", function () {
      if (document.readyState === "complete") callback();
    });
}

domReady(function () {
  // ici toutes les instructions ne seront
  // exécutées qu'une fois le DOM chargé
  const btnUserA = document.querySelector(".btnUserA");
  const btnUserB = document.querySelector(".btnUserB");

  console.log(btnUserA);
  console.log(btnUserB);

  btnUserA.addEventListener("click", function () {
    App.sendMessageA();
  });
  btnUserB.addEventListener("click", function () {
    App.sendMessageB();
  });
});
