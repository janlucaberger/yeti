import React from 'react';

const Resolution = ({resolution}) => {
  let formattedText = "";
  if(resolution){

    formattedText = resolution.split("")[0].toUpperCase() + resolution.slice(1)
  }

  return(
    <div className="status-label-container">
      <div className="form-input-title">Resolution</div>
      <span className="resolution-label-text">{formattedText}</span>
    </div>
  )
}

export default Resolution
