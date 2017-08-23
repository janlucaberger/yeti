import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/ui_actions';

class Modal extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      klasses: "modal-container"
    }

    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.showModal()
  }

  showModal(){
    if(this.props.display){
      this.setState({
        klasses: "modal-container active"
      })
    }
  }

  hideModal(e){
    this.props.hideModal();
  }

  render(){
    if(this.props.display){
      const Component = this.props.component
      return(
        <div className="modal-container">
          <div onClick={this.hideModal} className="modal-hide-field" />
          <div className="modal">
            <Component />
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    display: state.ui.modal.display,
    component: state.ui.modal.component
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
