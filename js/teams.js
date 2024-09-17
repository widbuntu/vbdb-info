// export async function fetchAndDisplayCSV() {
//     const csvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/main/data/teams.csv';
//     try {
//         const response = await fetch(csvUrl);
//         const csvText = await response.text();
//         const rows = csvText.split('\n');

//         if (rows.length > 0) {
//             const header = ['Team', 'Conference', 'School URL', 'Athletics URL', 'State', 'Year', 'Division'];
//             const data = rows.slice(1);

//             // Parse the CSV to get conferences by division
//             const conferencesByDivision = groupConferencesByDivision(data);

//             // Initially display all rows
//             createTable(header, data);

//             // Add event listeners for dropdowns
//             const conferenceDropdown = document.getElementById('conference-dropdown');
//             const divisionDropdown = document.getElementById('division-dropdown');

//             // Event listener to filter conferences by division
//             divisionDropdown.addEventListener('change', () => {
//                 const selectedDivision = divisionDropdown.value;
//                 updateConferenceDropdown(conferencesByDivision, selectedDivision);
//                 applyFilters();
//             });

//             conferenceDropdown.addEventListener('change', applyFilters);

//             function applyFilters() {
//                 const selectedConference = conferenceDropdown.value;
//                 const selectedDivision = divisionDropdown.value;
//                 filterData(header, data, selectedConference, selectedDivision);
//             }
//         }
//     } catch (error) {
//         console.error("Error fetching the CSV file:", error);
//     }
// }

// // Group conferences by division
// function groupConferencesByDivision(rows) {
//     const conferencesByDivision = {};

//     rows.forEach(row => {
//         const rowData = parseCSVRow(row);
//         const division = rowData[6]; // 'Division' column
//         const conference = rowData[1]; // 'Conference' column

//         if (!conferencesByDivision[division]) {
//             conferencesByDivision[division] = new Set();
//         }
//         conferencesByDivision[division].add(conference);
//     });

//     return conferencesByDivision;
// }

// // Update the conference dropdown based on the selected division
// function updateConferenceDropdown(conferencesByDivision, selectedDivision) {
//     const conferenceDropdown = document.getElementById('conference-dropdown');

//     // Clear the current options
//     conferenceDropdown.innerHTML = '<option value="">Select Conference</option>';

//     if (selectedDivision && conferencesByDivision[selectedDivision]) {
//         const relevantConferences = Array.from(conferencesByDivision[selectedDivision]);

//         relevantConferences.forEach(conference => {
//             const option = document.createElement('option');
//             option.value = conference;
//             option.textContent = conference;
//             conferenceDropdown.appendChild(option);
//         });
//     }
// }

// // Filtering data by conference and division
// function filterData(headers, rows, selectedConference, selectedDivision) {
//     let filteredRows = rows;

//     if (selectedConference) {
//         filteredRows = filteredRows.filter(row => {
//             const rowData = parseCSVRow(row);
//             const conference = rowData[1];
//             return conference === selectedConference;
//         });
//     }

//     if (selectedDivision) {
//         filteredRows = filteredRows.filter(row => {
//             const rowData = parseCSVRow(row);
//             const division = rowData[6];
//             return division === selectedDivision;
//         });
//     }

//     // Recreate the table with filtered data
//     createTable(headers, filteredRows);
// }

// function createTable(headers, rows) {
//     const tabPanel = document.getElementById('teams-tab-panel');
//     const container = document.createElement('div');
//     container.style.display = 'flex';
//     container.style.flexDirection = 'column';
//     container.style.height = '100%';

//     const heading = tabPanel.querySelector('h1');
//     if (heading) {
//         container.appendChild(heading);
//     }

//     const tableContainer = document.createElement('div');
//     tableContainer.className = 'table-container';
//     tableContainer.style.overflowY = 'auto';
//     tableContainer.style.overflowX = 'auto';
//     tableContainer.style.width = 'auto';
//     tableContainer.style.height = '600px';
//     tableContainer.style.overflow = 'scroll';
//     tableContainer.style.fontSize = '13px';

//     const table = document.createElement('table');
//     table.style.borderCollapse = 'collapse';
//     table.style.width = '100%';
//     table.border = '1';

//     const tableHeader = document.createElement('thead');
//     const headerRow = document.createElement('tr');
//     headerRow.style.background = '#eee';
//     headers.forEach(headerText => {
//         const headerElement = document.createElement('th');
//         headerElement.textContent = headerText;
//         headerElement.style.background = '#333';
//         headerElement.style.color = 'white';
//         headerElement.style.padding = '6px';
//         headerElement.style.border = '1px solid #ccc';
//         headerElement.style.textAlign = 'center';
//         headerElement.style.position = 'sticky';
//         headerElement.style.top = '0';
//         headerElement.style.zIndex = '1';
//         headerRow.appendChild(headerElement);
//     });

//     tableHeader.appendChild(headerRow);

//     const tableBody = document.createElement('tbody');
//     rows.forEach(row => {
//         if (row.trim() === '') return;
//         const rowData = parseCSVRow(row);
//         const rowElement = document.createElement('tr');
//         rowData.forEach((cell, index) => {
//             const cellElement = document.createElement('td');
//             if (headers[index] === 'School URL' || headers[index] === 'Athletics URL') {
//                 const link = document.createElement('a');
//                 link.href = ensureProtocol(cell);
//                 link.textContent = cell;
//                 link.target = '_blank';
//                 link.rel = 'noopener noreferrer';
//                 cellElement.appendChild(link);
//             } else {
//                 cellElement.textContent = cell;
//             }
//             cellElement.style.padding = '4px';
//             cellElement.style.textAlign = 'left';
//             cellElement.style.whiteSpace = 'nowrap';
//             rowElement.appendChild(cellElement);
//         });
//         tableBody.appendChild(rowElement);
//     });

//     table.appendChild(tableHeader);
//     table.appendChild(tableBody);
//     tableContainer.appendChild(table);
//     container.appendChild(tableContainer);

//     tabPanel.innerHTML = ''; // Clear the previous content
//     tabPanel.appendChild(container);
// }

// function ensureProtocol(url) {
//     if (url.startsWith('http://') || url.startsWith('https://')) {
//         return url;
//     }
//     return 'https://' + url;
// }

// function parseCSVRow(row) {
//     const result = [];
//     let startValueIndex = 0;
//     let inQuotes = false;

//     for (let i = 0; i < row.length; i++) {
//         if (row[i] === '"') {
//             inQuotes = !inQuotes;
//         } else if (row[i] === ',' && !inQuotes) {
//             result.push(row.slice(startValueIndex, i).replace(/^"|"$/g, '').trim());
//             startValueIndex = i + 1;
//         }
//     }

//     result.push(row.slice(startValueIndex).replace(/^"|"$/g, '').trim());
//     return result;
// }
