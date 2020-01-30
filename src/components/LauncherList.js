import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

//useEffect is used to keep state and data in sync. we are primarily using it now in conjunction with fetch
const LauncherList = (props) => {
  const [launchers, setLaunchers] = useState([])

  useEffect(() => {
    fetch("/api/v1/launchers")
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error)
      }
    })
    .then(response => {
      return response.json()
    })
    .then(launcherResponse => {
      setLaunchers(launcherResponse)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])
  const launcherList = launchers.map((launcher) => {
    return(
      <li key={launcher.id}>
        <Link to={`/launcher/${launcher.id}`}>{launcher.name}</Link>
      </li>
    )
  })

  return(
    <div>
      <ul>
        {launcherList}
      </ul>
    </div>
  )
}

export default LauncherList;
