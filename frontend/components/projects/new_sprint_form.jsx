import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class NewSprintForm extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      start_date: moment(),
      end_date: moment(),
      name: "",
      project_id: 1
    };
    debugger
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
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
      startDate: date
    });
  }

  handleSubmit(){
    this.createSprint(this.state)
  }

  handleEndDate(date) {
    this.setState({
      endDate: date
    });
  }
  render() {
    debugger

    return(
      <div className="new-item-form-container">
        <div className="new-item-form-header">
          <h3>Create New Sprint</h3>
          <h5> </h5>
        </div>
        <div className="new-item-form-content">
          <div className="new-sprint-name">
            <label className="new-item-form-label">Name</label>
            <input type="text" className="new-item-form-input" value={this.state.name} onChange={this.handleChange("title")} />
          </div>
          <div className="new-sprint-date-container">
            <div className="new-sprint-date-titles">
              <h4>Start Date</h4>
              <h4>End Date</h4>
            </div>
            <div className="new-sprint-date-selectors">
              <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleStartDate}
              />
              <DatePicker
                  selected={this.state.endDate}
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

export default withRouter(NewSprintForm)
