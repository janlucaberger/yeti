import React from 'react';


const Widget = ({component, props}) => {
  const Component = component
  return (
    <div className="widget">
      <div className="widget-border"></div>
      <Component {...props} />
    </div>
  )
}

export default Widget
