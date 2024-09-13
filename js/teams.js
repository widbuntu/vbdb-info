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
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    // Create table headers
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const headerElement = document.createElement('th');
        headerElement.textContent = headerText;
        headerRow.appendChild(headerElement);
    });
    tableHeader.appendChild(headerRow);

    // Create table rows
    rows.forEach(row => {
        if (row.trim() === '') return; // Skip empty rows
        const rowData = row.split(',');
        const rowElement = document.createElement('tr');

        rowData.forEach(cell => {
            const cellElement = document.createElement('td');
            cellElement.textContent = cell;
            rowElement.appendChild(cellElement);
        });

        tableBody.appendChild(rowElement);
    });

    // Append header and body to the table
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    // Clear the previous content in the div and append the new table
    tabPanel.innerHTML = '';
    tabPanel.appendChild(table);
}
