import React, { useState, useEffect } from 'react';

import Question from './Question';
import FAQForm from './FAQForm';

import { BrowserRouter, Link, Switch } from 'react-router-dom'

const FAQContainer = (props) => {

  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState([])

  useEffect(() => {
    fetch('/api/v1/questions')
    .then(response => {
      //put debugger here to see what you're returning after the fetch. the debugger has to be inside the .then
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} ${response.statusText}`,
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(response => {
      setQuestions(response)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const toggleQuestionSelect = (id) => {
    if(id === selectedQuestion) {
      setSelectedQuestion(null)
    }
    else {
      setSelectedQuestion(id)
    }
  }

  const setNewQuestion = (formPayload) => {
    fetch('/api/v1/questions', {
      method: "POST",
      body: JSON.stringify(formPayload),
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    //this
    .then(body => {
      setQuestions([
        ...questions,
        body
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const questionListItems = questions.map(question => {
    let selected;
    if (selectedQuestion === question.id) {
      selected = true
    }

    let handleClick = () => { toggleQuestionSelect(question.id) }

    return(
      <Question
        key={question.id}
        question={question.question}
        answer={question.answer}
        selected={selected}
        handleClick={handleClick}
      />
    )
  })

  return(
    <div className='page'>
      <h1>We Are Here To Help</h1>
      <div className='question-list'>
        {questionListItems}
      </div>

      <div className='question-form'>
        <FAQForm
          onSubmit={setNewQuestion}
          />
      </div>

      <div className="launcher-link">
          <Link to="/launchers"> List of Famous Launchers</Link>
      </div>
    </div>
  )

}

export default FAQContainer;
