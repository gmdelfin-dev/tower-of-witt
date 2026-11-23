// 1. global scope/variables
let user;        // the logged-in player 
let settings;   // topic, weather, animal
let level;    // 1 to 5
let weatherInfo;   // the weather's rules from WEATHER_MODES
let power;       // the animal's power from ANIMAL_POWERS
let powerOn;     // true if the animal matches the weather
let questions;    // the array of questions of this level
let rightIndex = 0;   // position (0-3) of the correct choice of the current question
let totalFloors;   // how many floors = how many questions
let maxHp;      // hearts at the start of the level
let secondsPerQuestion; // time for one question

// what changes while playing
let hp;   // heart points left
let score = 0;   // points
let streak = 0;    // correct answers in a row
let mistakes = 0;   // number of wrong answers + time-ups
let floor = 1;  // the floor we are on (1 = ground floor)
let shieldUsed = false;  // Penguin power: has the free mistake been used?

// timer variables
let timeLeftMs = 0;  // time left for the current question (in milliseconds)
let elapsedMs = 0;  // total time played (in milliseconds)
let timerId = null;  // the id of our setInterval (needed to stop it)

// game state flags (true / false switches) ---
let gameRunning = false;  // true after "Let's climb!" until the game ends
let locked = false;   // true while we show feedback (answers are blocked)

// --- page elements (found in startPage function) ---
let towerWorld, towerImage, elevatorLift;
let heartsBox, floorPill, scorePill, streakPill, timePill;
let timerFill, questionText, feedbackBox, answersBox;
let enemies = [];         // the enemy elements, one for each floor

const LETTERS = ['A', 'B', 'C', 'D'];


// 2. starting the page
document.addEventListener('DOMContentLoaded', startPage);

/* purpose of startPage function: it runs once when the page is ready. it checks everything
 * if okay, then it will build the tower and show the intro box */
function startPage() {
    
    // only a logged-in player will play
    user = requireLogin();
    if (user === null) {
        return;
    }
    
    // player must selected topic/weather/animal
    settings = getSettings();
    if (settings === null) {
        window.location.href = 'setup.html';
        return;
    }
    
    // level || making sure that the level is unlocked
    level = getSelectedLevel();
    if (level > getUnlockedLevel(user, settings.topic)) {
        window.location.href = 'levelmap.html';
        return;
    }
    
    // find ALL the page elements to change
    towerWorld = document.getElementById('tower-world');
    towerImage = document.querySelector('.tower-img');
    elevatorLift = document.getElementById('elevator-lift');
    heartsBox = document.getElementById('hearts-full');
    floorPill = document.getElementById('floor-pill');
    scorePill = document.getElementById('score-pill');
    streakPill = document.getElementById('streak-pill');
    timePill = document.getElementById('time-pill');
    timerFill = document.getElementById('timer-fill');
    questionText = document.getElementById('question-text');
    feedbackBox = document.getElementById('feedback');
    answersBox = document.getElementById('answers');
    
    // get the rules for the game
    weatherInfo = WEATHER_MODES[settings.weather];
    power = ANIMAL_POWERS[settings.animal];
    powerOn = (weatherInfo.animal === settings.animal); // if match ba young animal selected
    
    questions = getQuestions(settings.topic, level);
    if (questions === undefined || questions.length === 0) {
        alert('No questions found for ' + settings.topic + ' Level ' + level + '.');
        window.location.href = 'levelmap.html';
        return;
    }
    
    totalFloors = questions.length;
    maxHp = LEVEL_RULES[level - 1].hp;
    hp = maxHp;
    
    secondsPerQuestion = LEVEL_RULES[level - 1].seconds - weatherInfo.lessSeconds;
    if (secondsPerQuestion < 5) {
        secondsPerQuestion = 5;
    }
    if (powerOn && power.type === 'time') {
        secondsPerQuestion = secondsPerQuestion + 5;
    }
    
    // the background picture follows the weather
    document.body.style.backgroundImage = "url('tow-images/backgrounds/" + settings.weather.toLowerCase() + ".jpg')";
    
    // setting up the screen
    buildTower();
    drawHearts();
    updatePills();
    showIntro();
    connectButtons(); // connecting the buttons and the keyboard
}

