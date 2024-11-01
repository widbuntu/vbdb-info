import { dropdownSelections, tableCreation, tableData } from './utils.js';

let allRankingRows = [];
let currentSortColumn = -1;
let currentSortDirection = 'asc';

function setupConferenceRankingsFilter(id, allTeamRows) {
    const conferenceDropdown = document.getElementById(`${id}-dropdown`);
    
    if (conferenceDropdown) {
        // Function to handle filtering
        conferenceDropdown.addEventListener('change', function() {
            const selectedConference = this.value;
            
            allTeamRows.forEach(row => {
                // Conference is in the 4th column (index 4)
                if (selectedConference === '' || row.cells[4].textContent.trim() === selectedConference) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // Populate conference dropdown from actual data
        const conferences = new Set();
        allTeamRows.forEach(row => {
            const conf = row.cells[4].textContent.trim();
            if (conf) conferences.add(conf);
        });

        conferenceDropdown.innerHTML = '<option value="">All Conferences</option>';
        Array.from(conferences).sort().forEach(conference => {
            const option = document.createElement('option');
            option.value = conference;
            option.textContent = conference;
            conferenceDropdown.appendChild(option);
        });
    }
}

export function loadRankingsContent() {
    const dropdowns = [
        { id: 'conference-rankings', label: 'All Conferences' }
    ];
    
    const rankingsContent = document.getElementById('rankings');
    if (rankingsContent) {
        // Create dropdowns and table
        const dropdownsHtml = dropdownSelections("D-I Rankings", dropdowns);
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
        
        rankingsContent.innerHTML = `
            ${dropdownsHtml}
            <div class="table-responsive">
                ${tableCreation(tableId, headers)}
            </div>
        `;

        // Load and process CSV data
        fetch('https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/fig_stats.csv')
            .then(response => response.text())
            .then(csv => {
                const rows = csv.split('\n').slice(1); // Skip header row
                const tbody = document.querySelector('#rankingsTable tbody');
                
                rows.forEach(row => {
                    if (row.trim()) {
                        const cols = row.split(',');
                        const tr = document.createElement('tr');
                        
                        // Map CSV columns to table columns
                        const rowData = [
                            cols[0],  // Team
                            cols[1],  // W
                            cols[2],  // L
                            cols[3],  // ConfRec
                            cols[4],  // Conf
                            cols[5],  // FigStats RPI
                            cols[6]   // NCAA Rank
                        ];

                        rowData.forEach(cell => {
                            const td = document.createElement('td');
                            td.textContent = cell.replace(/"/g, '').trim();
                            tr.appendChild(td);
                        });
                        
                        tbody.appendChild(tr);
                        allRankingRows.push(tr);
                    }
                });
                
                setupConferenceRankingsFilter('conference-rankings', allRankingRows);
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
        header.addEventListener('click', () => sortTable(index));
        header.style.cursor = 'pointer';
    });
}

function sortTable(columnIndex) {
    const table = document.getElementById('rankingsTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    if (columnIndex === currentSortColumn) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortDirection = 'asc';
    }
    currentSortColumn = columnIndex;

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        if (columnIndex === 0) { // Team name column
            return currentSortDirection === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        } else { // Numeric columns
            const aNum = parseFloat(aValue) || 0;
            const bNum = parseFloat(bValue) || 0;
            return currentSortDirection === 'asc'
                ? aNum - bNum
                : bNum - aNum;
        }
    });

    rows.forEach(row => tbody.appendChild(row));
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