import React, { useState } from "react"
import _ from "lodash"
import ErrorList from "./ErrorList"

const FAQForm = (props) => {

  const [ newQA, setNewQA ]  = useState({
    question: "",
    answer: ""
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = event => {
    setNewQA({
      ...newQA,
      [event.currentTarget.name]: event.currentTarget.value
      //this is creating a key from input field that has the same name as the state key
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (validFormSubmission()) {
      props.onSubmit(newQA)
      setNewQA({
        question: "",
        answer: "",
      })
    }
  }

  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = [ "question", "answer" ]
    requiredFields.forEach(field => {
      if (newQA[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  return (
    <div className="addFaqForm">

      <ErrorList
      errors={errors}
      />

      <form onSubmit={onSubmit}>


        <label htmlFor="question">New Question:</label>
        <input
          type="text"
          value={newQA.question}
          id="question"
          name="question"
          onChange={handleInputChange}
        />

        <label htmlFor="answer">New Answer:</label>
        <input
          type="text"
          value={newQA.answer}
          id="answer"
          name="answer"
          onChange={handleInputChange}
        />
        <input
          type="submit"
          value="Submit"
          className="button"
          />
      </form>
    </div>
  )
}

export default FAQForm
