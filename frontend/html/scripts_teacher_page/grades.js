document.addEventListener("DOMContentLoaded", () => {
    const checkGradesButton = document.getElementById("pop-up-check-grades");
    const checkGradesPopup = document.getElementById("check-grades-popup");
    const closePopupButton = document.getElementById("close-check-grades-popup");
    const fetchGradesButton = document.getElementById("fetch-grades-button");
    const testNameInput = document.getElementById("test-name-input");
    const attemptsContainer = document.getElementById("test-attempts-container");

    checkGradesButton.addEventListener("click", () => {
        checkGradesPopup.classList.add("active");
    });

    closePopupButton.addEventListener("click", () => {
        checkGradesPopup.classList.remove("active");
        attemptsContainer.innerHTML = "";
    });

    fetchGradesButton.addEventListener("click", async () => {
        const testName = testNameInput.value.trim();
        if (testName) {
            await fetchTestAttempts(testName);
        }
    });

    async function fetchTestAttempts(testName) {
        try {
            const response = await fetch(`http://localhost:5501/test-attempts/${testName}`);
            const testAttempts = await response.json();
            attemptsContainer.innerHTML = "";

            if (testAttempts.length === 0) {
                attemptsContainer.innerHTML = "<p>No attempts found for this test.</p>";
            } else {
                testAttempts.forEach(attempt => {
                    const attemptElement = document.createElement('div');
                    attemptElement.classList.add('attempt');
                    attemptElement.innerHTML = `
                        <p class="student-info">Student: ${attempt.student} <span class="score-info">Score: ${attempt.score}</span></p>
                    `;
                    attemptsContainer.appendChild(attemptElement);
                });
            }
        } catch (error) {
            console.error('Error fetching test attempts:', error);
        }
    }
});
