document.addEventListener('DOMContentLoaded', function () {
    const readWhatButton = document.getElementById('readWhatButton');
    const readWhatModal = document.getElementById('readWhatModal');
    const closeButton = document.querySelector('.close-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const logoutButton = document.getElementById('logoutButton');
    const discordButton = document.getElementById('discord-button');




    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        if (body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    logoutButton.addEventListener('click', function () {
        performLogout();
    });



    // Snowfall effect
    const snowfallContainer = document.getElementById('snowfall');
    const numSnowflakes = 80; //Reduced number of snowflakes

    for (let i = 0; i < numSnowflakes; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snow');
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.width = `${Math.random() * 4 + 2}px`; //Smaller snowflakes
        snowflake.style.height = snowflake.style.width;
        snowflake.style.animationDelay = `${Math.random() * 5}s`; // Randomize animation delay
        snowfallContainer.appendChild(snowflake);
    }
});