import React from 'react';

import ReactLoading from 'react-loading';

const LoadingSpinner = () => {
  return(
    <div className="loading-spinner-container">
      <ReactLoading type="spin" height="34px" width="34px" color="#1D00FF" />
    </div>
  )
}

export default LoadingSpinner
