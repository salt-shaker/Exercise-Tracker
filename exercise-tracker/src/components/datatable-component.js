import React, { Component } from 'react';
//import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
//import 'datatables.net-bs4/js/dataTables.bootstrap4.js';
//require('datatables.net-bs4');
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.js';
require('datatables.net-dt');
var $  = require( 'jquery' );

// deleteExercise: this.deleteExercise, keyid: this.randomKey() } })}</tbody>)}                    


export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.datatable = null;
    }

    

    componentDidMount() {
      console.log(this.props);
        this.$el = $(this.el);
        this.dataTable = this.$el.DataTable({
            data: this.props.data,
            columns: this.props.columns,
            ...this.props.options
        });
    }

    componentWillUnmount() {
        this.dataTable.destroy(true);
    }

    // connecting search to an external component, optional but shows how to access the API
    search = (value) => {
        this.dataTable.search(value).draw();
    };

    render() {
        return <table ref={(el) => (this.el = el)} />;
    }
}