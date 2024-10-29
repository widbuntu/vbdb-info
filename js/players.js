import { dropdownSelections, tableCreation, tableData, setupConferenceFilter } from './utils.js';

let allPlayerRows = [];
let allTeams = [];
let currentSortColumn = -1;
let currentSortDirection = 'asc';

export function loadPlayersContent() {
    const dropdowns = [
        { id: 'conference-players', label: 'All Conferences' },
        { id: 'team-players', label: 'All Teams' },
        { id: 'class-players', label: "All Class's" },
        { id: 'position-players', label: 'All Positions' },
        { id: 'hometown-players', label: 'All Hometowns' },
    ];

    const playersContent = document.getElementById('players');
    if (playersContent) {
        // Create dropdowns
        const dropdownsHtml = dropdownSelections("Players 2024", dropdowns);

        // Create table
        const tableId = 'playersTable';
        const headers = [
            { columnName: 'Number' },
            { columnName: 'Player' },
            { columnName: 'Class' },
            { columnName: 'Position' },
            { columnName: 'Height' },
            { columnName: 'Hometown' },
            { columnName: 'High School' },
            { columnName: 'Conference' },
            { columnName: 'Team' },
        ];
        const tableHtml = tableCreation(tableId, headers);

        // Combine dropdowns and table
        playersContent.innerHTML = `
            ${dropdownsHtml}
            <div class="table-responsive" style="overflow-x: auto">
                ${tableHtml}
            </div>
        `;

        // Load table data
        const csvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/players.csv';
        tableData(csvUrl, tableId)
            .then(rows => {
                allPlayerRows = rows;
                setupConferenceFilter('conference-players', allPlayerRows, 7, updateTeamDropdown);
                setupTeamFilter('team-players', allPlayerRows);
                setupFilter('position-players', allPlayerRows, 3);
                setupFilter('class-players', allPlayerRows, 2);
                setupHometownFilter('hometown-players', allPlayerRows, 5);
                setupHeaderSorting();
                sortTable();
                setupCombinedFiltering();
            })
            .catch(error => console.error("Error loading player data:", error));
    }
}

function setupHeaderSorting() {
    const table = document.getElementById('playersTable');
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            if (currentSortColumn === index) {
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortColumn = index;
                currentSortDirection = 'asc';
            }
            sortTable();
            updateSortIndicators(headers);
        });
    });
}

