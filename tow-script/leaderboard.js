let selectedTopic = "all";
let selectedLevel = "all";

let leaderboardBody;
let leaderboardMessage;


// starting point of leaderboard
document.addEventListener("DOMContentLoaded", function () {

    leaderboardBody = document.getElementById("leaderboard-body");
    leaderboardMessage = document.getElementById("leaderboard-message");

    connectTopicFilters();
    connectLevelFilters();

    displayLeaderboard();

});


// filter leaderboard by topic
function connectTopicFilters() {

    const topicButtons = document.querySelectorAll("[data-topic]");
    topicButtons.forEach(function (button) {

        button.addEventListener("click", function () {
            selectedTopic = button.dataset.topic;
            topicButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            displayLeaderboard();
        });
    });
}


// level filter for leaderboard

function connectLevelFilters() {

    const levelButtons = document.querySelectorAll("[data-level]");

    levelButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedLevel = button.dataset.level;
            levelButtons.forEach(function (item) { item.classList.remove("active");
             });
            button.classList.add("active");

            displayLeaderboard();
        });
    });
}


// this is  where we can get the leaderboard records from storage.js
function getLeaderboardRecords() {

    const records = getScores();
    if (!Array.isArray(records)) {
        return [];
    }

    return records;

}


// it filterize our leaderboard records based on selected topic and level
function filterLeaderboard(records) {
    return records.filter(function (record) {

        const matchesTopic =
            selectedTopic === "all" ||
            record.topic === selectedTopic;

        const matchesLevel =
            selectedLevel === "all" ||
            Number(record.level) === Number(selectedLevel);

        return matchesTopic && matchesLevel;

    });

}


// this sort our players by score, time, and floor
function rankPlayers(records) {

    return records.sort(function (a, b) {

        if (Number(b.score) !== Number(a.score)) {
            return Number(b.score) - Number(a.score);
        }

        if (Number(a.time) !== Number(b.time)) {
            return Number(a.time) - Number(b.time);
        }

        return Number(b.floor) - Number(a.floor);

    });

}


// display the leaderboard in the table
function displayLeaderboard() {

    leaderboardBody.innerHTML = "";

    const allRecords = getLeaderboardRecords();

    // Apply topic and level filters
    const filteredRecords = filterLeaderboard(allRecords);

    // Sort the filtered records
    const rankedRecords = rankPlayers(filteredRecords);

    // Show message if there are no records
    if (rankedRecords.length === 0) {

        leaderboardMessage.textContent =
            "No player records yet. Be the first to climb the Tower of Wit!";

        leaderboardMessage.hidden = false;

        return;

    }

    // Hide empty message
    leaderboardMessage.hidden = true;

    // Display only the top 5 players
    const topPlayers = rankedRecords.slice(0, 5);

    // Create a row for every player
    topPlayers.forEach(function (record, index) {

        createLeaderboardRow(record, index + 1);

    });

}

// created the row in the leaderboard table for a player record

function createLeaderboardRow(record, rank) {

    const row = document.createElement("tr");

    if (rank === 1) {
        row.classList.add("first-place");
    } else if (rank === 2) {
        row.classList.add("second-place");
    } else if (rank === 3) {
        row.classList.add("third-place");
    }

    // this is the layer information
    const values = [

        rank,
        record.username || "Player",
        Number(record.score) || 0,
        (record.floor || 0) + "/" + (record.floorsTotal || 0),
        formatLeaderboardTime(record.time)

    ];

// Create a cell for each value and append it to the row
    values.forEach(function (value) {

        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);

    });
// Add row to table
    leaderboardBody.appendChild(row);

}

// format time in minutes and seconds for the leaderboard
function formatLeaderboardTime(seconds) {

    const totalSeconds = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return minutes + ":" +
        String(remainingSeconds).padStart(2, "0");

}