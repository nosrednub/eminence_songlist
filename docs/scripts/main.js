// Make changes here carefully
var csvFilePath = "./data/Eminence-Sample-File-03312022.csv";

// add column header info here if new column is added to the csv file.
var columnDefs = [
  { field: "Title" },
  { field: "Artist" }
];

// this is added to below after getting the data as well... make changes carefully
// some defaults for the gridOptions
var gridOptions =  {
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true
  },
  columnDefs: columnDefs,
  onColumnResized: (params) => {
    // autosize columns to fit width of parent div
    sizeToFit(params);
  }
};

// DO NOT CHANGE BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING

function filterTableData() {
    gridOptions.api.setQuickFilter(
      document.getElementById('myInput').value
    );
}

function getAutoCompleteValues(songList) {

  var autoCompleteValues = [];

  for (i = 0; i < songList.length; i++) {
    var rowData = songList[i];
    autoCompleteValues.push(rowData["Title"]);
    autoCompleteValues.push(rowData["Artist"]);
  }

  return autoCompleteValues;
}

// setup the grid after the page has finished loading
function initializeTableData() {

  document.addEventListener('DOMContentLoaded', () => {

    // library from: https://www.papaparse.com/docs#csv-to-json
    Papa.parse(csvFilePath, {
      delimiter: ',',
      download: true,
      header: true,
      error: function(x, y) {
        console.log('error', x, y);
      },
      complete: function(data) {
        var gridDiv = document.querySelector('#myGrid');
          var songList = [];
          songList = data.data;
          document.getElementById("itemsTotal").innerHTML = songList.length;
          gridOptions.rowData = songList;

          // initialize autocomplete on searchbox
          // not currently using.  has an issue after selecting suggestion...
          // autocomplete(document.getElementById("myInput"), getAutoCompleteValues(songList));

          // https://www.ag-grid.com/
          // AG-Grid is the table library we are using to display and sort data.
          new agGrid.Grid(gridDiv, gridOptions);
          
          setTimeout(function() {
            // autosize columns to fit width of parent div
            sizeToFit(gridOptions);
          }, 100);
      }
    });
 
  });
}

function sizeToFit(gridOptions) {
  gridOptions.api.sizeColumnsToFit();
}

function autoSizeAll(gridOptions, skipHeader) {
  const allColumnIds = [];
  gridOptions.columnApi.getAllColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });

  gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
}
