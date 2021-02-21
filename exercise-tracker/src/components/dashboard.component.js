import React, { Component } from 'react';
import DataTable from './datatable-component'
import axios from 'axios';


export default class Dashboard extends Component {

  // Username	Description	Duration	Date	Actions

  constructor(props) {
    super(props);

    this.state = {
      responsive: true,
      columns: [
        { title: "Username", data: "username"},
        { title: "Description", data: "description" },
        { title: "Duration", data: "duration"},
        { title: "Date", data: "date"},
      ],
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 1 }
      ],
      searchValue: '',
      options: { },
      data: [],
      isLoaded: false
    };
    this.dataTableRef = React.createRef();
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then((res) => {
        this.setState({
          data: res.data,
          isLoaded: true
        })
        console.log(this.state);
      })
      .catch(err => console.log(' ' + err));

  }

  onChangeSearch = (e) => {
    const { value } = e.target;
    const searchValue = value;
    this.setState({ searchValue });
    this.dataTableRef.current.search(searchValue);
  };

  dataLoaded(isLoaded) {
    if (isLoaded) {
      return
    }
  }

  render() {

    const isLoaded = this.state.isLoaded;

    return (
      <div>
        
        {isLoaded
          ? <DataTable ref={this.dataTableRef} arg={this.state}/>
          : <div></div>
        }

      </div>
    );
  }
}