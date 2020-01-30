//this has to be in the component that is the container for the display of the data being called upon and mutated!!!

useEffect(() => {
  fetch(/api/v1/questions)
  .then(response => {
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

//fetch will be used when any data is required to display on the page OR when performing any  POST actions.
//think : getQuestions, questionList, set
//the list component will use fetch and useeffect,
//the show component will also use fetch in conjuntion with useEffect and useState
