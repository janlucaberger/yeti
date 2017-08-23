import React from 'react'
import Widget from '../dashboard/widget';

const Dashboard = () => {
  return(
    <div className="content-inner-container">
      <div className="widget-container">
        <Widget />
        <Widget />
        <Widget />
        <Widget />
      </div>
    </div>
  )
}

export default Dashboard
