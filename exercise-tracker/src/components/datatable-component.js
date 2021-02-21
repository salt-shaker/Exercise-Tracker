import React, { Component } from 'react';
//import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
//import 'datatables.net-bs4/js/dataTables.bootstrap4.js';
//require('datatables.net-bs4');
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-responsive-dt/js/responsive.dataTables.js';
require('datatables.net-dt');
require( 'datatables.net-responsive-dt');
//require( 'datatables.net-bs4' );
//require( 'datatables.net-responsive-bs4' );
var $  = require( 'jquery' );

// deleteExercise: this.deleteExercise, keyid: this.randomKey() } })}</tbody>)}                    


export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.datatable = null;
    }

    

    componentDidMount() {
      //console.log(this.props);
        this.$el = $(this.el);
        this.dataTable = this.$el.DataTable({
            responsive: this.props.arg.responsive,
            data: this.props.arg.data,
            columns: this.props.arg.columns,
            columnDefs: this.props.columnDefs,
            ...this.props.arg.options
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
        return <table className="display responsive nowrap" style={{width: "100%"}} ref={(el) => (this.el = el)} />;
    }
}