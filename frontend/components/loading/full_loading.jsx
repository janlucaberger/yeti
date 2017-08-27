import React from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

class FullLoading extends React.Component{
  constructor(props){
    super(props)

    this.showLoader = this.showLoader.bind(this)
  }

  showLoader(){
    if(this.props.display){
      return "full-loading-container loading-active"
    } else {
      return "full-loading-container"
    }
  }



  render(){
    return (
      <div className={this.showLoader()}>
        <ReactLoading type="spin" color="#1D00FF" />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    display: state.ui.loading.display,
    props: state.ui.loading.props
  }
}

export default connect(mapStateToProps)(FullLoading)
