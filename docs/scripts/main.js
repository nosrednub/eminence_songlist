// Make changes here carefully
var csvFilePath = "./data/Eminence-Sample-File-03312022.csv";

// add column header info here if new column is added to the csv file.
var columnDefs = [
  { field: "Title", headerName: "Song Title" },
  { field: "Artist" }
  { field: "Album" }
];

// this is added to below after getting the data as well... make changes carefully
// some defaults for the gridOptions
var gridOptions =  {
  defaultColDef: {
    sortable: true,
    wrapText: true,
    autoHeight: true
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

// setup the grid after the page has finished loading
function initializeTableData() {

  document.addEventListener('DOMContentLoaded', () => {

    // library from: https://www.papaparse.com/docs#csv-to-json
    Papa.parse(csvFilePath, {
      delimiter: ',',
      download: true,
      header: true,
      skipEmptyLines: true,
      error: function(x, y) {
        console.log('error', x, y);
      },
      complete: function(data) {
        var gridDiv = document.querySelector('#tableGrid');
          var songList = [];
          songList = data.data;
          // document.getElementById("itemsTotal").innerHTML = songList.length + " Results";
          gridOptions.rowData = songList;

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

function toggleMenuOpen() {
  var menuUl = document.getElementById("menuList");
  var menuOpen = menuUl.classList.contains("open");

  if (menuOpen) menuUl.classList.remove("open");
  else menuUl.classList.add("open");

}
