import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class StockRiskTable extends React.Component {

  categorizeHotness(fieldValue) {

    if (fieldValue > 0.05 && fieldValue <= 0.10) { return 'table-hotness-normal';}
    else if (fieldValue > 0.10) { return 'table-hotness-hot';}

    return 'table-hotness-weak';
  }
  // Rendering section
  render = () => {
    // Obtain stock data from parent component
    const listStock = this.props.stockList;

    // Options for cell edit
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };

    // Options for mode on selecting rows
    const selectRowProp = {
      mode: 'checkbox'
    };

    // Hooking the operation of dropping rows
    const options = {

      page: 1,
      sizePerPageList: [ {
        text: '5', value: 5
      } ],
      sizePerPage: 5, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: 'top', // default is bottom, top and both is all available
      afterDeleteRow: this.onAfterDeleteRow
    };

    return (

      <BootstrapTable data={listStock} options={options} pagination striped hover condensed>
        <TableHeaderColumn isKey={true} dataField='id' dataSort> ID </TableHeaderColumn>
        <TableHeaderColumn dataField='code' dataSort> Stock Code</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort> Stock Name</TableHeaderColumn>
        <TableHeaderColumn dataField='max_drawdown' dataSort> Max Drawdown </TableHeaderColumn>
        <TableHeaderColumn dataField='beta' dataSort> Beta </TableHeaderColumn>
        <TableHeaderColumn dataField='average_per' dataSort> Average Per</TableHeaderColumn>
        <TableHeaderColumn dataField='mean_ratio' dataSort> Mean Ratio </TableHeaderColumn>
        <TableHeaderColumn dataField='hotness' dataSort columnClassName={this.categorizeHotness}> Popularity </TableHeaderColumn>
      </BootstrapTable>
      
    );
  }
}