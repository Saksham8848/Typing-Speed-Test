const paragraphs = [
    "Learning to type quickly is a useful skill that can save you a lot of time every day. When you practice regularly, your fingers begin to remember where each key is located, and you no longer need to look at the keyboard. Start slowly and focus on accuracy first, because speed will come naturally with time. Keep your wrists relaxed, sit up straight, and take short breaks when your hands feel tired. Many people improve a great deal after only a few weeks of daily practice. Stay patient, keep trying, and enjoy watching your progress grow with every single test you complete.",

    "The mountains rise high above the quiet valley, and the morning mist slowly lifts from the river below. Farmers begin their day early, walking along narrow paths to reach their green fields. Birds sing from the tall trees while the sun climbs higher into the clear blue sky. Travelers from many countries come to enjoy the fresh air and the beautiful views. They often say that the calm of the hills helps them forget their worries. After a long walk, a warm cup of tea and a simple meal taste better than anything else in the world."
];

const textDisplay = document.getElementById("text-display");
const typingInput = document.getElementById("typing-input");
const restartButton = document.getElementById("restart-button");

const wpmElement = document.getElementById("wpm");
const cpmElement = document.getElementById("cpm");
const accuracyElement = document.getElementById("accuracy");
const timeElement = document.getElementById("time");

const resultsBox = document.getElementById("results");
const finalWpm = document.getElementById("final-wpm");
const finalCpm = document.getElementById("final-cpm");
const finalAccuracy = document.getElementById("final-accuracy");
const finalTime = document.getElementById("final-time");

let currentText = "";
let startTime = null;
let timerInterval = null;
let testFinished = false;
let lastParagraphIndex = -1;

function loadParagraph() {
    if (paragraphs.length === 0) {
        textDisplay.textContent = "No paragraph available.";
        return;
    }

    let index = Math.floor(Math.random() * paragraphs.length);
    if (paragraphs.length > 1 && index === lastParagraphIndex) {
        index = (index + 1) % paragraphs.length;
    }
    lastParagraphIndex = index;
    currentText = paragraphs[index];

    textDisplay.innerHTML = "";
    for (let i = 0; i < currentText.length; i++) {
        const letterSpan = document.createElement("span");
        letterSpan.textContent = currentText[i];
        textDisplay.appendChild(letterSpan);
    }

    textDisplay.children[0].classList.add("current");
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateStats, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function getSecondsElapsed() {
    if (startTime === null) {
        return 0;
    }
    return (Date.now() - startTime) / 1000;
}

function countCharacters() {
    const typedText = typingInput.value;
    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentText[i]) {
            correct++;
        }
    }

    return {
        correct: correct,
        total: typedText.length
    };
}

function updateStats() {
    const seconds = getSecondsElapsed();
    const minutes = seconds / 60;
    const counts = countCharacters();

    let wpm = 0;
    let cpm = 0;
    let accuracy = 100;

    if (minutes > 0) {
        cpm = Math.round(counts.correct / minutes);
        wpm = Math.round(counts.correct / 5 / minutes);
    }

    if (counts.total > 0) {
        accuracy = Math.round((counts.correct / counts.total) * 100);
    }

    wpmElement.textContent = wpm;
    cpmElement.textContent = cpm;
    accuracyElement.textContent = accuracy + "%";
    timeElement.textContent = Math.floor(seconds) + "s";
}

function updateLetterColors() {
    const typedText = typingInput.value;
    const letters = textDisplay.children;

    for (let i = 0; i < letters.length; i++) {
        letters[i].classList.remove("correct", "incorrect", "current");

        if (i < typedText.length) {
            if (typedText[i] === currentText[i]) {
                letters[i].classList.add("correct");
            } else {
                letters[i].classList.add("incorrect");
            }
        } else if (i === typedText.length) {
            letters[i].classList.add("current");
        }
    }
}

function handleTyping() {
    if (testFinished) {
        return;
    }

    if (startTime === null && typingInput.value.length > 0) {
        startTimer();
    }

    if (typingInput.value.length > currentText.length) {
        typingInput.value = typingInput.value.slice(0, currentText.length);
    }

    updateLetterColors();
    updateStats();

    if (typingInput.value.length === currentText.length) {
        finishTest();
    }
}

function finishTest() {
    testFinished = true;
    stopTimer();
    updateStats();

    finalWpm.textContent = wpmElement.textContent;
    finalCpm.textContent = cpmElement.textContent;
    finalAccuracy.textContent = accuracyElement.textContent;
    finalTime.textContent = getSecondsElapsed().toFixed(1) + "s";

    resultsBox.classList.remove("hidden");
    typingInput.blur();
}

function restartTest() {
    stopTimer();
    startTime = null;
    testFinished = false;

    typingInput.value = "";
    resultsBox.classList.add("hidden");

    wpmElement.textContent = "0";
    cpmElement.textContent = "0";
    accuracyElement.textContent = "100%";
    timeElement.textContent = "0s";

    loadParagraph();
    typingInput.focus();
}

typingInput.addEventListener("input", handleTyping);
restartButton.addEventListener("click", restartTest);

textDisplay.addEventListener("click", function () {
    if (!testFinished) {
        typingInput.focus();
    }
});

loadParagraph();
typingInput.focus();