import React from 'react';
import { connect } from 'react-redux';
import { fetchAnalyticsData } from '../../actions/dashboard/analytics';
import { getAssignedIssues } from '../../reducers/selectors';
import {RadialBarChart, RadialBar, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import _ from 'lodash';

class Data extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true
    }

    this.loadingComplete = this.loadingComplete.bind(this)
    this.addColors = this.addColors.bind(this)
    this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this)
  }

  componentDidMount(){
    this.props.fetchAnalyticsData().then(
      () => this.loadingComplete()
    )
  }

  loadingComplete(){
    this.setState({
      loading: false
    })
  }

  addColors(data){
    const colors = ["#00ac49", "#008d21", "#ff6d00", "#ff0030"]
    data = _.sortBy(data, "id")
    data.map( obj => {
      return obj["fill"] = colors.pop()
    })
    return data
  }



  renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }){
    const RADIAN = Math.PI / 180
   	const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    debugger
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      	{arguments[0].name}
      </text>
    );
  };

  render(){
    if(this.state.loading){
      return <div>loading</div>
    } else {
      return(
        <div>
          <div className="widget-title">Analytics</div>
            <div className="charts-container">
              <div className="chart-container">
                <div className="chart-title">
                  Issues by Type
                </div>
                <div style={{paddingTop: "30px"}}>
                  <BarChart style={{marginTop: "20px"}} width={300} height={250} data={this.props.typeData}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="issue_type"/>
                   <YAxis/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="count" fill="#0633e9" />
                  </BarChart>
                </div>
              </div>
              <div className="chart-container">
                <div className="chart-title">
                  Issues by Priority
                </div>
                <PieChart width={300} height={300}>
                  <Pie data={this.addColors(this.props.priorityData)} dataKey="count" nameKey="priority_type" cx={"50%"} cy={"50%"} innerRadius={70} outerRadius={90} fill="#82ca9d" label={this.renderCustomizedLabel}/>
               </PieChart>
              </div>
            </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {

  return{
    typeData: (typeof state.analytics.data === "undefined") ? "" : state.analytics.data.type_count,
    priorityData: (typeof state.analytics.data === "undefined") ? "" : state.analytics.data.priority_count,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAnalyticsData: () => dispatch(fetchAnalyticsData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data)
