import React from "react"
// import FAQForm from "./FAQContainer" // unnecessary?
import LauncherList from "./LauncherList"
import LauncherShow from "./LauncherShow"
import FAQContainer from "./FAQContainer"

import { BrowserRouter, Route, Switch } from "react-router-dom"

const App = props => {

          //Route has a built-in method that matches the id in the url to the proper component. this is set up on the show page in FAQ 2, for example.

  return(
    <BrowserRouter>
      <Switch>

        <Route exact path="/" component={FAQContainer} />
        <Route exact path="/launchers" component={LauncherList} />
        <Route exact path="/launcher/:id" component={LauncherShow} />


      </Switch>
    </BrowserRouter>
  )
}

export default App