// 3. building the screens
/* purpose of buildTower function: to build the screen; make the tower for this level. */
function buildTower() {
    /* the tower pictures: Level 1 has 3 floors -> tower-3.png,
    Level 2 has 4 floors -> tower-4.png, and so on.*/
    towerImage.src = 'tow-images/towers/tower-' + totalFloors + '.png';
    
    // deleting the example floors and enemies from the HTML
    const oldFloors = towerWorld.querySelectorAll('.floor');
    for (let i = 0; i < oldFloors.length; i++) {
        oldFloors[i].remove();
    }
    const oldEnemies = towerWorld.querySelectorAll('.enemy');
    for (let i = 0; i < oldEnemies.length; i++) {
        oldEnemies[i].remove();
    }
    
    // creating one floor and enemy for each question
    enemies = [];   // starting with an empty list
    for (let i = 1; i <= totalFloors; i++) {
        // the floor with its number badge
        const floorDiv = document.createElement("div");
        floorDiv.className = "floor floor-" + i; // "floor floor-1"
        floorDiv.innerHTML = '<b class="floor-number">' + i + "</b>";
        towerWorld.appendChild(floorDiv);

        // The enemy standing on that floor
        const enemyDiv = document.createElement("div");
        enemyDiv.className = "enemy enemy-" + i; // "enemy enemy-1"

        // the enemy at the very top of level 5 is the BOSS: Elixir!
        if (level === 5 && i === totalFloors) {
            enemyDiv.innerHTML =
                '<img src="tow-images/characters/elixir.png" alt="Boss named Elixir">'; 
            enemyDiv.querySelector("img").style.height = "150px";
        } else {
            enemyDiv.innerHTML = '<img src="tow-images/characters/entity.png" alt="Enemy named entity">';
        }
        towerWorld.appendChild(enemyDiv);

        enemies.push(enemyDiv); // keep it so we can hide it later
    }
    
    // the avatar and theit animal partner stand in the elevator
    document.querySelector('#hero-avatar img').src = characterImage(user.character);
    const petImage = document.querySelector('.avatar-pet img');
    petImage.src = animalImage(settings.animal);
    petImage.alt = settings.animal;
    
    // smooth movement when the elevator and the camera move (CSS transition)
    elevatorLift.style.transition = 'bottom 0.8s ease';
    towerWorld.style.transition = 'transform 0.8s ease';
    timerFill.style.transition = 'width 0.1s linear';
    
    // starting on floor 1
    moveElevator();
}

/* the purpose of moveElevator is to put the elevator in the current floor and move
 * the camera/transition so the player can see it. */
function moveElevator() {
    const climbed = (floor - 1) * 150;   // pixels climbed so far
    elevatorLift.style.bottom = (60 + climbed) + 'px'; // elevator goes up
    towerWorld.style.transform = 'translateY(' + climbed + 'px)'; // "camera" follows
}

/* the purpose of drawHearts -> there's a full heart for every hp left, while an empty
 * heart for every hp lost */
function drawHearts() {
    heartsBox.innerHTML = ''; // clearing the old hearts
    
    for (let i = 0; i < maxHp; i++) {
        const heart = document.createElement('img');

    if (i < hp) {
        heart.src = 'tow-images/icons/heart-full.png';
    } else {
        heart.src = 'tow-images/icons/heart-empty.png';
    }
    heart.alt = '';

    heartsBox.appendChild(heart);
  }
}

/* the purpose of updatePills() is to refresh the floor, score, streak, and time. */
function updatePills() {
    const elapsedSeconds = (elapsedMs - (elapsedMs % 1000)) / 1000; // whole seconds
    floorPill.textContent = "Floor " + floor + "/" + totalFloors;
    scorePill.textContent = score + " pts";
    streakPill.textContent = "Streak " + streak;
    timePill.textContent = "Time " + formatTime(elapsedSeconds);
}

/* the purpose of setfeedback is to show a mesage above the answers (e.g.: "correct! +150") */
function setFeedback(message) {
    feedbackBox.textContent = message;
}

// 4. the intro box
/* the purpose of showintro is to fill the start box with the weather, animal, and its power.
 * the box is already visible when the page opens */
