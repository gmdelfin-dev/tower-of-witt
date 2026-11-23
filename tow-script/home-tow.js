document.addEventListener('DOMContentLoaded', function() {
    // saved by the sign-up page
    const savedText = localStorage.getItem("towPlayer");
    
    if (savedText === null) {
        window.location.href = "login.html";
        return;
    } 
    
    const user = JSON.parse(savedText);

    const coinCount = document.getElementById('coin-count');
    const nameOnButton= document.getElementById('avatar-name');
    const avatarImage = document.getElementById("playerCharacterImg");
    
    let coins = 0;
    if (user.coins !== undefined) {
        coins = user.coins;
    }
    
    /* shows the coins as 3 digits (e.g. 5 to 005). the string function turns the
    number into text, while using while loop keeps on adding 0 in front */
    let coinText = String(coins);
    while (coinText.length < 3) {
        coinText = '0' + coinText;
    }
    coinCount.textContent = coinText;
    
    nameOnButton.textContent = user.username;
    
    avatarImage.src = "tow-images/characters/" + user.character.toLowerCase() + ".png";
    avatarImage.alt = user.character + ', the character you picked';
});
    