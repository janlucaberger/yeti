import React from 'react';
import { connect } from 'react-redux';

class Loading extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      klasses: "loading-container"
    }

    this.showLoading = this.showLoading.bind(this)
    this.hideLoading = this.hideLoading.bind(this)
  }

  showLoading(){
    if(this.props.display){
      this.setState({
        klasses: "loading-container active"
      })
    }
  }

  hideLoading(e){
    this.props.hideLoading();
  }


  render(){
    if(this.props.display){
      return <div className="loading-container">Loading</div>
    } else {
      return <div></div>
    }
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    display: state.ui.loading.display,
    props: state.ui.loading.props
  }
}

export default connect(mapStateToProps)(Loading);
