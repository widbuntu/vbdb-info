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

export function tableData(url, id, urlIndex = false) {
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
                    rowData.forEach((cell, index) => {
                        const cellElement = document.createElement("td");
                        cell = cell.trim().replace(/^"|"$/g, "");
                        // If the cell is the URL column, add http if necessary
                        if (index === urlIndex) {
                            cellElement.innerHTML = `<a href="${ensureProtocol(
                                cell
                            )}" target="_blank">${cell}</a>`;
                        } else {
                            cellElement.textContent = cell;
                        }
                        tr.appendChild(cellElement);
                    });
                    tbody.appendChild(tr);
                    allTeamRows.push(tr);
                }
            });
            return allTeamRows;
        });
}

export function tableResultsData(url, id, urlIndex = false) {
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
                    rowData.forEach((cell, index) => {
                        const cellElement = document.createElement("td");
                        cell = cell.trim().replace(/^"|"$/g, "");

                        // If the cell is the URL column, add http if necessary
                        if (index === urlIndex) {
                            cellElement.innerHTML = `<a href="${ensureProtocol(cell)}" target="_blank">${cell}</a>`;
                        } else {
                            // Format match results if it's the match column
                            if (index === 1) {
                                const { winner, matchHTML } = formatMatch(cell, rowData[2]); // Assuming rowData[2] has results
                                cellElement.innerHTML = matchHTML;
                            } else {
                                cellElement.textContent = cell;
                            }
                        }
                        tr.appendChild(cellElement);
                    });
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

export function setupConferenceFilter(id, allTeamRows, index, callback) {
    const conferenceDropdown = document.getElementById(`${id}-dropdown`);

    if (conferenceDropdown) {
        // Populate conference dropdown
        const conferences = new Set();
        allTeamRows.forEach(row => {
            const conferenceValue = row.cells[index].textContent.trim();
            if (conferenceValue !== '') {
                conferences.add(conferenceValue);
            }
        });

        const sortedConferences = Array.from(conferences).sort();

        // Clear existing options
        conferenceDropdown.innerHTML = '<option value="">All Conferences</option>';

        sortedConferences.forEach(conference => {
            const option = document.createElement('option');
            option.value = conference;
            option.textContent = conference;
            conferenceDropdown.appendChild(option);
        });

        // Add event listener for filtering
        conferenceDropdown.addEventListener('change', function () {
            const selectedConference = this.value;
            allTeamRows.forEach(row => {
                if (selectedConference === '' || row.cells[index].textContent.trim() === selectedConference) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });

            // Call the callback function if provided
            if (typeof callback === 'function') {
                callback();
            }
        });
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
        conferenceDropdown.innerHTML = '<option value="">Select a Conference</option>';
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
    teamDropdown.innerHTML = '<option value="">Select a Team</option>';

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
