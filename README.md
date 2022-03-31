# eminence_songlist

Songlist table view and simple search functionality.

## Table
Table uses a virtualized table.  This allows all data to reside in the browser to make searching and filtering much faster.
  - virtualization in a table means that the web browser is only rendering the rows that are visible to the user.  The rest is just kept in memory.

If you need to add new columns of data (i.e. an album name, year, etc) you can simply add the columns to your CSV file, then edit the main.js file.
  - columnDefs at the top of the file determines which columns from the data file will show in the table.
  -  field is equal to the header name in the csv file. (i.e. Title,Artist,Code)

## Data File
Data is loaded from a csv file located at /docs/data
  - filename can be changes in /docs/scripts/main.js
  - at the top of the main.js file is a csvFilePath variable.  This can be changed if you'd like to use an easier name for the file.  You could change it to something like songList.csv and then just change the name of your file before uploading in the future (instead of having the date at the end of the file)
  - main.js file is commented at the top with sections that are changeable.
  - lower sections should not be changed without understanding what will happen.
  - style overrides are located in docs/styles/main.css.  Very few overrides are needed to this so there was no reason to really use any styles from Bootstrap or other css libraries.
  - Table styles are pulled directly from AG-GRID Community edition and imported at the top of index.html

## Benefits to this approach
Loading data directly from a csv gives some benefits over using a database.
  - local file which can be downloaded quickly.
  -  35000 records coming across the network in a json format is around 4mb of data.
  -  35000 records in a csv is around 1.5mb of data.  (this is due to how a csv is just comma separated values, and also does not require each row of data to describe all of it's attributes.
  - Using the csv directly with javascript allows you to simply re-upload a new version of the csv file instead of going through an upload process and waiting for data to parse.
