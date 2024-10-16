import { dropdownSelections, tableCreation } from './utils.js';

let allLiveData = [];
let fetchInterval;

export function loadLiveScores() {
    const dropdowns = [
        { id: 'conference-live', label: 'Select a Conference' }
    ];

    const liveContent = document.getElementById('live');
    if (liveContent) {
        // Create dropdowns
        const dropdownsHtml = dropdownSelections("Today's scores", dropdowns);

        // Create table
        const tableId = 'liveTable';
        const headers = [
            { columnName: 'Match' },
            { columnName: 'Results' }
        ];
        const tableHtml = tableCreation(tableId, headers);

        // Combine dropdowns and table
        liveContent.innerHTML = `
            ${dropdownsHtml}
            <div class="table-responsive" style="overflow-x: auto">
                ${tableHtml}
            </div>
        `;

        // Start fetching data
        startPeriodicFetch();

        // Add event listener to the dropdown
        document.getElementById('conference-live-dropdown').addEventListener('change', filterTable);
    }
}

function populateTable(data) {
    const tbody = document.querySelector("#liveTable tbody");
    tbody.innerHTML = "";
    data.forEach((row) => {
        const rowElement = document.createElement("tr");
        rowElement.innerHTML = `
            <td style="width:60%">${row.match.trim()}</td>
            <td style="width:40%">${row.results.trim()} <a href="${row.box_score_url.trim()}" target="_blank">View</a></td>
        `;
        tbody.appendChild(rowElement);
    });
}

function populateDropdown(data) {
    const dropdown = document.getElementById('conference-live-dropdown');
    const conferences = new Set();

    data.forEach(item => {
        const match = item.match;
        const conferenceRegex = /\(([^)]+)\)/g;
        let match_;
        while ((match_ = conferenceRegex.exec(match)) !== null) {
            conferences.add(match_[1].trim());
        }
    });
    const sortedConferences = Array.from(conferences).sort();

    dropdown.innerHTML = '<option value="">All Conferences</option>';

    sortedConferences.forEach(conference => {
        const option = document.createElement('option');
        option.value = conference;
        option.textContent = conference;
        dropdown.appendChild(option);
    });
}

function filterTable() {
    const selectedConference = document.getElementById('conference-live-dropdown').value;

    let filteredData;

    if (selectedConference === '') {
        filteredData = allLiveData;
    } else {
        filteredData = allLiveData.filter(item => {
            const matchConferenceRegex = /\(([^)]+)\)/g;
            let matchConference;
            while ((matchConference = matchConferenceRegex.exec(item.match)) !== null) {
                if (matchConference[1].trim().toLowerCase() === selectedConference.toLowerCase()) {
                    return true;
                }
            }
            return false;
        });
    }

    populateTable(filteredData);
}

function fetchDataAndPopulate() {
    // Capture the currently selected conference
    const selectedConference = document.getElementById('conference-live-dropdown').value;

    fetch('https://test-api-42b6a9daeff2.herokuapp.com/')
        .then(response => response.json())
        .then(data => {
            allLiveData = data.data;

            // Repopulate the table and dropdown
            populateTable(allLiveData);
            populateDropdown(allLiveData);

            // Reapply the filter
            document.getElementById('conference-live-dropdown').value = selectedConference;
            filterTable();

            console.log('Data refreshed at', new Date().toLocaleTimeString());
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const tableBody = document.querySelector('#liveTable tbody');
            tableBody.innerHTML = '<tr><td colspan="2">Error loading data. Please try again later.</td></tr>';
        });
}

function startPeriodicFetch() {
    fetchDataAndPopulate();
    fetchInterval = setInterval(fetchDataAndPopulate, 45000);
}

function stopPeriodicFetch() {
    clearInterval(fetchInterval);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopPeriodicFetch();
    } else {
        startPeriodicFetch();
    }
});
