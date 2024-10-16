import { dropdownSelections, tableCreation, setupConferenceFilterResults, setupTeamFilterResults, tableResultsData, addDateFilterListeners } from './utils.js';

let allResultRows = [];

export function loadResultsContent() {
    const dropdowns = [
        { id: 'conference-results', label: 'Select a Conference' },
        { id: 'teams-results', label: 'Select a Team' }
    ];

    const resultsContent = document.getElementById('results');
    if (resultsContent) {
        // Create dropdowns
        const dropdownsHtml = dropdownSelections("Results 2024", dropdowns, true);

        // Create table
        const tableId = 'resultsTable';
        const headers = [
            { columnName: 'Date' },
            { columnName: 'Match' },
            { columnName: 'Results' },
            { columnName: 'Box Score URL' }
        ];
        const tableHtml = tableCreation(tableId, headers);

        // Combine dropdowns and table
        resultsContent.innerHTML = `
            ${dropdownsHtml}
            <div class="table-responsive" style="overflow-x: auto">
                ${tableHtml}
            </div>
        `;

        // Load table data
        const schedulesCsvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/test_sch.csv';
        const teamsCsvUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/main/data/teams2.csv';

        tableResultsData(schedulesCsvUrl, tableId, 3)
            .then(rows => {
                allResultRows = rows;
                setupConferenceFilterResults('conference-results', allResultRows, 1, teamsCsvUrl);
                setupTeamFilterResults('teams-results', allResultRows, 1);

                // Add event listeners for date filtering
                addDateFilterListeners(allResultRows, tableId);
            })
            .catch(error => console.error("Error loading data:", error));
    }
}

