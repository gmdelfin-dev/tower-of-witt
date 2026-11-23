document.addEventListener('DOMContentLoaded', function() {
    const user = requireLogin();
    if (user === null) {
        return;
    }
    
    /* player should've picked their desired selection first. if not,
     * will be returned to setuppage */
    if (getSettings() === null) {
        window.location.href = 'setup.html';
        return;
    }
    
    // finding the elements that are needed
    const avatar = document.querySelector('.avatar-chosen'); 
    const avatarImage = document.querySelector('.avatar-chosen img'); 
    const startButton = document.querySelector('.btn-green');
    const hint = document.getElementById('map-hint');
    
    let selectedLevel = 1;
    
    // this will show the player's own character next to the tower
    avatarImage.src = characterImage(user.character);
    avatar.style.width = '70px'; // without a width, the picture is 0 wide and cannot be seen 
    
    /* refreshMap() function: to (re)draw everythings na naka-depende sa saved settings
     * (if want niya ng changes) and on the levels. calling this once at the start, and 
     * when the player changes the weather in the settings */
    function refreshMap() {
        const settings = getSettings();
        const weatherInfo = WEATHER_MODES[settings.weather];
        const unlocked = getUnlockedLevel(user, settings.topic);
        
        /* this automatically changes the background image that the user selected. */
        document.body.style.backgroundImage = "url('tow-images/backgrounds/"
            + settings.weather.toLowerCase() + ".jpg')";
        
        if (selectedLevel > unlocked) {
            selectedLevel = unlocked;
        }
        
        /* going though 5 towers one by one. this will loop if levels are 1-5. */
        for (let level = 1; level <= 5; level++) {
            const spot = document.querySelector('.spot' + level); // builds a class name, so equals to '.spot1'
            const rules = LEVEL_RULES[level - 1]; // level 1 is at index 0; gets the data from the array
            const title = spot.querySelector('.label-level b'); // get the title/weather
            const info = spot.querySelector('.label-level p'); // get the description
            
            // adjusts the level timer based on the selected weather effect
            let seconds = rules.seconds - weatherInfo.lessSeconds;
            if (seconds < 5) {
                seconds = 5;
            }
            
            info.textContent = rules.hp + ' HP, ' + seconds + 's';
            
            if (level > unlocked) {
                title.textContent = 'Level ' + level + ' \uD83D\uDD12'; // for lock emoji
                spot.style.opacity = '0.45';
                spot.style.filter = 'grayscale(1)';
            } else {
                title.textContent = 'Level ' + level;
                spot.style.opacity = '1';
                spot.style.filter = 'none';
            }
            
            // only the selected tower has the "on" class
            spot.classList.toggle('on', level === selectedLevel);
            
            // puts the avatar next to the selected tower. moves the element to its new parent
            if (level === selectedLevel) {
                spot.appendChild(avatar);
            }
        }
        
        hint.textContent = settings.weather + ' weather (' + weatherInfo.mode + '). ' + 
            'Higher levels give you fewer hearts and harder questions. ' + 
            'Today every questions has ' + weatherInfo.lessSeconds + ' second(s) less.';
    }
    
    // when the tower is clicked!
    for (let level = 1; level <=5; level++) {
        const spot = document.querySelector('.spot' + level);
        
        spot.addEventListener('click', function (event) {
            event.preventDefault(); // link must not reload the page
            
            const settings = getSettings();
            const unlocked = getUnlockedLevel(user, settings.topic);
            
            if (level > unlocked) {
                alert('Level ' + level + ' is locked. Beat Level ' + (level - 1) + ' first!'); /* changed/added: a space was missing before "first" */
                return;
            }
            
            selectedLevel = level;
            refreshMap();
        });
    }
    
    // saves the level, then opens the game file
    startButton.addEventListener('click', function (event) {
        event.preventDefault();
        saveSelectedLevel(selectedLevel); // from storage.js if ever ><
        window.location.href = 'game.html';
    });
    
    // starting with the player's highest open level selected
    selectedLevel = getUnlockedLevel(user, getSettings().topic);
    refreshMap();
    
    setupSettingsPopup(refreshMap);
});