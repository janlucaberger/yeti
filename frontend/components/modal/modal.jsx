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
    this.renderModalClasses = this.renderModalClasses.bind(this)
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

  renderModalClasses(){
    if(typeof this.props.styles === "undefined" || this.props.styles === null){
      return "modal"
    } else {
      const newStyles = Object.values(this.props.styles)
      return ["modal"].concat(newStyles).join(" ")
    }
  }

  render(){
    if(this.props.display){
      let Component = "";

      if(this.props.component){
        Component = this.props.component
      }

      return(
        <div className="modal-container">
          <div onClick={this.hideModal} className="modal-hide-field" />
          <div className={this.renderModalClasses()}>
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
    component: state.ui.modal.component,
    styles: state.ui.modal.styles,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
