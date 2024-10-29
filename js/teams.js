import { dropdownSelections, tableCreation, tableData, setupConferenceFilter, setupDivisionFilter } from './utils.js';

let allTeamRows = [];

export function loadTeamsContent() {
    const dropdowns = [
        { id: 'division-teams', label: 'Select a Division' },
        { id: 'conference-teams', label: 'All Conferences' }
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
            { columnName: 'Div' },
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
        const csvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/teams2.csv';
        tableData(csvUrl, tableId, 5)
            .then(rows => {
                allTeamRows = rows;

                // Set up division and conference filters
                setupDivisionFilter('division-teams', allTeamRows, 4, () => {
                    setupConferenceFilter('conference-teams', allTeamRows, 1);
                });

                // Initial setup of conference filter
                setupConferenceFilter('conference-teams', allTeamRows, 1);
            })
            .catch(error => console.error("Error loading team data:", error));
    }
}