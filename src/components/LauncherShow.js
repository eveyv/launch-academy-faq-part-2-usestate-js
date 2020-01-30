import React, { useState, useEffect } from "react"

const LauncherShow = (props) => {

  const [ launcher, setLauncher ] = useState({})

  let launcherId = props.match.params.id
//Route
  useEffect(() => {
    fetch(`/api/v1/launcher/${launcherId}`)
    .then(response => response.json())
    .then(body => {
      setLauncher(body)
    })
  }, [])

  return(
    <div>
      <h3>Name: {launcher.name}</h3>
      <h4>Bio: {launcher.bio}</h4>
    </div>
  )
}


export default LauncherShow
