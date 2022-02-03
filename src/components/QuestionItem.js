import React from "react";

function QuestionItem({ question, onQuestionDelete }) {
  const { id, prompt, answers, correctIndex } = question;


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
    .then((res) => res.json())
    .then(() => onQuestionDelete(question))
  }
  function handleAnswerSelect(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "correctIndex": correctIndex
      }
    })
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerSelect}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