function showIntro() {
    document.getElementById("intro-title").textContent = settings.weather + " day (" + weatherInfo.mode + ")";

    // the two pictures: the weather, then the animal
    const pictures = document.querySelectorAll("#intro-pics img");
    pictures[0].src = "tow-images/backgrounds/" + settings.weather.toLowerCase() + ".jpg";
    pictures[0].alt = settings.weather + " day";
    pictures[1].src = animalImage(settings.animal);
    pictures[1].alt = settings.animal;

    // the text depends on whether the animal matches the weather
    let text = "Level " + level + " - " + settings.topic + ". ";

    if (powerOn) {
        text =
            text +
            "Great pick! " +
            settings.animal +
            " loves " +
            settings.weather.toLowerCase() +
            " days. Its power is on: " +
            power.text +
            ".";
    } else {
        text =
            text +
            settings.animal +
            " does not love " +
            settings.weather.toLowerCase() +
            " days, so its power is off. " +
            "Match the animal with the weather to turn it on!";
    }

    document.getElementById("intro-text").textContent = text;
}

// hideintro -> hide the start box 
function hideIntro() {
    document.getElementById("intro").style.display = "none";
}

// 5. buttons and keyboard
/* the purpose of the connectbuttons function is to attach all the event listeners in one place. */
function connectButtons() {
    // hide the intro and start the game
    document.getElementById("intro-button").addEventListener("click", function (event) {
        event.preventDefault();
        hideIntro();
        startGame();
    });

    // quit -> to ask first, because the progress will be lost
    document.getElementById("quit-button").addEventListener("click", function (event) {
        const sure = confirm("Quit the game? Your progress in this level will be lost.");
        if (sure === false) {
            event.preventDefault(); // stay on the page
        }
    });

    // next level -> remember the next level (the link then opens game.html)
    document.getElementById("next-level-button").addEventListener("click", function () {
        saveSelectedLevel(level + 1);
    });

    // for the keyboard: [A B C D] or [1 2 3 4] to pick an answer
    document.addEventListener("keydown", function (event) {
        if (gameRunning === false) {
            return;   // the game has not started (or is over)
        }

        const key = event.key.toLowerCase();
        let index = -1;   // -1 means no answer key was pressed

        if (key === "a" || key === "1") {
            index = 0;
        }
        if (key === "b" || key === "2") {
            index = 1;
        }
        if (key === "c" || key === "3") {
            index = 2;
        }
        if (key === "d" || key === "4") {
            index = 3;
        }

        if (index === -1) {
            return;
        }

        const buttons = answersBox.querySelectorAll(".answer");
        if (buttons[index] && buttons[index].disabled === false) {
            buttons[index].click(); // act as if the player clicked it
        }
    });
}

// 6. playing the game
/* the purpose of startgame is to finally, play the game */
function startGame() {
    gameRunning = true;
    showQuestion();
    timerId = setInterval(tick, 100); // run tick every 0.1 second
}

/* the purpose of showquestion is to show the question of the current floor, create the answer buttons 
 * apply the power of eagle, and reset the timer */
function showQuestion() {
    const q = questions[floor - 1]; // floor 1 is at index 0

    questionText.textContent = q.question;
    rightIndex = q.choices.indexOf(q.answer); // the answer is written as text, so we find its position

    /* remove the old buttons, then make one new button for every choice
    * forEach gives us each choice and its index */
    answersBox.innerHTML = "";
    q.choices.forEach(function (choice, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer";
        button.textContent = LETTERS[index] + ". " + choice;

        // when this button is clicked, check this answer
        button.addEventListener("click", function () {
            chooseAnswer(index);
        });

        answersBox.appendChild(button);
    });

    // eagle's power: remove one wrong choice
    if (powerOn && power.type === "eagle") {
        removeOneWrongChoice(rightIndex);
    }

    // full time for the new question
    timeLeftMs = secondsPerQuestion * 1000; // converting seconds to milliseconds
    timerFill.style.width = "100%"; 
    timerFill.style.backgroundColor = ""; // back to the normal color

    setFeedback("");
    locked = false;
    updatePills();
}

/* the purpose of removeonewrongchoice is to find and disable one incorrect answer 
 * choice while keeping the correct answer available. */
function removeOneWrongChoice(rightIndex) {
    let wrongIndex = floor % 4; // 0, 1, 2 or 3; the floor number determines where the search starts

    while (wrongIndex === rightIndex) {
        wrongIndex = (wrongIndex + 1) % 4; // try the next choice
    }

    const buttons = answersBox.querySelectorAll(".answer");
    buttons[wrongIndex].disabled = true;
    buttons[wrongIndex].style.opacity = "0.3";
}

/* the purpose of tick (earlier, it runs 0.1 second). this makes the timer go down and 
 * update the timer bar */
