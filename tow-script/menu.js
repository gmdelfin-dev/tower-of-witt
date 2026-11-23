document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const howtoBtn = document.getElementById("howtoBtn");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const resetSaveBtn = document.getElementById("resetSaveBtn");

  if (resetSaveBtn) {
    resetSaveBtn.addEventListener("click", () => {
      localStorage.removeItem("towPlayer");
      alert("Local save cleared!");
      window.location.reload();
    });
  }

  const rawPlayer = localStorage.getItem("towPlayer");
  if (rawPlayer) {
    const player = JSON.parse(rawPlayer);
    console.log("Welcome back:", player.username, "Character:", player.character);
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      window.location.href = "signup.html";
    });
  }

  if (howtoBtn) {
    howtoBtn.addEventListener("click", () => {
      window.location.href = "howtoplay.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!loginForm.reportValidity()) {
        return;
      }

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Please fill in both username and password.");
        return;
      }

      const savedRawPlayer = localStorage.getItem("towPlayer");

      if (!savedRawPlayer) {
        alert("No account found on this device. Please sign up first.");
        return;
      }

      const savedPlayer = JSON.parse(savedRawPlayer);
      if (savedPlayer.username !== username || savedPlayer.password !== password) {
        alert("Incorrect username or password.");
        return;
      }

      window.location.href = "home-tow.html";
    });
  }

  if (signupForm) {
    const radioInputs = signupForm.querySelectorAll('input[name="character"]');
    const updateSelectedCard = () => {
      signupForm.querySelectorAll(".character-card").forEach((card) => {
        const radio = card.querySelector('input[type="radio"]');
        card.classList.toggle("selected", Boolean(radio && radio.checked));
      });
    };

    radioInputs.forEach((radio) =>
      radio.addEventListener("change", updateSelectedCard)
    );
    updateSelectedCard();

    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!signupForm.reportValidity()) {
        return;
      }

      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirmPassword");

      const username = usernameInput ? usernameInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value.trim() : "";
      const confirmPassword = confirmPasswordInput
        ? confirmPasswordInput.value.trim()
        : "";
      const selectedCharacter =
        signupForm.querySelector('input[name="character"]:checked')?.value ||
        "Archer";

      if (!username || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      localStorage.setItem(
        "towPlayer",
        JSON.stringify({
          username,
          password,
          character: selectedCharacter
        })
      );

      window.location.href = "home-tow.html";
    });
  }

  // Character image map (matches signup.html values)
  const CHARACTER_IMAGES = {
    Archer:
      "tow-images/characters/Archer.png",
    Gwen:
      "tow-images/characters/Gwen.png",
    Jigs:
      "tow-images/characters/Jigs.png",
    Kennedy:
      "tow-images/characters/Kennedy.png"
  };

  // Update character & player info on home-tow.html
  const playerCharacterImg = document.getElementById("playerCharacterImg");
  const playerNameDisplay = document.getElementById("playerNameDisplay");

  if (playerCharacterImg || playerNameDisplay) {
    const currentRawPlayer = localStorage.getItem("towPlayer");
    if (currentRawPlayer) {
      const savedPlayer = JSON.parse(currentRawPlayer);
      const chosenCharacter = savedPlayer.character || "Archer";

      if (playerCharacterImg && CHARACTER_IMAGES[chosenCharacter]) {
        playerCharacterImg.src = CHARACTER_IMAGES[chosenCharacter];
        playerCharacterImg.alt = chosenCharacter;
      }

      if (playerNameDisplay && savedPlayer.username) {
        playerNameDisplay.textContent = savedPlayer.username;
      }
    }
  }
});