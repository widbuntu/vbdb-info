export function urlLink(label, url) {
    return `
    <p class="text-center"><a style="color: white; text-decoration: underline" target="_blank"
        href=${url}>${label}</a>
    </p>
    `;
}

export function dropdownSelections(label, dropdowns, resultsTab = false) {
    if (resultsTab != true) {
        return `
        <h2 class="text-center">${label}</h2>
            <div class="container-fluid">
                <div class="row">
                    ${dropdowns.map(dropdown => `
                    <div class="col-auto mb-3">
                        <select class="form-select form-select-sm" name="${dropdown.id}-dropdown"
                            id="${dropdown.id}-dropdown">
                            <option value>${dropdown.label}</option>
                        </select>
                    </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    if (resultsTab != false) {
        return `
        <h2 class="text-center">${label}</h2>
            <div class="container-fluid">
                <div class="row">
                    ${dropdowns.map(dropdown => `
                    <div class="col-auto mb-3">
                        <select class="form-select form-select-sm" name="${dropdown.id}-dropdown"
                            id="${dropdown.id}-dropdown">
                            <option value>${dropdown.label}</option>
                        </select>
                    </div>
                    `).join('')}
                    <div class="col-auto mb-3">
                        <input id="startDate" class="form-control form-select-sm" type="date" />
                        <span id="startDateSelected"></span>
                    </div>
                    <div class="col-auto mb-3">
                        <input id="endDate" class="form-control form-select-sm" type="date" />
                        <span id="endDateSelected"></span>
                    </div>
                </div>
            </div>
        `;

    };
}

export function tableCreation(id, headers) {
    return `
        <table id="${id}" class="table table-dark table-hover table-striped">
            <thead>
                <tr>
                    ${headers.map(header => `<th>${header.columnName}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
}

export function splitLine(line) {
    const result = [];
    let currentField = "";
    let inQuotes = false;

    for (let char of line) {
        if (char === '"') {
            inQuotes = !inQuotes; // Toggle quote state
        } else if (char === "," && !inQuotes) {
            result.push(currentField.trim()); // Push field and reset
            currentField = "";
        } else {
            currentField += char; // Accumulate characters in current field
        }
    }

    result.push(currentField.trim()); // Push the last field
    return result;
}

let indexedRows = {};

export function tableData(url, id, urlIndex = false) {
    return fetch(url)
        .then((response) => response.text())
        .then((csvData) => {
            const rows = csvData.split("\n").filter((row) => row.trim() !== "");
            const table = document.getElementById(id);
            const tbody = table.querySelector("tbody");
            const allTeamRows = [];

            rows.slice(1).forEach((row) => {
                const rowData = splitLine(row);
                const selectedColumns = [rowData[1], rowData[10], rowData[4], rowData[3], rowData[7]];
                if (selectedColumns && selectedColumns.length) {
                    const tr = document.createElement("tr");
                    selectedColumns.forEach((cell, index) => {
                        const cellElement = document.createElement("td");
                        cell = cell.trim().replace(/^"|"$/g, "");
                        if (index === urlIndex) {
                            cellElement.innerHTML = `<a href="${ensureProtocol(cell)}" target="_blank">${cell}</a>`;
                        } else {
                            cellElement.textContent = cell;
                        }
                        tr.appendChild(cellElement);
                    });
                    tbody.appendChild(tr);
                    allTeamRows.push(tr);

                    // Index rows by division and conference
                    const division = rowData[4].trim();
                    const conference = rowData[1].trim();

                    if (!indexedRows[division]) indexedRows[division] = {};
                    if (!indexedRows[division][conference]) indexedRows[division][conference] = [];
                    indexedRows[division][conference].push(tr);
                }
            });

            return allTeamRows;
        });
}

export function tableResultsData(url, id, urlIndex = 3) {
    return fetch(url)
        .then((response) => response.text())
        .then((csvData) => {
            const rows = csvData.split("\n").filter((row) => row.trim() !== "");
            const table = document.getElementById(id);
            const tbody = table.querySelector("tbody");
            const allTeamRows = [];

            // Process the rest of the rows as data
            rows.slice(1).forEach((row) => {
                const rowData = splitLine(row);
                if (rowData && rowData.length) {
                    const tr = document.createElement("tr");
            
                    // Create a cell for the date (index 0)
                    const dateCell = document.createElement("td");
                    dateCell.textContent = rowData[0].trim();
                    tr.appendChild(dateCell);
            
                    // Create a cell for the match (index 1)
                    const matchCell = document.createElement("td");
                    matchCell.style.width = "35%";
                    const results = rowData[2].trim(); // Results from the CSV
                    const boxScoreUrl = rowData[urlIndex].trim(); // Box score URL
                    const { matchHTML } = formatMatch(rowData[1].trim(), results);
                    matchCell.innerHTML = matchHTML; // Set match HTML
                    tr.appendChild(matchCell);
            
                    // Create a cell for the results (index 2)
                    const viewCell = document.createElement("td");
                    viewCell.innerHTML = `${results} <a href="${boxScoreUrl}" target="_blank">View</a>`;
                    tr.appendChild(viewCell);
            
                    // Append the row to the tbody
                    tbody.appendChild(tr);
                    allTeamRows.push(tr);
                }
            });
            
            return allTeamRows;
        });
}

// Function to format match results
function formatMatch(match, results) {
    const setWins = results.match(/\[(\d+)-(\d+)\]/); // Extract set wins like [3-0] or [2-3]
    if (!setWins) return { winner: "", matchHTML: match }; // If results are not formatted as expected, return the match as is

    const team1SetWins = parseInt(setWins[1]);
    const team2SetWins = parseInt(setWins[2]);

    const [team1, team2] = match.split(" vs "); // Split the teams

    let winner, matchHTML;

    if (team1SetWins > team2SetWins) {
        // Team 1 is the winner
        winner = team1.trim();
        matchHTML = `<strong class="text-info" style="--bs-text-opacity: .75;">${team1.trim()}</strong> vs ${team2.trim()}`;
    } else {
        // Team 2 is the winner
        winner = team2.trim();
        matchHTML = `${team1.trim()} vs <strong class="text-info" style="--bs-text-opacity: .75;">${team2.trim()}</strong>`;
    }

    return { winner, matchHTML };
}

export function ensureProtocol(url) {
    if (!/^https?:\/\//i.test(url)) {
        return "http://" + url;
    }
    return url;
}

export function setupDivisionFilter(id, allTeamRows, index, callback) {
    const divisionDropdown = document.getElementById(`${id}-dropdown`);

    if (divisionDropdown) {
        // Add hard-coded divisions: D-I, D-II, D-III
        const divisions = ["D-I", "D-II", "D-III"];

        // Clear existing options and add new ones
        divisionDropdown.innerHTML = '<option value="">All Divisions</option>';
        divisions.forEach(division => {
            const option = document.createElement('option');
            option.value = division;
            option.textContent = division;
            divisionDropdown.appendChild(option);
        });

        // Add event listener to update the conference dropdown based on the selected division
        divisionDropdown.addEventListener('change', function () {
            const selectedDivision = this.value;
            allTeamRows.forEach(row => {
                if (selectedDivision === '' || row.cells[index].textContent.trim() === selectedDivision) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });

            // Call the callback function if provided to update the conference filter
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
}

export function setupConferenceFilter(id, allTeamRows, index, callback) {
    const conferenceDropdown = document.getElementById(`${id}-dropdown`);
    const divisionDropdown = document.getElementById('division-teams-dropdown');

    if (conferenceDropdown) {
        conferenceDropdown.addEventListener('change', function () {
            const selectedConference = this.value;
            allTeamRows.forEach(row => {
                const rowDivision = row.cells[4].textContent.trim();
                const selectedDivision = divisionDropdown.value;

                // Show/hide row based on both conference and division selections
                if (
                    (selectedConference === '' || row.cells[index].textContent.trim() === selectedConference) &&
                    (selectedDivision === '' || rowDivision === selectedDivision)
                ) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // Populate conference dropdown based on the selected division
        const populateConferences = () => {
            const selectedDivision = divisionDropdown.value;
            const conferences = new Set();

            allTeamRows.forEach(row => {
                const rowDivision = row.cells[4].textContent.trim();
                const conferenceValue = row.cells[index].textContent.trim();

                if ((selectedDivision === '' || rowDivision === selectedDivision) && conferenceValue !== '') {
                    conferences.add(conferenceValue);
                }
            });

            // Clear existing options and add new filtered options
            conferenceDropdown.innerHTML = '<option value="">All Conferences</option>';
            Array.from(conferences).sort().forEach(conference => {
                const option = document.createElement('option');
                option.value = conference;
                option.textContent = conference;
                conferenceDropdown.appendChild(option);
            });
        };

        // Populate conferences initially and whenever the division changes
        populateConferences();
        divisionDropdown.addEventListener('change', populateConferences);
    }
}

let teamsData = [];

export async function setupConferenceFilterResults(id, allTeamRows, matchIndex, csvUrl) {
    const conferenceDropdown = document.getElementById(`${id}-dropdown`);
    const teamDropdown = document.getElementById('teams-results-dropdown');

    if (conferenceDropdown && teamDropdown) {
        // Load teams data
        teamsData = await extractTeamsFromCSV(csvUrl);

        // Populate conference dropdown
        const conferences = [
            'A-10', 'AAC', 'ACC', 'AE', 'ASUN', 'BE', 'BSC', 'BWC', 'Big 12', 'Big Ten',
            'C-USA', 'CAA', 'HL', 'Ivy', 'MAAC', 'MAC', 'MEAC', 'MVC', 'MW', 'NEC', 'OVC',
            'PL', 'Pac-12', 'SBC', 'SEC', 'SLC', 'SWAC', 'SoCon', 'Summit', 'WAC', 'WCC'
        ];
        conferenceDropdown.innerHTML = '<option value="">All Conferences</option>';
        conferences.sort().forEach(conf => {
            const option = document.createElement('option');
            option.value = conf;
            option.textContent = conf;
            conferenceDropdown.appendChild(option);
        });

        // Add event listener for filtering
        conferenceDropdown.addEventListener('change', function () {
            const selectedConference = this.value;
            updateTeamDropdown(teamDropdown, selectedConference);
            filterRows(allTeamRows, matchIndex, selectedConference, '');
        });
    }
}

export function setupTeamFilterResults(id, allTeamRows, matchIndex) {
    const teamDropdown = document.getElementById(`${id}-dropdown`);

    if (teamDropdown) {
        // Add event listener for team filtering
        teamDropdown.addEventListener('change', function () {
            const selectedTeam = this.value;
            const selectedConference = document.getElementById('conference-results-dropdown').value;
            filterRows(allTeamRows, matchIndex, selectedConference, selectedTeam);
        });
    }
}

function updateTeamDropdown(teamDropdown, selectedConference) {
    // Clear the team dropdown
    teamDropdown.innerHTML = '<option value="">All Teams</option>';

    // Filter teams by selected conference
    const filteredTeams = teamsData.filter(team => team.conference_short === selectedConference);

    // Use a Set to keep unique team_short values
    const uniqueTeams = new Set(filteredTeams.map(team => team.team_short));

    // Sort and populate the team dropdown with unique team_short values
    Array.from(uniqueTeams).sort().forEach(teamShort => {
        const option = document.createElement('option');
        option.value = teamShort;
        option.textContent = teamShort;
        teamDropdown.appendChild(option);
    });
}

function filterRows(allTeamRows, matchIndex, selectedConference, selectedTeam) {
    allTeamRows.forEach(row => {
        const matchText = row.cells[matchIndex].textContent;
        const showRow = (selectedConference === '' || matchText.includes(selectedConference)) &&
            (selectedTeam === '' || matchText.includes(selectedTeam));
        row.style.display = showRow ? '' : 'none';
    });
}

async function extractTeamsFromCSV(csvUrl) {
    const response = await fetch(csvUrl);
    const data = await response.text();
    const rows = data.split('\n').slice(1);

    return rows.map(row => {
        const [team_id, conference_short, conference_name, team_name, division, team_short] = splitLine(row);
        return { team_id, conference_short, conference_name, team_name, division, team_short };
    });
}

export function addDateFilterListeners(allResultRows, tableId) {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    startDateInput.value = "2024-08-15";
    endDateInput.value = "2024-12-15"; 

    const filterResults = () => {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        
        // Clear the table body
        const table = document.getElementById(tableId);
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        // Filter rows based on the date range
        const filteredRows = allResultRows.filter(row => {
            const rowDate = new Date(row.cells[0].textContent); // Assuming the date is in the first column
            return rowDate >= startDate && rowDate <= endDate;
        });

        // Append filtered rows to the table
        filteredRows.forEach(row => tbody.appendChild(row));
    };

    // Attach event listeners to the date inputs
    startDateInput.addEventListener('change', filterResults);
    endDateInput.addEventListener('change', filterResults);
}