function tick() {
    if (locked) {
        return; // time stops while we show feedback
    }

    timeLeftMs = timeLeftMs - 100; // reduce remaining time to 0.1 second
    elapsedMs = elapsedMs + 100; // records elapsed time

    // make the bar shorter:  e.g. 50% when half of the time is left
    const percent = (timeLeftMs / (secondsPerQuestion * 1000)) * 100;
    timerFill.style.width = percent + "%"; 

    // the bar turns red when less than 30% is left
    if (percent < 30) {
        timerFill.style.backgroundColor = "#d9534f";
    }

    updatePills();

    // time is up!
    if (timeLeftMs <= 0) {
        handleMistake("Time's up!");
    }
}

/* the purpose of chooseanswer is to run when the player picks an answer 
 * [index = 0, 1, 2, 3] */
function chooseAnswer(index) {
    if (locked || gameRunning === false) {
        return; // ignore clicks while we show feedback
    }

    const q = questions[floor - 1];
    const buttons = answersBox.querySelectorAll(".answer");

    if (index === rightIndex) {
        // for correct
        locked = true;
        streak = streak + 1;

        // seconds left, rounded up (e.g.: 4.2 seconds left = 5) 
        let secondsLeft = (timeLeftMs - (timeLeftMs % 1000)) / 1000;
        if (timeLeftMs % 1000 > 0) {
            secondsLeft = secondsLeft + 1;
        }

        // points 
        let points = 100 + secondsLeft * 5 + (streak - 1) * 10 + weatherInfo.bonusPoints;

        if (powerOn && power.type === "double") {
            points = points * 2; // carabao's power
        }
        score = score + points;

        buttons[index].style.backgroundColor = "#9be28b"; // green
        setFeedback("Correct! +" + points);
        defeatEnemy();
        updatePills();

        // after 1.2 seconds: win, or climb to the next floor
        setTimeout(function () {
            if (floor === totalFloors) {
                endGame(true); // that was the last floor!
            } else {
                floor = floor + 1;
                moveElevator();
                showQuestion();
            }
        }, 1200);
    } else {
        // for wrong
        buttons[index].disabled = true; // cannot pick it again
        buttons[index].style.backgroundColor = "#f08a84"; // red
        handleMistake("Wrong!");
    }
}

/* the purpose of handlemistake -> used for both a wrong answer and a time up. the player
 * will lose a heart (unless the penguin's power is used) */
function handleMistake(message) {
    locked = true;
    mistakes = mistakes + 1;
    streak = 0;

    // penguin's the first mistake is free
    if (powerOn && power.type === "shield" && shieldUsed === false) {
        shieldUsed = true;
        setFeedback(message + " The shield saved your heart!");
    } else {
        hp = hp - 1;
        setFeedback(message + " -1 HP");
    }

    enemyAttack();
    drawHearts();
    updatePills();

    if (hp <= 0) {
        // no hearts left: the game is over
        setTimeout(function () {
            endGame(false);
        }, 1200);
    } else {
        // try the same question again with a fresh timer
        setTimeout(function () {
            timeLeftMs = secondsPerQuestion * 1000;
            timerFill.style.width = "100%";
            timerFill.style.backgroundColor = "";
            setFeedback("");
            locked = false;
        }, 1200);
    }
}

/* the purpose of defeatenemy -> the enemy of the current floor fades away */
function defeatEnemy() {
    const enemy = enemies[floor - 1];
    enemy.style.transition = "opacity 0.6s";
    enemy.style.opacity = "0";
}

/* purpose of enemy attack -> the enemy jumps toward the elevator, then goes back */
function enemyAttack() {
    const enemy = enemies[floor - 1];
    enemy.style.transition = "transform 0.2s";
    enemy.style.transform = "translateX(40px)";

    setTimeout(function () {
        enemy.style.transform = "translateX(0)";
    }, 300);
}


// 7. ending the game
/* the purpose is to stop everything, save the results and show the result box.
 * won = true - the player reached the roof
 * won = false - the hearts ran out */
