import React, { Component } from 'react';
import DataTable from './datatable-component'
import axios from 'axios';


export default class Dashboard extends Component {

  // Username	Description	Duration	Date	Actions

    constructor(props) {
        super(props);

        this.state = {
            columns: [
              { title: "Username", data: "username" },
              { title: "Description", data: "description" },
              { title: "Duration", data: "duration" },
              { title: "Date", data: "date" },
            ],
            searchValue: '',
            options: {
                //dom: 'lrtip',
                // paging: false,
                // scrollX: true,
                // scrollY: '100%',
                // scrollCollapse: false,
                // autoWidth: false,
                // info: false,
            },
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

    dataLoaded(isLoaded){
      if(isLoaded){
        return 
      }
    }

    render() {

      const isLoaded = this.state.isLoaded;

        return (
          <div>
            <input
                value={this.state.searchValue}
                onChange={this.onChangeSearch}
                autoComplete={'off'}
                type="text"
                placeholder="Search ..."
            />
            

      {isLoaded
        ? <DataTable ref={this.dataTableRef} data={this.state.data} columns={this.state.columns} options={this.state.options}/>
        : <div></div>
      }

          </div>
        );
    }
}