// Function to fetch and display the CSV as a table
export async function fetchAndDisplayCSV() {
    const csvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/main/data/teams.csv';

    try {
        // Fetch the CSV file from the URL
        const response = await fetch(csvUrl);
        const csvText = await response.text();

        // Split the CSV content into rows
        const rows = csvText.split('\n');
        if (rows.length > 0) {
            const header = rows[0].split(','); // First row for table headers
            const data = rows.slice(1); // Remaining rows for table data

            // Create the table and inject it into the div
            createTable(header, data);
        }
    } catch (error) {
        console.error("Error fetching the CSV file:", error);
    }
}

// Function to create the table and append it to the 'teams-tab-panel' div
function createTable(headers, rows) {
    const tabPanel = document.getElementById('teams-tab-panel');

    // Create the table container div
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    tableContainer.style.overflowY = 'auto';
    tableContainer.style.overflowX = 'auto';
    tableContainer.style.margin = '0 auto';
    tableContainer.style.width = 'auto';
    tableContainer.style.height = '600px';
    tableContainer.style.overflow = 'scroll';
    tableContainer.style.fontSize = '13px';

    // Create the table
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = 'auto';
    table.border = '1';

    // Create table header
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.style.background = '#eee';

    headers.forEach(headerText => {
        const headerElement = document.createElement('th');
        headerElement.textContent = headerText;
        headerElement.style.background = '#333';
        headerElement.style.color = 'white';
        headerElement.style.padding = '6px';
        headerElement.style.border = '1px solid #ccc';
        headerElement.style.textAlign = 'center';
        headerElement.style.position = 'sticky';
        headerElement.style.top = '0';
        headerElement.style.zIndex = '1';
        headerRow.appendChild(headerElement);
    });
    tableHeader.appendChild(headerRow);

    // Create table body
    const tableBody = document.createElement('tbody');
    rows.forEach(row => {
        if (row.trim() === '') return; // Skip empty rows
        const rowData = row.split(',');
        const rowElement = document.createElement('tr');

        rowData.forEach(cell => {
            const cellElement = document.createElement('td');
            cellElement.textContent = cell;
            cellElement.style.padding = '4px';
            cellElement.style.textAlign = 'left';
            cellElement.style.whiteSpace = 'nowrap';
            rowElement.appendChild(cellElement);
        });

        tableBody.appendChild(rowElement);
    });

    // Append header and body to the table
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    // Clear the previous content in the div and append the new table inside the table container
    tabPanel.innerHTML = '';
    tableContainer.appendChild(table); // Add the table inside the container
    tabPanel.appendChild(tableContainer); // Add the container to the tab panel
}
