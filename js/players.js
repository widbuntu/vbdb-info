import { dropdownSelections, tableCreation, tableData, setupConferenceFilter } from './utils.js';

let allPlayerRows = [];
let allTeams = [];

export function loadPlayersContent() {
    const dropdowns = [
        { id: 'conference-players', label: 'Select a Conference' },
        { id: 'team-players', label: 'Select a Team' }
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
                sortTable();
            })
            .catch(error => console.error("Error loading player data:", error));
    }
}

function sortTable() {
    const table = document.getElementById('playersTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        const conferenceA = a.cells[7].textContent;
        const conferenceB = b.cells[7].textContent;
        if (conferenceA !== conferenceB) return conferenceA.localeCompare(conferenceB);

        const teamA = a.cells[8].textContent;
        const teamB = b.cells[8].textContent;
        if (teamA !== teamB) return teamA.localeCompare(teamB);

        const numberA = parseInt(a.cells[0].textContent, 10);
        const numberB = parseInt(b.cells[0].textContent, 10);
        return numberA - numberB;
    });

    rows.forEach(row => tbody.appendChild(row));
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

        // Add event listener for filtering
        teamDropdown.addEventListener('change', function () {
            const selectedTeam = this.value;
            allTeamRows.forEach(row => {
                if (selectedTeam === '' || row.cells[index].textContent === selectedTeam) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}