let questionCount = 0;
const maxQuestions = 20;

document.getElementById('new-question-btn').addEventListener('click', () => {
    if (questionCount >= maxQuestions) {
        alert("You can only add up to 20 questions.");
        return;
    }

    questionCount++;
    const form = document.getElementById('question-form');

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionLabel = document.createElement('label');
    questionLabel.textContent = `Question ${questionCount}:`;
    questionDiv.appendChild(questionLabel);

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.name = `question-${questionCount}`;
    questionInput.required = true;
    questionDiv.appendChild(questionInput);

    for (let i = 1; i <= 4; i++) {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');

        const answerLabel = document.createElement('label');
        answerLabel.textContent = `Answer ${i}:`;
        answerDiv.appendChild(answerLabel);

        const answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.name = `answer-${questionCount}-${i}`;
        answerInput.required = true;
        answerDiv.appendChild(answerInput);

        const correctInput = document.createElement('input');
        correctInput.type = 'checkbox';
        correctInput.name = `correct-${questionCount}`;
        correctInput.value = i - 1;
        answerDiv.appendChild(correctInput);

        questionDiv.appendChild(answerDiv);
    }

    form.appendChild(questionDiv);
});

document.getElementById('submit-btn').addEventListener('click', async () => {
    const testName = document.getElementById('test-name').value.trim();
    const testClass = document.getElementById('test-class').value.trim();
    if (!testName || !testClass) {
        alert("Please enter both a test name and class.");
        return;
    }

    const form = document.getElementById('question-form');
    const formData = new FormData(form);
    const questions = [];

    for (let i = 1; i <= questionCount; i++) {
        const question = formData.get(`question-${i}`);
        const answers = [
            formData.get(`answer-${i}-1`),
            formData.get(`answer-${i}-2`),
            formData.get(`answer-${i}-3`),
            formData.get(`answer-${i}-4`)
        ];
        const correctAnswer = formData.getAll(`correct-${i}`).map(Number)[0];

        questions.push({ question, answers, correctAnswer, testName, testClass });
    }

    const response = await fetch('http://localhost:5501/submit-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions })
    });

    const result = await response.json();
    if (response.ok) {
        alert('Questions submitted successfully');
        form.reset();
        document.getElementById('test-name').value = '';
        document.getElementById('test-class').value = '';
        questionCount = 0; 
    } else {
        alert(`Error: ${result.message}`);
    }
});
