// the names (keys) used in localStorage
const PLAYER_KEY = 'towPlayer';
const SETUP_KEY = 'towerPlayerSetup';
const SCORES_KEY = 'towScores';
const HIGH_SCORES_KEY = 'towHighScores';

// the player

/* purpose of requireLogin function:
 * it checks if a player account is already saved in localStorage.
 * if no account is found, it sends the user back to login.html.
 * otherwise, it returns the saved player information. */
function requireLogin() {
    const savedText = localStorage.getItem(PLAYER_KEY);

    if (savedText === null) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(savedText);
}

/* purpose of updateUser function:
 * it saves the updated player object to localStorage.
 * this is used after changing coins, unlocked levels,
 * or other player information. */
function updateUser(user) {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(user));
}

// characterimage(name) -> Gwen becomes 'tow-images/characters/gwen.png
function characterImage(name) {
    return 'tow-images/characters/' + name.toLowerCase() + '.png';
}

// animalimage(name) -> Frog becomes 'tow-images/animals/frog.png
function animalImage(name) {
    return 'tow-images/animals/' + name.toLowerCase() + '.png';
}


// the setup (topic, weather, animal) and chosen level

/* purpose of getSettings function:
 * it loads the player's saved settings from localStorage.
 * these settings include the selected topic,
 * weather, and animal. */
function getSettings() {
    const savedText = localStorage.getItem(SETUP_KEY);

    if (savedText === null) {
        return null;
    }
    return JSON.parse(savedText);
}

// savesettings -> saves the whole setup object again
function saveSettings(settings) {
    localStorage.setItem(SETUP_KEY, JSON.stringify(settings));
}

/* purpose of saveSelectedLevel function:
 * it remembers the level selected by the player.
 * the chosen level is saved with the current settings. */
function saveSelectedLevel(level) {
    const settings = getSettings();
    settings.level = level;
    saveSettings(settings);
}

/* purpose of getSelectedLevel function:
 * it returns the level selected by the player.
 * if no level is saved yet, it returns level 1. */
function getSelectedLevel() {
    const settings = getSettings();

    if (settings === null || settings.level === undefined) {
        return 1;
    }
    return settings.level;
}


// unlocked levels
/* purpose of getUnlockedLevel function:
 * it checks the highest unlocked level of a player
 * for a specific topic. */
function getUnlockedLevel(user, topic) {
    if (user.unlocked === undefined) {
        return 1;
    }
    if (user.unlocked[topic] === undefined) {
        return 1;
    }
    return user.unlocked[topic];
}

/* purpose of unlockLevel function:
 * it unlocks a new level for the player.
 * the player's progress is then saved. */
function unlockLevel(user, topic, level) {
    if (user.unlocked === undefined) {
        user.unlocked = {};
    }

    if (level > getUnlockedLevel(user, topic)) {
        user.unlocked[topic] = level;
        updateUser(user);
    }
}

// scores
/* purpose of getScores function:
 * it loads all saved game records from localStorage.
 * if there are no records yet, it returns an empty array. */
function getScores() {
    const savedText = localStorage.getItem(SCORES_KEY);

    if (savedText === null) {
        return [];
    }
    return JSON.parse(savedText);
}

// addscore -> adds one finished game to the list and saves it
function addScore(record) {
    const all = getScores();
    all.push(record);
    localStorage.setItem(SCORES_KEY, JSON.stringify(all));
}

/* purpose of isBetter function:
 * it compares two game records.
 * a higher score ranks better.
 * if scores are tied, the faster time wins. */
function isBetter(a, b) {
    if (a.score !== b.score) {
        return a.score > b.score;
    }
    return a.time < b.time;
}

/* purpose of sortScores function:
 * it arranges leaderboard records from best to worst.
 * it uses bubble sort to compare and swap records. */
function sortScores(list) {
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {

            if (isBetter(list[j + 1], list[j])) {
                const temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
}

// high scores
/* purpose of readHighScores function:
 * it loads all saved high scores from localStorage.
 * if none exist, it returns an empty object. */
function readHighScores() {
    const savedText = localStorage.getItem(HIGH_SCORES_KEY);

    if (savedText === null) {
        return {};
    }
    return JSON.parse(savedText);
}

/* purpose of getHighScore function:
 * it returns the player's best score
 * for a specific topic and level. */
function getHighScore(username, topic, level) {
    const all = readHighScores();
    const key = username + '|' + topic + '|' + level;   // example: sunkiss | Food | 1

    if (all[key] === undefined) {
        return 0;
    }
    return all[key];
}

/* purpose of saveHighScore function:
 * it checks if the score is higher than the old high score.
 * if it is, the new score is saved. */
function saveHighScore(username, topic, level, score) {
    const all = readHighScores();
    const key = username + '|' + topic + '|' + level;

    if (score > getHighScore(username, topic, level)) {
        all[key] = score;
        localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(all));
        return true;
    }
    return false;
}

/* purpose of formatTime function:
 * it converts seconds into a minutes:seconds format.
 * this makes the game timer easier to read. */
function formatTime(totalSeconds) {
    const minutes = (totalSeconds - totalSeconds % 60) / 60;
    const seconds = totalSeconds % 60;

    let secondsText = String(seconds);
    if (seconds < 10) {
        secondsText = '0' + secondsText;
    }
    return minutes + ':' + secondsText;
}

/* purpose of setupSettingsPopup function:
 * it loads the player's saved settings into the popup.
 * it updates the selected radio buttons,
 * saves any changes made by the player,
 * and refreshes the map when a setting changes. */
function setupSettingsPopup(onChange) {
    const groupNames = ['topic', 'weather', 'animal'];
    const choices = {
        topic: ['History', 'Food', 'Places'],
        weather: ['Rainy', 'Snowy', 'Windy', 'Sunny'],
        animal: ['Frog', 'Penguin', 'Eagle', 'Carabao']
    };

    const saved = getSettings();

    for (let i = 0; i < groupNames.length; i++) {
        const groupName = groupNames[i];

        for (let j = 0; j < choices[groupName].length; j++) {
            const value = choices[groupName][j];   // example: 'Snowy'
            const radio = document.getElementById(groupName + '-' + value.toLowerCase());

            // tick the saved choice
            if (saved[groupName] === value) {
                radio.checked = true;
            }

            // when the player picks this one: save it and redraw
            radio.addEventListener('change', function () {
                const settings = getSettings();
                settings[groupName] = value;
                saveSettings(settings);
                onChange();
            });
        }
    }
}