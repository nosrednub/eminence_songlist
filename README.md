# eminence_songlist

Songlist table view and simple search functionality.

Table uses a virtualized table.  This allows all data to reside in the browser to make searching and filtering much faster.

Data is loaded from a csv file located at /docs/data
  - filename can be changes in /docs/scripts/main.js
  - main.js file is commented at the top with sections that are changeable.
  - style overrides are located in docs/styles/main.css.  Very few overrides are needed to this so there was no reason to really use any styles from Bootstrap or other css libraries.  Table styles are pulled directly from AG-GRID Community edition.
