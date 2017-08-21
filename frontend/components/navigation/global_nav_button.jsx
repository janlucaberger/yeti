import React from 'react';
import FontAwesome from 'react-fontawesome';

const GlobalNavButton = ({link, icon, size}) =>{
  return(
    <div onClick={link} className="global-nav-button">
      <FontAwesome name={icon} />
    </div>
  )
}

export default GlobalNavButton