function updateSortIndicators(headers) {
    headers.forEach((header, index) => {
        header.classList.remove('sort-asc', 'sort-desc');
        if (index === currentSortColumn) {
            header.classList.add(currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        }
    });
}

function sortTable() {
    const table = document.getElementById('playersTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        if (currentSortColumn === -1) {
            // Default sort by conference, then team, then number
            const conferenceA = a.cells[7].textContent;
            const conferenceB = b.cells[7].textContent;
            if (conferenceA !== conferenceB) return conferenceA.localeCompare(conferenceB);

            const teamA = a.cells[8].textContent;
            const teamB = b.cells[8].textContent;
            if (teamA !== teamB) return teamA.localeCompare(teamB);

            const numberA = parseInt(a.cells[0].textContent, 10);
            const numberB = parseInt(b.cells[0].textContent, 10);
            return numberA - numberB;
        } else {
            const cellA = a.cells[currentSortColumn].textContent;
            const cellB = b.cells[currentSortColumn].textContent;

            if (currentSortColumn === 0) {
                // Sort numerically for 'Number' column
                return (parseInt(cellA, 10) - parseInt(cellB, 10)) * (currentSortDirection === 'asc' ? 1 : -1);
            } else if (currentSortColumn === 4) {
                // Sort numerically for 'Height' column
                const heightA = parseHeight(cellA);
                const heightB = parseHeight(cellB);
                return (heightA - heightB) * (currentSortDirection === 'asc' ? 1 : -1);
            } else {
                // Sort alphabetically for other columns
                return cellA.localeCompare(cellB) * (currentSortDirection === 'asc' ? 1 : -1);
            }
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}

function parseHeight(height) {
    const parts = height.split('-');
    if (parts.length === 2) {
        return parseInt(parts[0], 10) * 12 + parseInt(parts[1], 10);
    }
    return 0;
}

function setupCombinedFiltering() {
    const conferenceDropdown = document.getElementById('conference-players-dropdown');
    const teamDropdown = document.getElementById('team-players-dropdown');
    const classDropdown = document.getElementById('class-players-dropdown');
    const positionDropdown = document.getElementById('position-players-dropdown');
    const hometownDropdown = document.getElementById('hometown-players-dropdown');

    [conferenceDropdown, teamDropdown, classDropdown, positionDropdown, hometownDropdown].forEach(dropdown => {
        dropdown.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const selectedConference = document.getElementById('conference-players-dropdown').value;
    const selectedTeam = document.getElementById('team-players-dropdown').value;
    const selectedClass = document.getElementById('class-players-dropdown').value;
    const selectedPosition = document.getElementById('position-players-dropdown').value;
    const selectedHometown = document.getElementById('hometown-players-dropdown').value;

    allPlayerRows.forEach(row => {
        const conferenceMatch = selectedConference === '' || row.cells[7].textContent === selectedConference;
        const teamMatch = selectedTeam === '' || row.cells[8].textContent === selectedTeam;
        const classMatch = selectedClass === '' || row.cells[2].textContent === selectedClass;
        const positionMatch = selectedPosition === '' || row.cells[3].textContent === selectedPosition;
        const hometownMatch = selectedHometown === '' || row.cells[5].textContent.includes(selectedHometown);

        if (conferenceMatch && teamMatch && positionMatch && classMatch && hometownMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function updateTeamDropdown() {
    const conferenceDropdown = document.getElementById('conference-players-dropdown');
    const teamDropdown = document.getElementById('team-players-dropdown');
    const selectedConference = conferenceDropdown.value;

    // Clear existing options
    teamDropdown.innerHTML = '<option value="">All Teams</option>';

    // Filter teams based on selected conference
    const filteredTeams = allTeams.filter(team =>
        selectedConference === '' || team.conference === selectedConference
    );

    // Add filtered teams to dropdown
    filteredTeams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.name;
        option.textContent = team.name;
        teamDropdown.appendChild(option);
    });

    // Reapply filters after updating team dropdown
    applyFilters();
}

function setupTeamFilter(id, allTeamRows) {
    const teamDropdown = document.getElementById(`${id}-dropdown`);

    if (teamDropdown) {
        // Populate team dropdown with unique values
        const uniqueTeams = new Map();
        allTeamRows.forEach(row => {
            const teamName = row.cells[8].textContent.trim();
            const conference = row.cells[7].textContent.trim();
            if (teamName !== '') {
                uniqueTeams.set(teamName, { name: teamName, conference: conference });
            }
        });

        allTeams = Array.from(uniqueTeams.values());
        allTeams.sort((a, b) => a.name.localeCompare(b.name));

        allTeams.forEach(team => {
            const option = document.createElement('option');
            option.value = team.name;
            option.textContent = team.name;
            teamDropdown.appendChild(option);
        });
    }
}

function setupFilter(id, allRows, columnIndex) {
    const dropdown = document.getElementById(`${id}-dropdown`);

    if (dropdown) {
        // Create a Set to store unique values from the specified column
        const uniqueValues = new Set();
        
        allRows.forEach(row => {
            const value = row.cells[columnIndex].textContent.trim();
            if (value !== '') {
                uniqueValues.add(value); // Only add unique values
            }
        });

        // Convert the set to an array and sort the values alphabetically
        const sortedValues = Array.from(uniqueValues).sort((a, b) => a.localeCompare(b));

        // Populate the dropdown with unique sorted values
        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            dropdown.appendChild(option);
        });
    }
}


function setupHometownFilter(id, allRows, columnIndex) {
    const dropdown = document.getElementById(`${id}-dropdown`);
    if (dropdown) {
        // Create a Set to store unique values from the specified column
        const uniqueValues = new Set();
       
        allRows.forEach(row => {
            const cellContent = row.cells[columnIndex].textContent.trim();
            const value = cellContent.split(",")[1]; // Get the second part of the split
            if (value && value.trim() !== '') {
                uniqueValues.add(value.trim()); // Only add unique, non-empty values
            }
        });
        // Convert the set to an array and sort the values alphabetically
        const sortedValues = Array.from(uniqueValues).sort((a, b) => a.localeCompare(b));
        // Populate the dropdown with unique sorted values
        sortedValues.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            dropdown.appendChild(option);
        });
    }
}