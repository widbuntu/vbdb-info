import { dropdownSelections, tableCreation, tableData, setupConferenceFilter } from './utils.js';

let allPlayerRows = [];
let allTeams = [];
let currentSortColumn = -1;
let currentSortDirection = 'asc';

export function loadPlayersContent() {
    const dropdowns = [
        { id: 'conference-players', label: 'Select a Conference' },
        { id: 'team-players', label: 'Select a Team' },
        { id: 'position-players', label: 'Select a Position' }
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
                setupTeamFilter('team-players', allPlayerRows, 8);
                setupPositionFilter('position-players', allPlayerRows, 3);
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
    const positionDropdown = document.getElementById('position-players-dropdown');

    [conferenceDropdown, teamDropdown, positionDropdown].forEach(dropdown => {
        dropdown.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const selectedConference = document.getElementById('conference-players-dropdown').value;
    const selectedTeam = document.getElementById('team-players-dropdown').value;
    const selectedPosition = document.getElementById('position-players-dropdown').value;

    allPlayerRows.forEach(row => {
        const conferenceMatch = selectedConference === '' || row.cells[7].textContent === selectedConference;
        const teamMatch = selectedTeam === '' || row.cells[8].textContent === selectedTeam;
        const positionMatch = selectedPosition === '' || row.cells[3].textContent === selectedPosition;

        if (conferenceMatch && teamMatch && positionMatch) {
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

function setupTeamFilter(id, allTeamRows, index) {
    const teamDropdown = document.getElementById(`${id}-dropdown`);

    if (teamDropdown) {
        // Populate team dropdown with unique values
        const uniqueTeams = new Map();
        allTeamRows.forEach(row => {
            const teamName = row.cells[index].textContent.trim();
            const conference = row.cells[index - 1].textContent.trim();
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

function setupPositionFilter(id, allPlayerRows, index) {
    const positionDropdown = document.getElementById(`${id}-dropdown`);

    if (positionDropdown) {
        // Populate position dropdown with unique values
        const uniquePositions = new Set();
        allPlayerRows.forEach(row => {
            const position = row.cells[index].textContent.trim();
            if (position !== '') {
                uniquePositions.add(position);
            }
        });

        // Sort and add unique positions to the dropdown
        Array.from(uniquePositions).sort().forEach(position => {
            const option = document.createElement('option');
            option.value = position;
            option.textContent = position;
            positionDropdown.appendChild(option);
        });
    }
}