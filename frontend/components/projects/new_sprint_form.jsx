import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { createSprint } from '../../actions/sprints/sprints_actions';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/ui_actions';

class NewSprintForm extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      start_date: moment(),
      end_date: moment(),
      name: "",
      project_id: this.props.projectId
    };
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key){
    return (e) => {
      this.setState({
        [key]: e.currentTarget.value
      })
    }
  }

  handleStartDate(date) {
    this.setState({
      start_date: date
    });
  }

  handleSubmit(){
    let params = this.state
    params["start_date"] = this.state.start_date._d
    params["end_date"] = this.state.end_date._d
    
    this.props.createSprint(params).then(
      () => this.props.hideModal()
    )
  }

  handleEndDate(date) {
    this.setState({
      end_date: date
    });
  }
  render() {
    console.log(this.state)
    return(
      <div className="new-item-form-container">
        <div className="new-item-form-header">
          <h3>Create New Sprint</h3>
          <h5> </h5>
        </div>
        <div className="new-item-form-content">
          <div className="new-sprint-name">
            <label className="new-item-form-label">Name</label>
            <input type="text" className="new-item-form-input" value={this.state.name} onChange={this.handleChange("name")} />
          </div>
          <div className="new-sprint-date-container">
            <div className="new-sprint-date-titles">
              <h4>Start Date</h4>
              <h4>End Date</h4>
            </div>
            <div className="new-sprint-date-selectors">
              <DatePicker
                  selected={this.state.start_date}
                  onChange={this.handleStartDate}
              />
              <DatePicker
                  selected={this.state.end_date}
                  onChange={this.handleEndDate}
              />
            </div>
          </div>
        </div>

        <div className="new-item-form-footer">
          <button className="secondary-button white-background" onClick={this.props.closeModal}>Cancel</button>
          <button className="primary-button blue-background" onClick={this.handleSubmit}>Add</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.ui.modal.props.projectId
  }
}



const mapDispatchToProps = dispatch => {
  return{
    createSprint: sprint => dispatch(createSprint(sprint)),
    hideModal: () => dispatch(hideModal()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewSprintForm))
