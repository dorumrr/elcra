import React from 'react';
import { Typography, Paper } from '@material-ui/core';


import { SortingState, IntegratedSorting, PagingState, IntegratedPaging, SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel, TableColumnResizing, DragDropProvider, TableColumnReordering, ColumnChooser, TableColumnVisibility } from '@devexpress/dx-react-grid-material-ui';

// const { ipcRenderer } = require('electron')

const tableDataColumns = require('../../__data/tableDataColumns.json');
let tableDataRows = require('../../__data/tableDataRows.json');
tableDataRows = tableDataRows.map(m => {
  // delete m.uniqueId
  // delete m.picture
  // delete m.id
  m.isActive = m.isActive ? 'Active' : 'Inactive' // never send booleans to tables!!
  return m;
})

console.log(tableDataRows)

class Reports extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      columns: tableDataColumns, // demo data
      rows: tableDataRows, // demo data
      sorting: [
        { columnName: 'key', direction: 'asc' }
      ],
      pageSizes: [8, 24, 72], // add 0 at the end for ALL
      defaultOrder: ['key', /* 'uniqueId', */ 'fullName', 'isActive', 'balance', /* 'picture', */ 'age', 'gender', 'company', 'email', 'phone', 'about' /*, 'id' */],
      defaultColumnWidths: [
        { columnName: 'key', width: 100 },
        { columnName: 'fullName', width: 200 },
        { columnName: 'uniqueId', width: 200 },
        { columnName: 'id', width: 100 },
        { columnName: 'isActive', width: 200 },
        { columnName: 'balance', width: 200 },
        { columnName: 'picture', width: 200 },
        { columnName: 'age', width: 200 },
        { columnName: 'gender', width: 200 },
        { columnName: 'company', width: 200 },
        { columnName: 'email', width: 200 },
        { columnName: 'phone', width: 200 },
        { columnName: 'about', width: 200 },
      ],
      tableColumnExtensions: [
        { columnName: 'fullName', width: 200 }, // ? what role does it play in columns reordering?
      ],
      columnExtensions: [
        // { columnName: 'id', togglingEnabled: false },
        // { columnName: 'uniqueId', togglingEnabled: true},
        { columnName: 'key', togglingEnabled: false},
        { columnName: 'isActive', togglingEnabled: true},
        { columnName: 'balance', togglingEnabled: true},
        // { columnName: 'picture', togglingEnabled: true},
        { columnName: 'age', togglingEnabled: true},
        { columnName: 'fullName', togglingEnabled: true},
        { columnName: 'gender', togglingEnabled: true},
        { columnName: 'company', togglingEnabled: true},
        { columnName: 'email', togglingEnabled: true},
        { columnName: 'phone', togglingEnabled: true},
        { columnName: 'about', togglingEnabled: true},
      ],
      defaultHiddenColumnNames: ['picture', 'id', 'uniqueId', 'gender', 'email', 'phone', 'about'],
    };

    this.changeSorting = sorting => this.setState({ sorting });
  }

  render() { console.log(this.state)

    const { rows, columns, sorting, pageSizes, defaultColumnWidths, tableColumnExtensions, defaultOrder, defaultHiddenColumnNames, columnExtensions } = this.state;

    return (

      <Paper>
        <Grid rows={ rows } columns={ columns }>
          <SearchState defaultValue="" />
          <IntegratedFiltering />

          <SortingState sorting={ sorting } onSortingChange={ this.changeSorting } />
          <IntegratedSorting />

          <PagingState defaultCurrentPage={ 0 } defaultPageSize={ 8 } />
          <IntegratedPaging />

          <DragDropProvider />

          <Table columnExtensions={ tableColumnExtensions } />

          <TableColumnResizing defaultColumnWidths={ defaultColumnWidths } />

          <TableHeaderRow showSortingControls />

          <TableColumnVisibility defaultHiddenColumnNames={ defaultHiddenColumnNames } columnExtensions={ columnExtensions } />

          <TableColumnReordering defaultOrder={ defaultOrder } />

          <PagingPanel pageSizes={pageSizes} />

          <Toolbar />
          <Typography variant="h3" style={{position: 'absolute', top: 32, left: 40}}>Reports</Typography>

          <SearchPanel />

          <ColumnChooser />

        </Grid>
      </Paper>

    );
  }
}

export default Reports;