function endGame(won) {
    if (gameRunning === false) {
        return; // already ended, do not run twice
    }
    gameRunning = false;
    locked = true;
    clearInterval(timerId); // stop the timer

    const seconds = (elapsedMs - (elapsedMs % 1000)) / 1000; // whole seconds 
    const coins = (score - (score % 10)) / 10; // 10 points = 1 coin

    // saves the coins to the player's account
    // a new player has no coins yet, so undefined + number would be NaN
    let oldCoins = 0; 
    if (user.coins !== undefined) {
        oldCoins = user.coins;
    }
    user.coins = oldCoins + coins;
    updateUser(user);

    // if the player won, unlock the next level
    if (won && level < 5) {
        unlockLevel(user, settings.topic, level + 1);
    }

    // saves this game for the leaderboard
    const record = {
        id: Date.now(), // a unique number (the time right now)
        username: user.username,
        topic: settings.topic,
        level: level,
        score: score,
        floor: floor,
        floorsTotal: totalFloors,
        time: seconds,
        won: won
    };
    addScore(record);

    // saves the high score (true if this score beat the old one)
    const isNewHigh = saveHighScore(user.username, settings.topic, level, score);
    const highScore = getHighScore(user.username, settings.topic, level);

    // shows the result box
    showResult(won, coins, seconds, isNewHigh, highScore, record);
}

/* the purpose of showresult is to write all the results into the result boxx and show it */
function showResult(won, coins, seconds, isNewHigh, highScore, record) {
    let title;
    if (won && level === 5) {
        title = "You conquered the Tower of Wit!";
    } else if (won) {
        title = "You reached the rooftop!";
    } else {
        title = "Game over! You ran out of hearts.";
    }
    document.getElementById("result-title").textContent = title;

    // the lines of information
    document.getElementById("result-info").textContent =
        "Final score " + score + " with " + hp + " HP left. You earned " + coins + " coins.";

    document.getElementById("result-stats").textContent =
        "Level " +
        level +
        " • " +
        settings.weather +
        " • Time: " +
        formatTime(seconds) +
        " • Mistakes: " +
        mistakes; 

    if (isNewHigh && score > 0) {
        document.getElementById("result-high").textContent = "New high score: " + highScore + "!";
    } else {
        document.getElementById("result-high").textContent = "High score: " + highScore;
    }

    // next level only appears if the player won and there is a next level
    const nextButton = document.getElementById("next-level-button");
    if (won && level < 5) {
        nextButton.style.display = "";  // back to normal
    } else {
        nextButton.style.display = "none"; // hidden
    }

    // the leaderboard of this topic + level
    fillResultTable(record);

    // show the box
    document.getElementById("game-end").style.display = "flex";
}

/* the purpose of fillresulttable is to  fill the table in the result box with the top5 games of
* this topic + level. the game that was just played is highlighted.
* if it is not in the top 5, it is added at the bottom with its rank */
function fillResultTable(record) {
    const table = document.getElementById("result-table");

    // remove every row except the the header row with #, Player...
    const oldRows = table.querySelectorAll("tr");
    for (let i = 1; i < oldRows.length; i++) {
        oldRows[i].remove();
    }

    // keep only the games of the same topic + level
    const all = getScores();
    const sameLevel = [];
    for (let i = 0; i < all.length; i++) {
        if (all[i].topic === settings.topic && all[i].level === level) {
            sameLevel.push(all[i]);
        }
    }
    sortScores(sameLevel); 

    // find the position of the game we just played
    let myPosition = -1;
    for (let i = 0; i < sameLevel.length; i++) {
        if (sameLevel[i].id === record.id) {
            myPosition = i;
        }
    }

    // show the top 5
    let howMany = sameLevel.length;
    if (howMany > 5) {
        howMany = 5;
    }
    for (let i = 0; i < howMany; i++) {
        addResultRow(table, sameLevel[i], i + 1, i === myPosition);
    }

    // not in the top 5? add it at the bottom with its real rank.
    if (myPosition >= 5) {
        addResultRow(table, sameLevel[myPosition], myPosition + 1, true);
    }
}

/* the purpose of addresultrow is to add one row to the result table */
function addResultRow(table, record, rank, isMine) {
    const row = document.createElement("tr");

    if (isMine) {
        row.className = "player-result"; // the yellow highlight in the CSS
    }

    // the 5 values of this row, in the same order as the headings 
    const values = [ 
        rank, 
        record.username, 
        record.score, 
        record.floor + "/" + record.floorsTotal,
        formatTime(record.time) 
    ]; 

    // one td for every value 
    for (let i = 0; i < values.length; i++) { 
        const cell = document.createElement("td"); 
        cell.textContent = values[i]; 
        row.appendChild(cell); 
    } 

    table.querySelector("tbody").appendChild(row);
}