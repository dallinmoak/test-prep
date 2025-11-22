import "./App.css";
import data from "../public/questions.json";
import { useState } from "react";

function App() {
  const [question, setQuestion] = useState(data.questions[0]);

  const [selectedOption, setSelectedOption] = useState(null);

  const [showAnswer, setShowAnswer] = useState(false);

  const printRadioAnswer = (option, index) => {
    let colorClass = "";
    if (showAnswer) {
      if (index == question.answers[0]) {
        colorClass = "green";
      } else if (index == selectedOption) {
        colorClass = "red";
      }
    }
    return (
      <div key={index}>
        <label className={colorClass} htmlFor={`option-${index}`}>
          <input
            type="radio"
            id={`option-${index}`}
            name="options"
            value={index}
            onChange={() => setSelectedOption(index)}
          />
          {option}
        </label>
      </div>
    );
  };

  const printCheckboxAnswer = (option, index) => {
    let colorClass = "";
    if (showAnswer) {
      if (question.answers.includes(index)) {
        colorClass = "green";
      } else if (selectedOption?.includes(index)) {
        colorClass = "red";
      }
    }
    return (
      <div key={index}>
        <label className={colorClass} htmlFor={`option-${index}`}>
          <input
            type="checkbox"
            id={`option-${index}`}
            name="options"
            value={index}
            onChange={() => {
              setSelectedOption((prev) => {
                if (prev === null) {
                  return [index];
                } else {
                  if (prev.includes(index)) {
                    return prev.filter((i) => i !== index);
                  } else {
                    return [...prev, index];
                  }
                }
              });
            }}
          />
          {option}
        </label>
      </div>
    );
  };

  return (
    <>
      <ul>
        {data.questions.map((q, index) => (
          <li key={index}>
            <a
              className={
                q.question === question.question ? "selected-question" : ""
              }
              onClick={() => {
                setShowAnswer(false);
                setSelectedOption(null);
                setQuestion(data.questions[index]);
              }}
            >
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
      <h1>question:</h1>
      <div className="card">
        {question.type === "radio" && (
          <>
            <p>{question.question}</p>
            {question.options.map((option, index) =>
              printRadioAnswer(option, index)
            )}
          </>
        )}
        {question.type === "checkbox" && (
          <>
            <p>{question.question}</p>
            {question.options.map((option, index) =>
              printCheckboxAnswer(option, index)
            )}
          </>
        )}
        <button onClick={() => setShowAnswer(!showAnswer)}>
          show answer is currently {showAnswer ? "ON" : "OFF"}
        </button>
      </div>
      <button
        className="next-button"
        onClick={() => {
          setShowAnswer(false);
          setSelectedOption(null);
          const currentIndex = data.questions.findIndex(
            (q) => q.question === question.question
          );
          const nextIndex = (currentIndex - 1 + data.questions.length) % data.questions.length;
          setQuestion(data.questions[nextIndex]);
        }}
      >
        previous Question
      </button>
      <button
        className="next-button"
        onClick={() => {
          setShowAnswer(false);
          setSelectedOption(null);
          const currentIndex = data.questions.findIndex(
            (q) => q.question === question.question
          );
          const nextIndex = (currentIndex + 1) % data.questions.length;
          setQuestion(data.questions[nextIndex]);
        }}
      >
        Next Question
      </button>
    </>
  );
}

export default App;
