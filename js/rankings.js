import { dropdownSelections, tableCreation, tableData, setupConferenceFilter } from './utils.js';

let allRankingRows = [];
let currentSortColumn = -1;
let currentSortDirection = 'asc';

export function loadRankingsContent() {
    const dropdowns = [
        { id: 'conference-rankings', label: 'Select a Conference' }
    ];
   
    const rankingsContent = document.getElementById('rankings');
    if (rankingsContent) {
        // Create dropdowns
        const dropdownsHtml = dropdownSelections("Rankings", dropdowns);
       
        // Create table
        const tableId = 'rankingsTable';
        const headers = [
            { columnName: 'Team' },
            { columnName: 'W' },
            { columnName: 'L' },
            { columnName: 'ConfRec' },
            { columnName: 'Conf' },
            { columnName: 'FigStats RPI' },
            { columnName: 'NCAA Rank' }
        ];
        const tableHtml = tableCreation(tableId, headers);
       
        // Combine dropdowns and table
        rankingsContent.innerHTML = `
            ${dropdownsHtml}
            <div class="table-responsive" style="overflow-x: auto">
                ${tableHtml}
            </div>
        `;

        // Load table data
        const csvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/fig_stats.csv';
        tableData(csvUrl, tableId)
            .then(rows => {
                allRankingRows = rows;
                setupConferenceFilter('conference-rankings', allRankingRows, 4);
                setupSorting(tableId);
                sortTable(5); // Initially sort by FigStats RPI
            })
            .catch(error => console.error("Error loading ranking data:", error));
    }
}

function setupSorting(tableId) {
    const table = document.getElementById(tableId);
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(index);
        });
        header.style.cursor = 'pointer';
    });
}

function sortTable(columnIndex) {
    const table = document.getElementById('rankingsTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Toggle sort direction if clicking the same column
    if (columnIndex === currentSortColumn) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortDirection = 'asc';
    }
    currentSortColumn = columnIndex;

    // Sort the rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();

        if (columnIndex === 0) {  // Team column
            return currentSortDirection === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        } else {  // Numeric columns
            const aNum = parseFloat(aValue) || 0;
            const bNum = parseFloat(bValue) || 0;
            return currentSortDirection === 'asc' 
                ? aNum - bNum
                : bNum - aNum;
        }
    });

    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));

    // Update sort indicators
    updateSortIndicators(table, columnIndex);
}

function updateSortIndicators(table, columnIndex) {
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        header.classList.remove('asc', 'desc');
        if (index === columnIndex) {
            header.classList.add(currentSortDirection);
        }
    });
}