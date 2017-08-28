import React from 'react';

class Dropdown extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      showOptions: false,
      loading: true,
      current_option: "",
      current_option_icon: ""
      // current_option: this.props.currentOption[this.props.item],
      // current_option_icon: this.props.currentOption[this.props.iconKey]
    }
    this.showOptions = this.showOptions.bind(this)
    this.hideOptions = this.hideOptions.bind(this)
    this.closeOptions = this.closeOptions.bind(this)
    this.options = this.options.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps){
    let current_option =  {};
    if(nextProps.currentOption){
      current_option = nextProps.currentOption
    }
    this.setState({
      loading: false,
      current_option: current_option[nextProps.item],
      current_option_icon: current_option[nextProps.iconKey],
    })
  }

  showOptions(){
    this.setState({ showOptions: true})
    document.addEventListener("click", this.closeOptions)
  }

  hideOptions(){
    this.setState({ showOptions: false})
  }

  closeOptions(e){
    if(this.node.contains(e.target)){
      return;
    }
    this.hideOptions()
  }

  handleClick(id){
    return (e) => {
      e.stopPropagation();
      this.props.updateProperty(this.props.changeKey, id)
      this.hideOptions()
    }
  }

  options(){
    const mappedoptions = Object.values(this.props.options).map((option) => {
      return(
        <li key={option.id} onClick={this.handleClick(option.id)} className="dropdown-option-container">
          <img height="20px" src={option[this.props.iconKey]} />
          <span className="dropdown-option-text">{option[this.props.item]}</span>
        </li>
      )
    })
    if(this.state.showOptions){
      return(
        <ul className="dropdown-options">
          { mappedoptions }
        </ul>
      )
    }
  }


  componentWillUnmount(){
    document.removeEventListener("click", this.closeOptions)
  }

  render(){
    return(
      <div style={{width: this.props.width}} onFocus={this.showOptions} className="dropdown-container">
        <div className="form-input-title">{this.props.title}</div>
        <div>
          <div className="dropdown-icon-placeholder">
            <img height="20px" src={this.state.current_option_icon}/>
          </div>
          <input
            ref={ node => {this.node = node}}
            className="dropdown-input"
            onClick={this.showOptions}
            value={this.state.current_option}
          />
        </div>
        { this.options() }
      </div>
    )
  }

}

export default Dropdown
