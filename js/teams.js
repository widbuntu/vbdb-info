import { dropdownSelections, tableCreation, tableData, setupConferenceFilter } from './utils.js';

let allTeamRows = [];

export function loadTeamsContent() {
    const dropdowns = [
        { id: 'conference-teams', label: 'Select a Conference' }
    ];
   
    const teamsContent = document.getElementById('teams');
    if (teamsContent) {
        // Create dropdowns
        const dropdownsHtml = dropdownSelections("Teams 2024", dropdowns);
       
        // Create table
        const tableId = 'teamsTable';
        const headers = [
            { columnName: 'Team' },
            { columnName: 'Conference' },
            { columnName: 'School URL' },
            { columnName: 'Conference Full' },
            { columnName: 'Div' }
        ];
        const tableHtml = tableCreation(tableId, headers);
       
        // Combine dropdowns and table
        teamsContent.innerHTML = `
            ${dropdownsHtml}
            <div class="table-responsive" style="overflow-x: auto">
                ${tableHtml}
            </div>
        `;

        // Load table data
        const csvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/teams.csv';
        tableData(csvUrl, tableId, 2)
            .then(rows => {
                allTeamRows = rows;
                setupConferenceFilter('conference-teams', allTeamRows, 1);
            })
            .catch(error => console.error("Error loading team data:", error));
    }
}