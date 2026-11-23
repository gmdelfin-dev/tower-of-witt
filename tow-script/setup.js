const nextButton = document.getElementById("nextButton");

    nextButton.addEventListener("click", function(event) {

    // Stop the page from moving immediately
    event.preventDefault();

    // Get the selected options
    const selectedTopic = document.querySelector(
        'input[name="topic"]:checked'
    );

    const selectedWeather = document.querySelector(
        'input[name="weather"]:checked'
    );

    const selectedAnimal = document.querySelector(
        'input[name="animal"]:checked'
    );

    // Check if the player selected all three
    if (!selectedTopic || !selectedWeather || !selectedAnimal) {

        alert(
            "Oops! Please complete all three selections: Topic, Weather, and Animal Partner before continuing!"
        );

        return;
    }

    // Save the player's selections
    const playerSetup = {
        topic: selectedTopic.value,
        weather: selectedWeather.value,
        animal: selectedAnimal.value
    };

    localStorage.setItem(
        "towerPlayerSetup",
        JSON.stringify(playerSetup)
    );

    // Continue to the next page only if all choices are complete
    alert("Your adventure is about to start! Good luck!");

    window.location.href = "levelmap.html";

    // Display the saved information in the console
        console.log("Player Setup:", playerSetup);
        console.log("Topic:", playerSetup.topic);
        console.log("Weather:", playerSetup.weather);
        console.log("Animal:", playerSetup.animal);

});
