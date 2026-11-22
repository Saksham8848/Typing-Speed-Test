# Typing Speed Test

A simple, responsive typing speed test built with **HTML, CSS, and vanilla JavaScript**. No libraries or frameworks.

## Features

- Paragraph of about 100 words to type
- Letter-by-letter feedback: correct letters turn green, mistakes turn red, and the current letter is highlighted
- Timer starts automatically on your first keystroke
- Live stats: WPM, CPM, accuracy, and elapsed time
- Detects when you finish and shows your final results
- Restart button that resets everything and loads a new paragraph
- Responsive layout for desktop, tablet, and mobile

## How the stats are calculated

- **WPM** = (correct characters ÷ 5) ÷ minutes
- **CPM** = correct characters ÷ minutes
- **Accuracy** = correct characters ÷ total typed characters × 100

## Project structure

```
Typing-Speed-Test/
├── index.html
├── style.css
└── script.js
```

## How to run

1. Clone the repository:
   ```bash
   git clone https://github.com/Saksham8848/Typing-Speed-Test.git
   ```
2. Open the folder in VS Code.
3. Open `index.html` in your browser, or use the **Live Server** extension.

## Technologies used

- HTML5
- CSS3 (Flexbox, Grid, media queries)
- JavaScript (ES6)

## Future improvements

- Save the best score in the browser
- Add more paragraphs and difficulty levels
- Add selectable test durations

## Author

Made by [Saksham](https://github.com/Saksham8848)
