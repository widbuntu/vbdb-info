export function loadResultsContent() {
    return `
<h2 class="text-center">Results 2024</h2>
            <ul class="nav nav-tabs" id="nav-items" role="tablist" style="display: flex; border-bottom: 1px solid #ccc;">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="done-tab" data-bs-toggle="tab" data-bs-target="#done" type="button" role="tab" aria-controls="done" aria-selected="true">D1</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="dtwo-tab" data-bs-toggle="tab" data-bs-target="#dtwo" type="button" role="tab" aria-controls="dtwo" aria-selected="false">D2</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="dthree-tab" data-bs-toggle="tab" data-bs-target="#dthree" type="button" role="tab" aria-controls="dthree" aria-selected="false">D3</button>
                </li>
            </ul>
            
            <div class="tab-content">

                <!-- D1 Tab Content -->
                <div class="tab-pane fade show active" id="done" role="tabpanel" aria-labelledby="done-tab">
                        <div class="container-fluid">
                            <div class="row">
            
                                <div class="col-auto mb-3">
                                    <select class="form-select form-select-sm" name="d1-conferences-results-dropdown"
                                        id="d1-conferences-results-dropdown">
                                        <option value="">All Conferences</option>
                                    </select>
                                </div>
            
                                <div class="col-auto mb-3">
                                    <select class="form-select form-select-sm" name="d1-teams-results-dropdown"
                                        id="d1-teams-results-dropdown">
                                        <option value="">All Teams</option>
                                    </select>
                                </div>
                                <div class="col-auto mb-3">
                                    <input id="d1-startDate" class="form-control form-select-sm" type="date" value="2024-08-15" />
                                    <span id="d1-startDateSelected"></span>
                                </div>
                                <div class="col-auto mb-3">
                                    <input id="d1-endDate" class="form-control form-select-sm" type="date" value="2024-12-15" />
                                    <span id="d1-endDateSelected"></span>
                                </div>
                            </div>
                        </div>
                    <div class="table-responsive" style="overflow-x: auto">
                        <table id="d1-resultsTable" class="table table-dark table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Match</th>
                                    <th>Results</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- D2 Tab Content -->
                <div class="tab-pane fade show" id="dtwo" role="tabpanel" aria-labelledby="dtwo-tab">
                    <div class="container-fluid">
                        <div class="row">
        
                            <div class="col-auto mb-3">
                                <select class="form-select form-select-sm" name="d2-conferences-results-dropdown"
                                    id="d2-conferences-results-dropdown">
                                    <option value="">All Conferences</option>
                                </select>
                            </div>
        
                            <div class="col-auto mb-3">
                                <select class="form-select form-select-sm" name="d2-teams-results-dropdown"
                                    id="d2-teams-results-dropdown">
                                    <option value="">All Teams</option>
                                </select>
                            </div>
                            <div class="col-auto mb-3">
                                <input id="d2-startDate" class="form-control form-select-sm" type="date" value="2024-08-15" />
                                <span id="d2-startDateSelected"></span>
                            </div>
                            <div class="col-auto mb-3">
                                <input id="d2-endDate" class="form-control form-select-sm" type="date" value="2024-12-15" />
                                <span id="d2-endDateSelected"></span>
                            </div>
                        </div>
                    </div>
                <div class="table-responsive" style="overflow-x: auto">
                    <table id="d2-resultsTable" class="table table-dark table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Match</th>
                                <th>Results</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                </div>

                <!-- D3 Tab Content -->
                <div class="tab-pane fade show" id="dthree" role="tabpanel" aria-labelledby="dthree-tab">
                    <div class="container-fluid">
                        <div class="row">
        
                            <div class="col-auto mb-3">
                                <select class="form-select form-select-sm" name="d3-conferences-results-dropdown"
                                    id="d3-conferences-results-dropdown">
                                    <option value="">All Conferences</option>
                                </select>
                            </div>
        
                            <div class="col-auto mb-3">
                                <select class="form-select form-select-sm" name="d3-teams-results-dropdown"
                                    id="d3-teams-results-dropdown">
                                    <option value="">All Teams</option>
                                </select>
                            </div>
                            <div class="col-auto mb-3">
                                <input id="d3-startDate" class="form-control form-select-sm" type="date" value="2024-08-15" />
                                <span id="startDateSelected"></span>
                            </div>
                            <div class="col-auto mb-3">
                                <input id="d3-endDate" class="form-control form-select-sm" type="date" value="2024-12-15" />
                                <span id="endDateSelected"></span>
                            </div>
                        </div>
                    </div>
                <div class="table-responsive" style="overflow-x: auto">
                    <table id="d3-resultsTable" class="table table-dark table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Match</th>
                                <th>Results</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                </div>

            </div>
    `;
}

function splitLine(line) {
    // Utility function to split CSV lines, handling quotes
    const result = [];
    let currentField = "";
    let inQuotes = false;
    for (let char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === "," && !inQuotes) {
            result.push(currentField.trim());
            currentField = "";
        } else currentField += char;
    }
    result.push(currentField.trim());
    return result;
}

function populateTable(division, data) {
    const tbody = document.getElementById(`${division}-resultsTable`).querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    const selectedConference = document.getElementById(`${division}-conferences-results-dropdown`).value;
    const selectedTeam = document.getElementById(`${division}-teams-results-dropdown`).value;
    const startDate = new Date(document.getElementById(`${division}-startDate`).value);
    const endDate = new Date(document.getElementById(`${division}-endDate`).value);

    // Filter the data based on selected filters and date range
    const filteredData = data.filter(row => {
        const rowDate = new Date(row.date);
        const conferenceMatch = (selectedConference === "All Conferences") || row.match.includes(`(${selectedConference})`);
        const teamMatch = (selectedTeam === "All Teams") || row.match.includes(selectedTeam);
        const dateMatch = (!isNaN(startDate) ? rowDate >= startDate : true) &&
                          (!isNaN(endDate) ? rowDate <= endDate : true);

        return conferenceMatch && teamMatch && dateMatch;
    });

    // Populate the table with filtered data
    filteredData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.date}</td>
            <td>${row.match}</td>
            <td>${row.results} <a href="${row.box_score_url}" target="_blank">View</a></td>
        `;
        tbody.appendChild(tr);
    });
}

async function fetchAndParseCSV(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    const rows = csvText.trim().split('\n').slice(1); // Remove the header row
    return rows.map(row => {
        const [date, match, results, box_score_url] = splitLine(row);
        return { date, match, results, box_score_url };
    });
}

function populateConferences(division, teamsArray) {
    const conferenceDropdown = document.getElementById(`${division}-conferences-results-dropdown`);
    const uniqueConferences = [...new Set(teamsArray.map(team => team.conference_short))].sort();
    
    // Clear previous options and add "All Conferences"
    conferenceDropdown.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "All Conferences";
    allOption.textContent = "All Conferences";
    conferenceDropdown.appendChild(allOption);

    // Populate unique conferences
    uniqueConferences.forEach(conference => {
        const option = document.createElement("option");
        option.value = conference;
        option.textContent = conference;
        conferenceDropdown.appendChild(option);
    });
}

function populateTeams(division, teamsArray) {
    return function(event) {
        const selectedConference = event.target.value;
        const teamsDropdown = document.getElementById(`${division}-teams-results-dropdown`);
        teamsDropdown.innerHTML = ""; // Clear previous options

        // Add "All Teams" option and select it by default
        const allTeamsOption = document.createElement("option");
        allTeamsOption.value = "All Teams";
        allTeamsOption.textContent = "All Teams";
        teamsDropdown.appendChild(allTeamsOption);
        teamsDropdown.value = "All Teams"; // Set "All Teams" as the default selected option

        // Filter teams based on the selected conference, or show all if "All Conferences" is selected
        const filteredTeams = selectedConference === "All Conferences"
            ? teamsArray
            : teamsArray.filter(team => team.conference_short === selectedConference);

        // Add each filtered team as an option
        filteredTeams.forEach(team => {
            const option = document.createElement("option");
            option.value = team.team_short;
            option.textContent = team.team_short;
            teamsDropdown.appendChild(option);
        });
    };
}

export async function initResults() {


    const divisionOneTeams = [
        { team_short: "A&M-Corpus Christi", conference_short: "SLC", division: "D-I" },
        { team_short: "Abilene Christian", conference_short: "WAC", division: "D-I" },
        { team_short: "Air Force", conference_short: "MW", division: "D-I" },
        { team_short: "Akron", conference_short: "MAC", division: "D-I" },
        { team_short: "Alabama", conference_short: "SEC", division: "D-I" },
        { team_short: "Alabama A&M", conference_short: "SWAC", division: "D-I" },
        { team_short: "Alabama St.", conference_short: "SWAC", division: "D-I" },
        { team_short: "Alcorn", conference_short: "SWAC", division: "D-I" },
        { team_short: "American", conference_short: "PL", division: "D-I" },
        { team_short: "App State", conference_short: "SBC", division: "D-I" },
        { team_short: "Arizona", conference_short: "Big 12", division: "D-I" },
        { team_short: "Arizona St.", conference_short: "Big 12", division: "D-I" },
        { team_short: "Ark.-Pine Bluff", conference_short: "SWAC", division: "D-I" },
        { team_short: "Arkansas", conference_short: "SEC", division: "D-I" },
        { team_short: "Arkansas St.", conference_short: "SBC", division: "D-I" },
        { team_short: "Army West Point", conference_short: "PL", division: "D-I" },
        { team_short: "Auburn", conference_short: "SEC", division: "D-I" },
        { team_short: "Austin Peay", conference_short: "ASUN", division: "D-I" },
        { team_short: "Ball St.", conference_short: "MAC", division: "D-I" },
        { team_short: "Baylor", conference_short: "Big 12", division: "D-I" },
        { team_short: "Bellarmine", conference_short: "ASUN", division: "D-I" },
        { team_short: "Belmont", conference_short: "MVC", division: "D-I" },
        { team_short: "Bethune-Cookman", conference_short: "SWAC", division: "D-I" },
        { team_short: "Binghamton", conference_short: "AE", division: "D-I" },
        { team_short: "Boise St.", conference_short: "MW", division: "D-I" },
        { team_short: "Boston College", conference_short: "ACC", division: "D-I" },
        { team_short: "Boston U.", conference_short: "PL", division: "D-I" },
        { team_short: "Bowling Green", conference_short: "MAC", division: "D-I" },
        { team_short: "Bradley", conference_short: "MVC", division: "D-I" },
        { team_short: "Brown", conference_short: "Ivy", division: "D-I" },
        { team_short: "Bryant", conference_short: "AE", division: "D-I" },
        { team_short: "Bucknell", conference_short: "PL", division: "D-I" },
        { team_short: "Buffalo", conference_short: "MAC", division: "D-I" },
        { team_short: "Butler", conference_short: "BE", division: "D-I" },
        { team_short: "BYU", conference_short: "Big 12", division: "D-I" },
        { team_short: "Cal Poly", conference_short: "BWC", division: "D-I" },
        { team_short: "Cal St. Fullerton", conference_short: "BWC", division: "D-I" },
        { team_short: "California", conference_short: "ACC", division: "D-I" },
        { team_short: "California Baptist", conference_short: "WAC", division: "D-I" },
        { team_short: "Campbell", conference_short: "CAA", division: "D-I" },
        { team_short: "Canisius", conference_short: "MAAC", division: "D-I" },
        { team_short: "Central Ark.", conference_short: "ASUN", division: "D-I" },
        { team_short: "Central Conn. St.", conference_short: "NEC", division: "D-I" },
        { team_short: "Central Mich.", conference_short: "MAC", division: "D-I" },
        { team_short: "Charleston So.", conference_short: "BSC", division: "D-I" },
        { team_short: "Charlotte", conference_short: "AAC", division: "D-I" },
        { team_short: "Chattanooga", conference_short: "SoCon", division: "D-I" },
        { team_short: "Chicago St.", conference_short: "NEC", division: "D-I" },
        { team_short: "Cincinnati", conference_short: "Big 12", division: "D-I" },
        { team_short: "Clemson", conference_short: "ACC", division: "D-I" },
        { team_short: "Cleveland St.", conference_short: "HL", division: "D-I" },
        { team_short: "Coastal Carolina", conference_short: "SBC", division: "D-I" },
        { team_short: "Col. of Charleston", conference_short: "CAA", division: "D-I" },
        { team_short: "Colgate", conference_short: "PL", division: "D-I" },
        { team_short: "Colorado", conference_short: "Big 12", division: "D-I" },
        { team_short: "Colorado St.", conference_short: "MW", division: "D-I" },
        { team_short: "Columbia", conference_short: "Ivy", division: "D-I" },
        { team_short: "Coppin St.", conference_short: "MEAC", division: "D-I" },
        { team_short: "Cornell", conference_short: "Ivy", division: "D-I" },
        { team_short: "Creighton", conference_short: "BE", division: "D-I" },
        { team_short: "CSU Bakersfield", conference_short: "BWC", division: "D-I" },
        { team_short: "CSUN", conference_short: "BWC", division: "D-I" },
        { team_short: "Dartmouth", conference_short: "Ivy", division: "D-I" },
        { team_short: "Davidson", conference_short: "A-10", division: "D-I" },
        { team_short: "Dayton", conference_short: "A-10", division: "D-I" },
        { team_short: "Delaware", conference_short: "CAA", division: "D-I" },
        { team_short: "Delaware St.", conference_short: "MEAC", division: "D-I" },
        { team_short: "Denver", conference_short: "Summit", division: "D-I" },
        { team_short: "DePaul", conference_short: "BE", division: "D-I" },
        { team_short: "Detroit Mercy", conference_short: "HL", division: "D-I" },
        { team_short: "Drake", conference_short: "MVC", division: "D-I" },
        { team_short: "Drexel", conference_short: "CAA", division: "D-I" },
        { team_short: "Duke", conference_short: "ACC", division: "D-I" },
        { team_short: "Duquesne", conference_short: "A-10", division: "D-I" },
        { team_short: "East Carolina", conference_short: "AAC", division: "D-I" },
        { team_short: "Eastern Ill.", conference_short: "OVC", division: "D-I" },
        { team_short: "Eastern Ky.", conference_short: "ASUN", division: "D-I" },
        { team_short: "Eastern Mich.", conference_short: "MAC", division: "D-I" },
        { team_short: "Eastern Wash.", conference_short: "BSC", division: "D-I" },
        { team_short: "Elon", conference_short: "CAA", division: "D-I" },
        { team_short: "ETSU", conference_short: "SoCon", division: "D-I" },
        { team_short: "Evansville", conference_short: "MVC", division: "D-I" },
        { team_short: "Fairfield", conference_short: "MAAC", division: "D-I" },
        { team_short: "FDU", conference_short: "NEC", division: "D-I" },
        { team_short: "FGCU", conference_short: "ASUN", division: "D-I" },
        { team_short: "FIU", conference_short: "C-USA", division: "D-I" },
        { team_short: "Fla. Atlantic", conference_short: "AAC", division: "D-I" },
        { team_short: "Florida", conference_short: "SEC", division: "D-I" },
        { team_short: "Florida A&M", conference_short: "SWAC", division: "D-I" },
        { team_short: "Florida St.", conference_short: "ACC", division: "D-I" },
        { team_short: "Fordham", conference_short: "A-10", division: "D-I" },
        { team_short: "Fresno St.", conference_short: "MW", division: "D-I" },
        { team_short: "Furman", conference_short: "SoCon", division: "D-I" },
        { team_short: "Ga. Southern", conference_short: "SBC", division: "D-I" },
        { team_short: "Gardner-Webb", conference_short: "BSC", division: "D-I" },
        { team_short: "George Mason", conference_short: "A-10", division: "D-I" },
        { team_short: "George Washington", conference_short: "A-10", division: "D-I" },
        { team_short: "Georgetown", conference_short: "BE", division: "D-I" },
        { team_short: "Georgia", conference_short: "SEC", division: "D-I" },
        { team_short: "Georgia St.", conference_short: "SBC", division: "D-I" },
        { team_short: "Georgia Tech", conference_short: "ACC", division: "D-I" },
        { team_short: "Gonzaga", conference_short: "WCC", division: "D-I" },
        { team_short: "Grambling", conference_short: "SWAC", division: "D-I" },
        { team_short: "Grand Canyon", conference_short: "WAC", division: "D-I" },
        { team_short: "Green Bay", conference_short: "HL", division: "D-I" },
        { team_short: "Hampton", conference_short: "CAA", division: "D-I" },
        { team_short: "Harvard", conference_short: "Ivy", division: "D-I" },
        { team_short: "Hawaii", conference_short: "BWC", division: "D-I" },
        { team_short: "High Point", conference_short: "BSC", division: "D-I" },
        { team_short: "Hofstra", conference_short: "CAA", division: "D-I" },
        { team_short: "Holy Cross", conference_short: "PL", division: "D-I" },
        { team_short: "Houston", conference_short: "Big 12", division: "D-I" },
        { team_short: "Houston Christian", conference_short: "SLC", division: "D-I" },
        { team_short: "Howard", conference_short: "MEAC", division: "D-I" },
        { team_short: "Idaho", conference_short: "BSC", division: "D-I" },
        { team_short: "Idaho St.", conference_short: "BSC", division: "D-I" },
        { team_short: "Illinois", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Illinois St.", conference_short: "MVC", division: "D-I" },
        { team_short: "Indiana", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Indiana St.", conference_short: "MVC", division: "D-I" },
        { team_short: "Iona", conference_short: "MAAC", division: "D-I" },
        { team_short: "Iowa", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Iowa St.", conference_short: "Big 12", division: "D-I" },
        { team_short: "IU Indy", conference_short: "HL", division: "D-I" },
        { team_short: "Jackson St.", conference_short: "SWAC", division: "D-I" },
        { team_short: "Jacksonville", conference_short: "ASUN", division: "D-I" },
        { team_short: "Jacksonville St.", conference_short: "C-USA", division: "D-I" },
        { team_short: "James Madison", conference_short: "SBC", division: "D-I" },
        { team_short: "Kansas", conference_short: "Big 12", division: "D-I" },
        { team_short: "Kansas City", conference_short: "Summit", division: "D-I" },
        { team_short: "Kansas St.", conference_short: "Big 12", division: "D-I" },
        { team_short: "Kennesaw St.", conference_short: "C-USA", division: "D-I" },
        { team_short: "Kent St.", conference_short: "MAC", division: "D-I" },
        { team_short: "Kentucky", conference_short: "SEC", division: "D-I" },
        { team_short: "La Salle", conference_short: "A-10", division: "D-I" },
        { team_short: "Lafayette", conference_short: "PL", division: "D-I" },
        { team_short: "Lamar University", conference_short: "SLC", division: "D-I" },
        { team_short: "Lehigh", conference_short: "PL", division: "D-I" },
        { team_short: "Liberty", conference_short: "C-USA", division: "D-I" },
        { team_short: "Lipscomb", conference_short: "ASUN", division: "D-I" },
        { team_short: "Little Rock", conference_short: "OVC", division: "D-I" },
        { team_short: "LIU", conference_short: "NEC", division: "D-I" },
        { team_short: "LMU (CA)", conference_short: "WCC", division: "D-I" },
        { team_short: "Long Beach St.", conference_short: "BWC", division: "D-I" },
        { team_short: "Longwood", conference_short: "BSC", division: "D-I" },
        { team_short: "Louisiana", conference_short: "SBC", division: "D-I" },
        { team_short: "Louisiana Tech", conference_short: "C-USA", division: "D-I" },
        { team_short: "Louisville", conference_short: "ACC", division: "D-I" },
        { team_short: "Loyola Chicago", conference_short: "A-10", division: "D-I" },
        { team_short: "Loyola Maryland", conference_short: "PL", division: "D-I" },
        { team_short: "LSU", conference_short: "SEC", division: "D-I" },
        { team_short: "Maine", conference_short: "AE", division: "D-I" },
        { team_short: "Manhattan", conference_short: "MAAC", division: "D-I" },
        { team_short: "Marist", conference_short: "MAAC", division: "D-I" },
        { team_short: "Marquette", conference_short: "BE", division: "D-I" },
        { team_short: "Marshall", conference_short: "SBC", division: "D-I" },
        { team_short: "Maryland", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Massachusetts", conference_short: "A-10", division: "D-I" },
        { team_short: "McNeese", conference_short: "SLC", division: "D-I" },
        { team_short: "Memphis", conference_short: "AAC", division: "D-I" },
        { team_short: "Mercer", conference_short: "SoCon", division: "D-I" },
        { team_short: "Merrimack", conference_short: "MAAC", division: "D-I" },
        { team_short: "Miami (FL)", conference_short: "ACC", division: "D-I" },
        { team_short: "Miami (OH)", conference_short: "MAC", division: "D-I" },
        { team_short: "Michigan", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Michigan St.", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Middle Tenn.", conference_short: "C-USA", division: "D-I" },
        { team_short: "Milwaukee", conference_short: "HL", division: "D-I" },
        { team_short: "Minnesota", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Mississippi St.", conference_short: "SEC", division: "D-I" },
        { team_short: "Mississippi Val.", conference_short: "SWAC", division: "D-I" },
        { team_short: "Missouri", conference_short: "SEC", division: "D-I" },
        { team_short: "Missouri St.", conference_short: "MVC", division: "D-I" },
        { team_short: "Monmouth", conference_short: "CAA", division: "D-I" },
        { team_short: "Montana", conference_short: "BSC", division: "D-I" },
        { team_short: "Montana St.", conference_short: "BSC", division: "D-I" },
        { team_short: "Morehead St.", conference_short: "OVC", division: "D-I" },
        { team_short: "Morgan St.", conference_short: "MEAC", division: "D-I" },
        { team_short: "Mount St. Mary's", conference_short: "MAAC", division: "D-I" },
        { team_short: "Murray St.", conference_short: "MVC", division: "D-I" },
        { team_short: "N.C. A&T", conference_short: "CAA", division: "D-I" },
        { team_short: "N.C. Central", conference_short: "MEAC", division: "D-I" },
        { team_short: "Navy", conference_short: "PL", division: "D-I" },
        { team_short: "NC State", conference_short: "ACC", division: "D-I" },
        { team_short: "Nebraska", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Nevada", conference_short: "MW", division: "D-I" },
        { team_short: "New Hampshire", conference_short: "AE", division: "D-I" },
        { team_short: "New Mexico", conference_short: "MW", division: "D-I" },
        { team_short: "New Mexico St.", conference_short: "C-USA", division: "D-I" },
        { team_short: "New Orleans", conference_short: "SLC", division: "D-I" },
        { team_short: "Niagara", conference_short: "MAAC", division: "D-I" },
        { team_short: "Nicholls", conference_short: "SLC", division: "D-I" },
        { team_short: "NIU", conference_short: "MAC", division: "D-I" },
        { team_short: "NJIT", conference_short: "AE", division: "D-I" },
        { team_short: "Norfolk St.", conference_short: "MEAC", division: "D-I" },
        { team_short: "North Ala.", conference_short: "ASUN", division: "D-I" },
        { team_short: "North Carolina", conference_short: "ACC", division: "D-I" },
        { team_short: "North Dakota", conference_short: "Summit", division: "D-I" },
        { team_short: "North Dakota St.", conference_short: "Summit", division: "D-I" },
        { team_short: "North Florida", conference_short: "ASUN", division: "D-I" },
        { team_short: "North Texas", conference_short: "AAC", division: "D-I" },
        { team_short: "Northeastern", conference_short: "CAA", division: "D-I" },
        { team_short: "Northern Ariz.", conference_short: "BSC", division: "D-I" },
        { team_short: "Northern Colo.", conference_short: "BSC", division: "D-I" },
        { team_short: "Northern Ky.", conference_short: "HL", division: "D-I" },
        { team_short: "Northwestern", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Northwestern St.", conference_short: "SLC", division: "D-I" },
        { team_short: "Notre Dame", conference_short: "ACC", division: "D-I" },
        { team_short: "Oakland", conference_short: "HL", division: "D-I" },
        { team_short: "Ohio", conference_short: "MAC", division: "D-I" },
        { team_short: "Ohio St.", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Oklahoma", conference_short: "SEC", division: "D-I" },
        { team_short: "Oklahoma St.", conference_short: "Big 12", division: "D-I" },
        { team_short: "Old Dominion", conference_short: "SBC", division: "D-I" },
        { team_short: "Ole Miss", conference_short: "SEC", division: "D-I" },
        { team_short: "Omaha", conference_short: "Summit", division: "D-I" },
        { team_short: "Oral Roberts", conference_short: "Summit", division: "D-I" },
        { team_short: "Oregon", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Oregon St.", conference_short: "Pac-12", division: "D-I" },
        { team_short: "Pacific", conference_short: "WCC", division: "D-I" },
        { team_short: "Penn", conference_short: "Ivy", division: "D-I" },
        { team_short: "Penn St.", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Pepperdine", conference_short: "WCC", division: "D-I" },
        { team_short: "Pittsburgh", conference_short: "ACC", division: "D-I" },
        { team_short: "Portland", conference_short: "WCC", division: "D-I" },
        { team_short: "Portland St.", conference_short: "BSC", division: "D-I" },
        { team_short: "Prairie View", conference_short: "SWAC", division: "D-I" },
        { team_short: "St. Thomas (MN)", conference_short: "Summit League", division: "D-I" },
        { team_short: "Presbyterian", conference_short: "BSC", division: "D-I" },
        { team_short: "Princeton", conference_short: "Ivy", division: "D-I" },
        { team_short: "Providence", conference_short: "BE", division: "D-I" },
        { team_short: "Purdue", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Purdue Fort Wayne", conference_short: "HL", division: "D-I" },
        { team_short: "Quinnipiac", conference_short: "MAAC", division: "D-I" },
        { team_short: "Radford", conference_short: "BSC", division: "D-I" },
        { team_short: "Rhode Island", conference_short: "A-10", division: "D-I" },
        { team_short: "Rice", conference_short: "AAC", division: "D-I" },
        { team_short: "Richmond", conference_short: "A-10", division: "D-I" },
        { team_short: "Rider", conference_short: "MAAC", division: "D-I" },
        { team_short: "Robert Morris", conference_short: "HL", division: "D-I" },
        { team_short: "Rutgers", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Sacramento St.", conference_short: "BSC", division: "D-I" },
        { team_short: "Sacred Heart", conference_short: "MAAC", division: "D-I" },
        { team_short: "Saint Francis", conference_short: "NEC", division: "D-I" },
        { team_short: "Saint Joseph's", conference_short: "A-10", division: "D-I" },
        { team_short: "Saint Louis", conference_short: "A-10", division: "D-I" },
        { team_short: "Saint Mary's (CA)", conference_short: "WCC", division: "D-I" },
        { team_short: "Saint Peter's", conference_short: "MAAC", division: "D-I" },
        { team_short: "Sam Houston", conference_short: "C-USA", division: "D-I" },
        { team_short: "Samford", conference_short: "SoCon", division: "D-I" },
        { team_short: "San Diego", conference_short: "WCC", division: "D-I" },
        { team_short: "San Diego St.", conference_short: "MW", division: "D-I" },
        { team_short: "San Francisco", conference_short: "WCC", division: "D-I" },
        { team_short: "San Jose St.", conference_short: "MW", division: "D-I" },
        { team_short: "Santa Clara", conference_short: "WCC", division: "D-I" },
        { team_short: "Seattle U", conference_short: "WAC", division: "D-I" },
        { team_short: "Seton Hall", conference_short: "BE", division: "D-I" },
        { team_short: "SFA", conference_short: "SLC", division: "D-I" },
        { team_short: "Siena", conference_short: "MAAC", division: "D-I" },
        { team_short: "SIUE", conference_short: "OVC", division: "D-I" },
        { team_short: "SMU", conference_short: "ACC", division: "D-I" },
        { team_short: "South Alabama", conference_short: "SBC", division: "D-I" },
        { team_short: "South Carolina", conference_short: "SEC", division: "D-I" },
        { team_short: "South Carolina St.", conference_short: "MEAC", division: "D-I" },
        { team_short: "South Dakota", conference_short: "Summit", division: "D-I" },
        { team_short: "South Dakota St.", conference_short: "Summit", division: "D-I" },
        { team_short: "South Fla.", conference_short: "AAC", division: "D-I" },
        { team_short: "Southeast Mo. St.", conference_short: "OVC", division: "D-I" },
        { team_short: "Southeastern La.", conference_short: "SLC", division: "D-I" },
        { team_short: "Southern California", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Southern Ill.", conference_short: "MVC", division: "D-I" },
        { team_short: "Southern Miss.", conference_short: "SBC", division: "D-I" },
        { team_short: "Southern U.", conference_short: "SWAC", division: "D-I" },
        { team_short: "Southern Utah", conference_short: "WAC", division: "D-I" },
        { team_short: "St. Bonaventure", conference_short: "A-10", division: "D-I" },
        { team_short: "St. Francis Brooklyn", conference_short: "NEC", division: "D-I" },
        { team_short: "St. John's (NY)", conference_short: "BE", division: "D-I" },
        { team_short: "Stanford", conference_short: "ACC", division: "D-I" },
        { team_short: "Stetson", conference_short: "ASUN", division: "D-I" },
        { team_short: "Stony Brook", conference_short: "CAA", division: "D-I" },
        { team_short: "Syracuse", conference_short: "ACC", division: "D-I" },
        { team_short: "Tarleton St.", conference_short: "WAC", division: "D-I" },
        { team_short: "TCU", conference_short: "Big 12", division: "D-I" },
        { team_short: "Temple", conference_short: "AAC", division: "D-I" },
        { team_short: "Tennessee", conference_short: "SEC", division: "D-I" },
        { team_short: "Tennessee St.", conference_short: "OVC", division: "D-I" },
        { team_short: "Tennessee Tech", conference_short: "OVC", division: "D-I" },
        { team_short: "Texas", conference_short: "SEC", division: "D-I" },
        { team_short: "Texas A&M", conference_short: "SEC", division: "D-I" },
        { team_short: "Texas Southern", conference_short: "SWAC", division: "D-I" },
        { team_short: "Texas St.", conference_short: "SBC", division: "D-I" },
        { team_short: "Texas Tech", conference_short: "Big 12", division: "D-I" },
        { team_short: "The Citadel", conference_short: "SoCon", division: "D-I" },
        { team_short: "Toledo", conference_short: "MAC", division: "D-I" },
        { team_short: "Towson", conference_short: "CAA", division: "D-I" },
        { team_short: "Troy", conference_short: "SBC", division: "D-I" },
        { team_short: "Tulane", conference_short: "AAC", division: "D-I" },
        { team_short: "Tulsa", conference_short: "AAC", division: "D-I" },
        { team_short: "UAB", conference_short: "AAC", division: "D-I" },
        { team_short: "UAlbany", conference_short: "AE", division: "D-I" },
        { team_short: "UC Davis", conference_short: "BWC", division: "D-I" },
        { team_short: "UC Irvine", conference_short: "BWC", division: "D-I" },
        { team_short: "UC Riverside", conference_short: "BWC", division: "D-I" },
        { team_short: "UC San Diego", conference_short: "BWC", division: "D-I" },
        { team_short: "UC Santa Barbara", conference_short: "BWC", division: "D-I" },
        { team_short: "UCF", conference_short: "Big 12", division: "D-I" },
        { team_short: "UCLA", conference_short: "Big Ten", division: "D-I" },
        { team_short: "UConn", conference_short: "BE", division: "D-I" },
        { team_short: "UIC", conference_short: "MVC", division: "D-I" },
        { team_short: "UIW", conference_short: "SLC", division: "D-I" },
        { team_short: "ULM", conference_short: "SBC", division: "D-I" },
        { team_short: "UMass Lowell", conference_short: "AE", division: "D-I" },
        { team_short: "UMBC", conference_short: "AE", division: "D-I" },
        { team_short: "UMES", conference_short: "MEAC", division: "D-I" },
        { team_short: "UNC Asheville", conference_short: "BSC", division: "D-I" },
        { team_short: "UNC Greensboro", conference_short: "SoCon", division: "D-I" },
        { team_short: "UNCW", conference_short: "CAA", division: "D-I" },
        { team_short: "UNI", conference_short: "MVC", division: "D-I" },
        { team_short: "UNLV", conference_short: "MW", division: "D-I" },
        { team_short: "USC Upstate", conference_short: "BSC", division: "D-I" },
        { team_short: "UT Arlington", conference_short: "WAC", division: "D-I" },
        { team_short: "UT Martin", conference_short: "OVC", division: "D-I" },
        { team_short: "Utah", conference_short: "Big 12", division: "D-I" },
        { team_short: "Utah St.", conference_short: "MW", division: "D-I" },
        { team_short: "Utah Tech", conference_short: "WAC", division: "D-I" },
        { team_short: "Utah Valley", conference_short: "WAC", division: "D-I" },
        { team_short: "UTEP", conference_short: "C-USA", division: "D-I" },
        { team_short: "UTRGV", conference_short: "SLC", division: "D-I" },
        { team_short: "UTSA", conference_short: "AAC", division: "D-I" },
        { team_short: "Valparaiso", conference_short: "MVC", division: "D-I" },
        { team_short: "Vanderbilt", conference_short: "SEC", division: "D-I" },
        { team_short: "VCU", conference_short: "A-10", division: "D-I" },
        { team_short: "Vermont", conference_short: "AE", division: "D-I" },
        { team_short: "Villanova", conference_short: "BE", division: "D-I" },
        { team_short: "Virginia", conference_short: "ACC", division: "D-I" },
        { team_short: "Virginia Tech", conference_short: "ACC", division: "D-I" },
        { team_short: "VMI", conference_short: "SoCon", division: "D-I" },
        { team_short: "Wagner", conference_short: "NEC", division: "D-I" },
        { team_short: "Wake Forest", conference_short: "ACC", division: "D-I" },
        { team_short: "Washington", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Washington St.", conference_short: "Pac-12", division: "D-I" },
        { team_short: "Weber St.", conference_short: "BSC", division: "D-I" },
        { team_short: "West Virginia", conference_short: "Big 12", division: "D-I" },
        { team_short: "Western Caro.", conference_short: "SoCon", division: "D-I" },
        { team_short: "Western Ill.", conference_short: "OVC", division: "D-I" },
        { team_short: "Western Ky.", conference_short: "C-USA", division: "D-I" },
        { team_short: "Western Mich.", conference_short: "MAC", division: "D-I" },
        { team_short: "Wichita St.", conference_short: "AAC", division: "D-I" },
        { team_short: "William & Mary", conference_short: "CAA", division: "D-I" },
        { team_short: "Winthrop", conference_short: "BSC", division: "D-I" },
        { team_short: "Wisconsin", conference_short: "Big Ten", division: "D-I" },
        { team_short: "Wofford", conference_short: "SoCon", division: "D-I" },
        { team_short: "Wright St.", conference_short: "HL", division: "D-I" },
        { team_short: "Wyoming", conference_short: "MW", division: "D-I" },
        { team_short: "Xavier", conference_short: "BE", division: "D-I" },
        { team_short: "Yale", conference_short: "Ivy", division: "D-I" },
        { team_short: "Youngstown St.", conference_short: "HL", division: "D-I" },
        { team_short: "Queens (NC)", conference_short: "ASUN", division: "D-I" },
        { team_short: "West Ga.", conference_short: "ASUN", division: "D-I" }
    ]

    const divisionTwoTeams = [
        { team_short: "Academy of Art", conference_short: "PacWest", division: "D-II" },
        { team_short: "Adams St.", conference_short: "RMAC", division: "D-II" },
        { team_short: "Adelphi", conference_short: "NE10", division: "D-II" },
        { team_short: "Alabama Huntsville", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Alas. Anchorage", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Alas. Fairbanks", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Albany St. (GA)", conference_short: "SIAC", division: "D-II" },
        { team_short: "Allen", conference_short: "SIAC", division: "D-II" },
        { team_short: "American Int'l", conference_short: "NE10", division: "D-II" },
        { team_short: "Anderson (SC)", conference_short: "SAC", division: "D-II" },
        { team_short: "Angelo St.", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Ark.-Fort Smith", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Ark.-Monticello", conference_short: "GAC", division: "D-II" },
        { team_short: "Arkansas Tech", conference_short: "GAC", division: "D-II" },
        { team_short: "Ashland", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Assumption", conference_short: "NE10", division: "D-II" },
        { team_short: "Augusta", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "Augustana (SD)", conference_short: "NSIC", division: "D-II" },
        { team_short: "AUM", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Azusa Pacific", conference_short: "PacWest", division: "D-II" },
        { team_short: "Barry", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Barton", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Belmont Abbey", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Bemidji St.", conference_short: "NSIC", division: "D-II" },
        { team_short: "Benedict", conference_short: "SIAC", division: "D-II" },
        { team_short: "Bentley", conference_short: "NE10", division: "D-II" },
        { team_short: "Biola", conference_short: "PacWest", division: "D-II" },
        { team_short: "Black Hills St.", conference_short: "RMAC", division: "D-II" },
        { team_short: "Bloomfield", conference_short: "CACC", division: "D-II" },
        { team_short: "Bloomsburg", conference_short: "PSAC", division: "D-II" },
        { team_short: "Bluefield St.", conference_short: "CIAA", division: "D-II" },
        { team_short: "Bowie St.", conference_short: "CIAA", division: "D-II" },
        { team_short: "Bridgeport", conference_short: "CACC", division: "D-II" },
        { team_short: "Cal Poly Humboldt", conference_short: "CCAA", division: "D-II" },
        { team_short: "Cal Poly Pomona", conference_short: "CCAA", division: "D-II" },
        { team_short: "Cal St. Dom. Hills", conference_short: "CCAA", division: "D-II" },
        { team_short: "Cal St. East Bay", conference_short: "CCAA", division: "D-II" },
        { team_short: "Cal St. Monterey Bay", conference_short: "CCAA", division: "D-II" },
        { team_short: "Cal St. San Marcos", conference_short: "CCAA", division: "D-II" },
        { team_short: "Cal State LA", conference_short: "CCAA", division: "D-II" },
        { team_short: "Caldwell", conference_short: "CACC", division: "D-II" },
        { team_short: "California (PA)", conference_short: "PSAC", division: "D-II" },
        { team_short: "Cameron", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Carson-Newman", conference_short: "SAC", division: "D-II" },
        { team_short: "Catawba", conference_short: "SAC", division: "D-II" },
        { team_short: "Cedarville", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Central Mo.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Central Okla.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Central St. (OH)", conference_short: "SIAC", division: "D-II" },
        { team_short: "Central Wash.", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Chadron St.", conference_short: "RMAC", division: "D-II" },
        { team_short: "Chaminade", conference_short: "PacWest", division: "D-II" },
        { team_short: "Charleston (WV)", conference_short: "MEC", division: "D-II" },
        { team_short: "Chestnut Hill", conference_short: "CACC", division: "D-II" },
        { team_short: "Chico St.", conference_short: "CCAA", division: "D-II" },
        { team_short: "Chowan", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Christian Brothers", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Claflin", conference_short: "CIAA", division: "D-II" },
        { team_short: "Clarion", conference_short: "PSAC", division: "D-II" },
        { team_short: "Clark Atlanta", conference_short: "SIAC", division: "D-II" },
        { team_short: "Clayton St.", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "Coker", conference_short: "SAC", division: "D-II" },
        { team_short: "Colo. Christian", conference_short: "RMAC", division: "D-II" },
        { team_short: "Colo. Sch. of Mines", conference_short: "RMAC", division: "D-II" },
        { team_short: "Colorado Mesa", conference_short: "RMAC", division: "D-II" },
        { team_short: "Columbus St.", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "Concord", conference_short: "MEC", division: "D-II" },
        { team_short: "Concordia-St. Paul", conference_short: "NSIC", division: "D-II" },
        { team_short: "Converse", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "CSU Pueblo", conference_short: "RMAC", division: "D-II" },
        { team_short: "CSUSB", conference_short: "CCAA", division: "D-II" },
        { team_short: "CUI", conference_short: "PacWest", division: "D-II" },
        { team_short: "D'Youville", conference_short: "ECC", division: "D-II" },
        { team_short: "Daemen", conference_short: "ECC", division: "D-II" },
        { team_short: "Davenport", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Davis & Elkins", conference_short: "MEC", division: "D-II" },
        { team_short: "DBU", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Delta St.", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Dist. Columbia", conference_short: "ECC", division: "D-II" },
        { team_short: "Dominican (CA)", conference_short: "PacWest", division: "D-II" },
        { team_short: "Dominican (NY)", conference_short: "CACC", division: "D-II" },
        { team_short: "Drury", conference_short: "GLVC", division: "D-II" },
        { team_short: "East Central", conference_short: "GAC", division: "D-II" },
        { team_short: "East Stroudsburg", conference_short: "PSAC", division: "D-II" },
        { team_short: "Eastern N.M.", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Eckerd", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Edinboro", conference_short: "PSAC", division: "D-II" },
        { team_short: "Edward Waters", conference_short: "SIAC", division: "D-II" },
        { team_short: "Elizabeth City St.", conference_short: "CIAA", division: "D-II" },
        { team_short: "Embry-Riddle (FL)", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Emmanuel (GA)", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Emory & Henry", conference_short: "SAC", division: "D-II" },
        { team_short: "Emporia St.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Erskine", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Fairmont St.", conference_short: "MEC", division: "D-II" },
        { team_short: "Fayetteville St.", conference_short: "CIAA", division: "D-II" },
        { team_short: "Felician", conference_short: "CACC", division: "D-II" },
        { team_short: "Ferris St.", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Findlay", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Fla. Southern", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Flagler", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "Florida Tech", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Fort Hays St.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Fort Lewis", conference_short: "RMAC", division: "D-II" },
        { team_short: "Fort Valley St.", conference_short: "SIAC", division: "D-II" },
        { team_short: "Francis Marion", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Franklin Pierce", conference_short: "NE10", division: "D-II" },
        { team_short: "Fresno Pacific", conference_short: "PacWest", division: "D-II" },
        { team_short: "Frostburg St.", conference_short: "MEC", division: "D-II" },
        { team_short: "Ga. Southwestern", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "Gannon", conference_short: "PSAC", division: "D-II" },
        { team_short: "Georgia College", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "Georgian Court", conference_short: "CACC", division: "D-II" },
        { team_short: "Glenville St.", conference_short: "MEC", division: "D-II" },
        { team_short: "Goldey-Beacom", conference_short: "CACC", division: "D-II" },
        { team_short: "Grand Valley St.", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Harding", conference_short: "GAC", division: "D-II" },
        { team_short: "Hawaii Hilo", conference_short: "PacWest", division: "D-II" },
        { team_short: "Hawaii Pacific", conference_short: "PacWest", division: "D-II" },
        { team_short: "Henderson St.", conference_short: "GAC", division: "D-II" },
        { team_short: "Hillsdale", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Holy Family", conference_short: "CACC", division: "D-II" },
        { team_short: "Ill. Springfield", conference_short: "GLVC", division: "D-II" },
        { team_short: "Indiana (PA)", conference_short: "PSAC", division: "D-II" },
        { team_short: "Jamestown", conference_short: "NSIC", division: "D-II" },
        { team_short: "Jefferson", conference_short: "CACC", division: "D-II" },
        { team_short: "Jessup", conference_short: "PacWest", division: "D-II" },
        { team_short: "Johnson C. Smith", conference_short: "CIAA", division: "D-II" },
        { team_short: "Kentucky St.", conference_short: "SIAC", division: "D-II" },
        { team_short: "King (TN)", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Kutztown", conference_short: "PSAC", division: "D-II" },
        { team_short: "Ky. Wesleyan", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Lake Erie", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Lake Superior St.", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Lander", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "Lane", conference_short: "SIAC", division: "D-II" },
        { team_short: "Le Moyne", conference_short: "NEC", division: "D-II" },
        { team_short: "Lee", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Lees-McRae", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "LeMoyne-Owen", conference_short: "SIAC", division: "D-II" },
        { team_short: "Lenoir-Rhyne", conference_short: "SAC", division: "D-II" },
        { team_short: "Lewis", conference_short: "GLVC", division: "D-II" },
        { team_short: "Limestone", conference_short: "SAC", division: "D-II" },
        { team_short: "Lincoln (MO)", conference_short: "GLVC", division: "D-II" },
        { team_short: "Lincoln (PA)", conference_short: "CIAA", division: "D-II" },
        { team_short: "Lincoln Memorial", conference_short: "SAC", division: "D-II" },
        { team_short: "Lindenwood", conference_short: "OVC", division: "D-II" },
        { team_short: "Livingstone", conference_short: "CIAA", division: "D-II" },
        { team_short: "Lock Haven", conference_short: "PSAC", division: "D-II" },
        { team_short: "Lubbock Christian", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Lynn", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Malone", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Mansfield", conference_short: "PSAC", division: "D-II" },
        { team_short: "Mars Hill", conference_short: "SAC", division: "D-II" },
        { team_short: "Mary", conference_short: "NSIC", division: "D-II" },
        { team_short: "Maryville (MO)", conference_short: "GLVC", division: "D-II" },
        { team_short: "McKendree", conference_short: "GLVC", division: "D-II" },
        { team_short: "Menlo", conference_short: "PacWest", division: "D-II" },
        { team_short: "Mercy", conference_short: "ECC", division: "D-II" },
        { team_short: "Mercyhurst", conference_short: "NEC", division: "D-II" },
        { team_short: "Michigan Tech", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Midwestern St.", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Miles", conference_short: "SIAC", division: "D-II" },
        { team_short: "Millersville", conference_short: "PSAC", division: "D-II" },
        { team_short: "Minn. Duluth", conference_short: "NSIC", division: "D-II" },
        { team_short: "Minn.-Crookston", conference_short: "NSIC", division: "D-II" },
        { team_short: "Minnesota St.", conference_short: "NSIC", division: "D-II" },
        { team_short: "Minot St.", conference_short: "NSIC", division: "D-II" },
        { team_short: "Mississippi Col.", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Missouri S&T", conference_short: "GLVC", division: "D-II" },
        { team_short: "Missouri Western", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Mo. Southern St.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Mo.-St. Louis", conference_short: "GLVC", division: "D-II" },
        { team_short: "Molloy", conference_short: "ECC", division: "D-II" },
        { team_short: "Mont. St. Billings", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Montevallo", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Morehouse", conference_short: "SIAC", division: "D-II" },
        { team_short: "Mount Olive", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "MSU Denver", conference_short: "RMAC", division: "D-II" },
        { team_short: "MSU Moorhead", conference_short: "NSIC", division: "D-II" },
        { team_short: "N.M. Highlands", conference_short: "RMAC", division: "D-II" },
        { team_short: "Neb.-Kearney", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "New Haven", conference_short: "NE10", division: "D-II" },
        { team_short: "Newberry", conference_short: "SAC", division: "D-II" },
        { team_short: "Newman", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "North Georgia", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "North Greenville", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Northeastern St.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Northern Mich.", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Northern St.", conference_short: "NSIC", division: "D-II" },
        { team_short: "Northwest Mo. St.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Northwest Nazarene", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Northwestern Okla.", conference_short: "GAC", division: "D-II" },
        { team_short: "Northwood", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Nova Southeastern", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Ohio Dominican", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Okla. Baptist", conference_short: "GAC", division: "D-II" },
        { team_short: "Okla. Christian", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Ouachita Baptist", conference_short: "GAC", division: "D-II" },
        { team_short: "P.R.-Bayamon", conference_short: "Independent", division: "D-II" },
        { team_short: "P.R.-Mayaguez", conference_short: "Independent", division: "D-II" },
        { team_short: "P.R.-Rio Piedras", conference_short: "Independent", division: "D-II" },
        { team_short: "Pace", conference_short: "NE10", division: "D-II" },
        { team_short: "Palm Beach Atl.", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Pitt.-Johnstown", conference_short: "PSAC", division: "D-II" },
        { team_short: "Pittsburg St.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Point Loma", conference_short: "PacWest", division: "D-II" },
        { team_short: "Point Park", conference_short: "MEC", division: "D-II" },
        { team_short: "Post", conference_short: "CACC", division: "D-II" },
        { team_short: "Purdue Northwest", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Queens (NY)", conference_short: "ECC", division: "D-II" },
        { team_short: "Quincy", conference_short: "GLVC", division: "D-II" },
        { team_short: "Regis (CO)", conference_short: "RMAC", division: "D-II" },
        { team_short: "Roberts Wesleyan", conference_short: "ECC", division: "D-II" },
        { team_short: "Rockhurst", conference_short: "GLVC", division: "D-II" },
        { team_short: "Rogers St.", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Rollins", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Roosevelt", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Saginaw Valley", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Saint Augustine's", conference_short: "CIAA", division: "D-II" },
        { team_short: "Saint Leo", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Saint Martin's", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Saint Michael's", conference_short: "NE10", division: "D-II" },
        { team_short: "Saint Rose", conference_short: "NE10", division: "D-II" },
        { team_short: "Salem (WV)", conference_short: "Independent", division: "D-II" },
        { team_short: "San Fran. St.", conference_short: "CCAA", division: "D-II" },
        { team_short: "Savannah St.", conference_short: "SIAC", division: "D-II" },
        { team_short: "Seattle Pacific", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Seton Hill", conference_short: "PSAC", division: "D-II" },
        { team_short: "Shaw", conference_short: "CIAA", division: "D-II" },
        { team_short: "Shepherd", conference_short: "PSAC", division: "D-II" },
        { team_short: "Shippensburg", conference_short: "PSAC", division: "D-II" },
        { team_short: "Shorter", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Simon Fraser", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Sioux Falls", conference_short: "NSIC", division: "D-II" },
        { team_short: "Slippery Rock", conference_short: "PSAC", division: "D-II" },
        { team_short: "Sonoma St.", conference_short: "CCAA", division: "D-II" },
        { team_short: "South Dakota Mines", conference_short: "RMAC", division: "D-II" },
        { team_short: "Southeastern Okla.", conference_short: "GAC", division: "D-II" },
        { team_short: "Southern Ark.", conference_short: "GAC", division: "D-II" },
        { team_short: "Southern Conn. St.", conference_short: "NE10", division: "D-II" },
        { team_short: "Southern Ind.", conference_short: "OVC", division: "D-II" },
        { team_short: "Southern N.H.", conference_short: "NE10", division: "D-II" },
        { team_short: "Southern Nazarene", conference_short: "GAC", division: "D-II" },
        { team_short: "Southern Wesleyan", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Southwest Baptist", conference_short: "GLVC", division: "D-II" },
        { team_short: "Southwest Minn. St.", conference_short: "NSIC", division: "D-II" },
        { team_short: "Southwestern Okla.", conference_short: "GAC", division: "D-II" },
        { team_short: "Spring Hill", conference_short: "SIAC", division: "D-II" },
        { team_short: "St. Anselm", conference_short: "NE10", division: "D-II" },
        { team_short: "St. Cloud St.", conference_short: "NSIC", division: "D-II" },
        { team_short: "St. Edward's", conference_short: "Lone Star", division: "D-II" },
        { team_short: "St. Mary's (TX)", conference_short: "Lone Star", division: "D-II" },
        { team_short: "St. Thomas Aquinas", conference_short: "ECC", division: "D-II" },
        { team_short: "Stanislaus St.", conference_short: "CCAA", division: "D-II" },
        { team_short: "Staten Island", conference_short: "ECC", division: "D-II" },
        { team_short: "Stonehill", conference_short: "NEC", division: "D-II" },
        { team_short: "Tampa", conference_short: "Sunshine State", division: "D-II" },
        { team_short: "Tex. A&M Int'l", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Tex. A&M-Commerce", conference_short: "Southland", division: "D-II" },
        { team_short: "Tex. A&M-Kingsville", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Tex. Permian Basin", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Texas Woman's", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Thomas More", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Tiffin", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Trevecca Nazarene", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Truman St.", conference_short: "GLVC", division: "D-II" },
        { team_short: "Tusculum", conference_short: "SAC", division: "D-II" },
        { team_short: "Tuskegee", conference_short: "SIAC", division: "D-II" },
        { team_short: "UC Merced", conference_short: "CCAA", division: "D-II" },
        { team_short: "UC-Colo. Springs", conference_short: "RMAC", division: "D-II" },
        { team_short: "UIndy", conference_short: "GLVC", division: "D-II" },
        { team_short: "UNC Pembroke", conference_short: "Conference Carolinas", division: "D-II" },
        { team_short: "Union (TN)", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Upper Iowa", conference_short: "GLVC", division: "D-II" },
        { team_short: "Ursuline", conference_short: "G-MAC", division: "D-II" },
        { team_short: "USC Aiken", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "USC Beaufort", conference_short: "Peach Belt", division: "D-II" },
        { team_short: "UT Tyler", conference_short: "Lone Star", division: "D-II" },
        { team_short: "UVA Wise", conference_short: "SAC", division: "D-II" },
        { team_short: "Valdosta St.", conference_short: "Gulf South", division: "D-II" },
        { team_short: "Vanguard", conference_short: "PacWest", division: "D-II" },
        { team_short: "Virginia St.", conference_short: "CIAA", division: "D-II" },
        { team_short: "Virginia Union", conference_short: "CIAA", division: "D-II" },
        { team_short: "Walsh", conference_short: "G-MAC", division: "D-II" },
        { team_short: "Washburn", conference_short: "Mid-America Intercollegiate", division: "D-II" },
        { team_short: "Wayne St. (MI)", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Wayne St. (NE)", conference_short: "NSIC", division: "D-II" },
        { team_short: "West Ala.", conference_short: "Gulf South", division: "D-II" },
        { team_short: "West Chester", conference_short: "PSAC", division: "D-II" },
        { team_short: "West Florida", conference_short: "Gulf South", division: "D-II" },
        { team_short: "West Liberty", conference_short: "MEC", division: "D-II" },
        { team_short: "West Tex. A&M", conference_short: "Lone Star", division: "D-II" },
        { team_short: "West Va. Wesleyan", conference_short: "MEC", division: "D-II" },
        { team_short: "West Virginia St.", conference_short: "MEC", division: "D-II" },
        { team_short: "Western Colo.", conference_short: "RMAC", division: "D-II" },
        { team_short: "Western N.M.", conference_short: "Lone Star", division: "D-II" },
        { team_short: "Western Ore.", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Western Wash.", conference_short: "Great Northwest", division: "D-II" },
        { team_short: "Westminster (UT)", conference_short: "RMAC", division: "D-II" },
        { team_short: "Westmont", conference_short: "PacWest", division: "D-II" },
        { team_short: "Wheeling", conference_short: "MEC", division: "D-II" },
        { team_short: "William Jewell", conference_short: "GLVC", division: "D-II" },
        { team_short: "Wilmington (DE)", conference_short: "CACC", division: "D-II" },
        { team_short: "Wingate", conference_short: "SAC", division: "D-II" },
        { team_short: "Winona St.", conference_short: "NSIC", division: "D-II" },
        { team_short: "Winston-Salem", conference_short: "CIAA", division: "D-II" },
        { team_short: "Wis.-Parkside", conference_short: "GLIAC", division: "D-II" },
        { team_short: "Young Harris", conference_short: "Conference Carolinas", division: "D-II" },
    ]

    const divisionThreeTeams = [
        { team_short: "Adrian", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Agnes Scott", conference_short: "CCS", division: "D-III" },
        { team_short: "Albertus Magnus", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Albion", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Albright", conference_short: "MACs", division: "D-III" },
        { team_short: "Alfred", conference_short: "Empire 8", division: "D-III" },
        { team_short: "Alfred St.", conference_short: "AMCC", division: "D-III" },
        { team_short: "Allegheny", conference_short: "PAC", division: "D-III" },
        { team_short: "Alma", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Alvernia", conference_short: "MACs", division: "D-III" },
        { team_short: "Alverno", conference_short: "NACC", division: "D-III" },
        { team_short: "Amherst", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Anderson (IN)", conference_short: "HCAC", division: "D-III" },
        { team_short: "Anna Maria", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Arcadia", conference_short: "MACs", division: "D-III" },
        { team_short: "Asbury", conference_short: "Independent", division: "D-III" },
        { team_short: "Augsburg", conference_short: "MIAC", division: "D-III" },
        { team_short: "Augustana (IL)", conference_short: "CCIW", division: "D-III" },
        { team_short: "Aurora", conference_short: "NACC", division: "D-III" },
        { team_short: "Austin", conference_short: "SCAC", division: "D-III" },
        { team_short: "Averett", conference_short: "ODAC", division: "D-III" },
        { team_short: "Babson", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Baldwin Wallace", conference_short: "OAC", division: "D-III" },
        { team_short: "Bard", conference_short: "Liberty League", division: "D-III" },
        { team_short: "Baruch", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "Bates", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Belhaven", conference_short: "CCS", division: "D-III" },
        { team_short: "Beloit", conference_short: "MWC", division: "D-III" },
        { team_short: "Benedictine (IL)", conference_short: "NACC", division: "D-III" },
        { team_short: "Berea", conference_short: "HCAC", division: "D-III" },
        { team_short: "Berry", conference_short: "SAA", division: "D-III" },
        { team_short: "Bethany (WV)", conference_short: "PAC", division: "D-III" },
        { team_short: "Bethany Lutheran", conference_short: "UMAC", division: "D-III" },
        { team_short: "Bethel (MN)", conference_short: "MIAC", division: "D-III" },
        { team_short: "Blackburn", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Bluffton", conference_short: "HCAC", division: "D-III" },
        { team_short: "Bowdoin", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Brandeis", conference_short: "UAA", division: "D-III" },
        { team_short: "Brevard", conference_short: "USA South", division: "D-III" },
        { team_short: "Bridgewater (VA)", conference_short: "ODAC", division: "D-III" },
        { team_short: "Bridgewater St.", conference_short: "MASCAC", division: "D-III" },
        { team_short: "Brooklyn", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "Bryn Athyn", conference_short: "United East", division: "D-III" },
        { team_short: "Bryn Mawr", conference_short: "Centennial", division: "D-III" },
        { team_short: "Buena Vista", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Buffalo St.", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "Cairn", conference_short: "United East", division: "D-III" },
        { team_short: "Cal Lutheran", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Caltech", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Calvin", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Capital", conference_short: "OAC", division: "D-III" },
        { team_short: "Carleton", conference_short: "MIAC", division: "D-III" },
        { team_short: "Carlow", conference_short: "AMCC", division: "D-III" },
        { team_short: "Carnegie Mellon", conference_short: "UAA", division: "D-III" },
        { team_short: "Carroll (WI)", conference_short: "CCIW", division: "D-III" },
        { team_short: "Carthage", conference_short: "CCIW", division: "D-III" },
        { team_short: "Catholic", conference_short: "Landmark", division: "D-III" },
        { team_short: "CCNY", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "Cedar Crest", conference_short: "United East", division: "D-III" },
        { team_short: "Centenary (LA)", conference_short: "SCAC", division: "D-III" },
        { team_short: "Centenary (NJ)", conference_short: "Atlantic East", division: "D-III" },
        { team_short: "Central (IA)", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Centre", conference_short: "SAA", division: "D-III" },
        { team_short: "Chapman", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Chatham", conference_short: "PAC", division: "D-III" },
        { team_short: "Chris. Newport", conference_short: "C2C", division: "D-III" },
        { team_short: "Claremont-M-S", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Clark (MA)", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Clarkson", conference_short: "Liberty League", division: "D-III" },
        { team_short: "Coast Guard", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Coe", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Colby", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Colby-Sawyer", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Colorado Col.", conference_short: "SCAC", division: "D-III" },
        { team_short: "Concordia (TX)", conference_short: "SCAC", division: "D-III" },
        { team_short: "Concordia Chicago", conference_short: "NACC", division: "D-III" },
        { team_short: "Concordia Wisconsin", conference_short: "NACC", division: "D-III" },
        { team_short: "Concordia-M'head", conference_short: "MIAC", division: "D-III" },
        { team_short: "Connecticut Col.", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Cornell College", conference_short: "MWC", division: "D-III" },
        { team_short: "Cortland", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "Covenant", conference_short: "CCS", division: "D-III" },
        { team_short: "Crown (MN)", conference_short: "UMAC", division: "D-III" },
        { team_short: "Curry", conference_short: "CNE", division: "D-III" },
        { team_short: "CWRU", conference_short: "UAA", division: "D-III" },
        { team_short: "Dallas", conference_short: "SCAC", division: "D-III" },
        { team_short: "Dean", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Delaware Valley", conference_short: "MACs", division: "D-III" },
        { team_short: "Denison", conference_short: "NCAC", division: "D-III" },
        { team_short: "DePauw", conference_short: "NCAC", division: "D-III" },
        { team_short: "DeSales", conference_short: "MACs", division: "D-III" },
        { team_short: "Dickinson", conference_short: "Centennial", division: "D-III" },
        { team_short: "Dominican (IL)", conference_short: "NACC", division: "D-III" },
        { team_short: "Drew", conference_short: "Landmark", division: "D-III" },
        { team_short: "Dubuque", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Earlham", conference_short: "HCAC", division: "D-III" },
        { team_short: "East Tex. Baptist", conference_short: "ASC", division: "D-III" },
        { team_short: "East. Mennonite", conference_short: "ODAC", division: "D-III" },
        { team_short: "Eastern", conference_short: "MACs", division: "D-III" },
        { team_short: "Eastern Conn. St.", conference_short: "Little East", division: "D-III" },
        { team_short: "Eastern Nazarene", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "Edgewood", conference_short: "NACC", division: "D-III" },
        { team_short: "Elizabethtown", conference_short: "Landmark", division: "D-III" },
        { team_short: "Elmhurst", conference_short: "CCIW", division: "D-III" },
        { team_short: "Elmira", conference_short: "Empire 8", division: "D-III" },
        { team_short: "Elms", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Emerson", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Emmanuel (MA)", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Emory", conference_short: "UAA", division: "D-III" },
        { team_short: "Endicott", conference_short: "CNE", division: "D-III" },
        { team_short: "Eureka", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Farmingdale St.", conference_short: "Skyline", division: "D-III" },
        { team_short: "FDU-Florham", conference_short: "MACs", division: "D-III" },
        { team_short: "Ferrum", conference_short: "ODAC", division: "D-III" },
        { team_short: "Fitchburg St.", conference_short: "MASCAC", division: "D-III" },
        { team_short: "Fontbonne", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Framingham St.", conference_short: "MASCAC", division: "D-III" },
        { team_short: "Franciscan", conference_short: "PAC", division: "D-III" },
        { team_short: "Franklin", conference_short: "HCAC", division: "D-III" },
        { team_short: "Franklin & Marshall", conference_short: "Centennial", division: "D-III" },
        { team_short: "Fredonia", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "Gallaudet", conference_short: "United East", division: "D-III" },
        { team_short: "Geneva", conference_short: "PAC", division: "D-III" },
        { team_short: "George Fox", conference_short: "NWC", division: "D-III" },
        { team_short: "Gettysburg", conference_short: "Centennial", division: "D-III" },
        { team_short: "Gordon", conference_short: "CNE", division: "D-III" },
        { team_short: "Goucher", conference_short: "Landmark", division: "D-III" },
        { team_short: "Greensboro", conference_short: "USA South", division: "D-III" },
        { team_short: "Greenville", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Grinnell", conference_short: "MWC", division: "D-III" },
        { team_short: "Grove City", conference_short: "PAC", division: "D-III" },
        { team_short: "Guilford", conference_short: "ODAC", division: "D-III" },
        { team_short: "Gustavus Adolphus", conference_short: "MIAC", division: "D-III" },
        { team_short: "Gwynedd Mercy", conference_short: "Atlantic East", division: "D-III" },
        { team_short: "Hamilton", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Hamline", conference_short: "MIAC", division: "D-III" },
        { team_short: "Hampden-Sydney", conference_short: "ODAC", division: "D-III" },
        { team_short: "Hanover", conference_short: "HCAC", division: "D-III" },
        { team_short: "Hardin-Simmons", conference_short: "ASC", division: "D-III" },
        { team_short: "Hartford", conference_short: "CNE", division: "D-III" },
        { team_short: "Hartwick", conference_short: "Empire 8", division: "D-III" },
        { team_short: "Haverford", conference_short: "Centennial", division: "D-III" },
        { team_short: "Heidelberg", conference_short: "OAC", division: "D-III" },
        { team_short: "Hendrix", conference_short: "SAA", division: "D-III" },
        { team_short: "Hilbert", conference_short: "AMCC", division: "D-III" },
        { team_short: "Hiram", conference_short: "NCAC", division: "D-III" },
        { team_short: "Hobart", conference_short: "Liberty League", division: "D-III" },
        { team_short: "Hollins", conference_short: "ODAC", division: "D-III" },
        { team_short: "Hood", conference_short: "MACs", division: "D-III" },
        { team_short: "Hope", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Houghton", conference_short: "Empire 8", division: "D-III" },
        { team_short: "Howard Payne", conference_short: "ASC", division: "D-III" },
        { team_short: "Hunter", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "Huntingdon", conference_short: "CCS", division: "D-III" },
        { team_short: "Husson", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "IIT", conference_short: "NACC", division: "D-III" },
        { team_short: "Ill. Wesleyan", conference_short: "CCIW", division: "D-III" },
        { team_short: "Illinois Col.", conference_short: "MWC", division: "D-III" },
        { team_short: "Immaculata", conference_short: "Atlantic East", division: "D-III" },
        { team_short: "Ithaca", conference_short: "Liberty League", division: "D-III" },
        { team_short: "John Carroll", conference_short: "OAC", division: "D-III" },
        { team_short: "John Jay", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "Johns Hopkins", conference_short: "Centennial", division: "D-III" },
        { team_short: "Juniata", conference_short: "Landmark", division: "D-III" },
        { team_short: "JWU (Providence)", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Kalamazoo", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Kean", conference_short: "NJAC", division: "D-III" },
        { team_short: "Keene St.", conference_short: "Little East", division: "D-III" },
        { team_short: "Kenyon", conference_short: "NCAC", division: "D-III" },
        { team_short: "Keuka", conference_short: "Empire 8", division: "D-III" },
        { team_short: "Keystone", conference_short: "United East", division: "D-III" },
        { team_short: "King's (PA)", conference_short: "MACs", division: "D-III" },
        { team_short: "Knox", conference_short: "MWC", division: "D-III" },
        { team_short: "La Roche", conference_short: "AMCC", division: "D-III" },
        { team_short: "La Verne", conference_short: "SCIAC", division: "D-III" },
        { team_short: "LaGrange", conference_short: "CCS", division: "D-III" },
        { team_short: "Lake Forest", conference_short: "MWC", division: "D-III" },
        { team_short: "Lakeland", conference_short: "NACC", division: "D-III" },
        { team_short: "Lancaster Bible", conference_short: "United East", division: "D-III" },
        { team_short: "Lasell", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Lawrence", conference_short: "MWC", division: "D-III" },
        { team_short: "Lebanon Valley", conference_short: "MACs", division: "D-III" },
        { team_short: "Lehman", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "Lesley", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "LeTourneau", conference_short: "ASC", division: "D-III" },
        { team_short: "Lewis & Clark", conference_short: "NWC", division: "D-III" },
        { team_short: "Linfield", conference_short: "NWC", division: "D-III" },
        { team_short: "Loras", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Luther", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Lycoming", conference_short: "Landmark", division: "D-III" },
        { team_short: "Lynchburg", conference_short: "ODAC", division: "D-III" },
        { team_short: "Macalester", conference_short: "MIAC", division: "D-III" },
        { team_short: "Maine Maritime", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "Manchester", conference_short: "HCAC", division: "D-III" },
        { team_short: "Manhattanville", conference_short: "Skyline", division: "D-III" },
        { team_short: "Maranatha Baptist", conference_short: "Independent", division: "D-III" },
        { team_short: "Marian (WI)", conference_short: "NACC", division: "D-III" },
        { team_short: "Marietta", conference_short: "OAC", division: "D-III" },
        { team_short: "Martin Luther", conference_short: "UMAC", division: "D-III" },
        { team_short: "Mary Baldwin", conference_short: "USA South", division: "D-III" },
        { team_short: "Mary Hardin-Baylor", conference_short: "ASC", division: "D-III" },
        { team_short: "Mary Washington", conference_short: "C2C", division: "D-III" },
        { team_short: "Marymount (VA)", conference_short: "Atlantic East", division: "D-III" },
        { team_short: "Maryville (TN)", conference_short: "CCS", division: "D-III" },
        { team_short: "Marywood", conference_short: "Atlantic East", division: "D-III" },
        { team_short: "Mass. Maritime", conference_short: "MASCAC", division: "D-III" },
        { team_short: "McDaniel", conference_short: "Centennial", division: "D-III" },
        { team_short: "MCLA", conference_short: "MASCAC", division: "D-III" },
        { team_short: "McMurry", conference_short: "SCAC", division: "D-III" },
        { team_short: "Me.-Farmington", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "Me.-Presque Isle", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "Medgar Evers", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "Merchant Marine", conference_short: "Skyline", division: "D-III" },
        { team_short: "Meredith", conference_short: "USA South", division: "D-III" },
        { team_short: "Messiah", conference_short: "MACs", division: "D-III" },
        { team_short: "Methodist", conference_short: "USA South", division: "D-III" },
        { team_short: "Middlebury", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Millikin", conference_short: "CCIW", division: "D-III" },
        { team_short: "Millsaps", conference_short: "SAA", division: "D-III" },
        { team_short: "Minn.-Morris", conference_short: "UMAC", division: "D-III" },
        { team_short: "Misericordia", conference_short: "MACs", division: "D-III" },
        { team_short: "MIT", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Mitchell", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Monmouth (IL)", conference_short: "MWC", division: "D-III" },
        { team_short: "Montclair St.", conference_short: "NJAC", division: "D-III" },
        { team_short: "Moravian", conference_short: "Landmark", division: "D-III" },
        { team_short: "Mount Aloysius", conference_short: "AMCC", division: "D-III" },
        { team_short: "Mount Holyoke", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Mount Mary", conference_short: "C2C", division: "D-III" },
        { team_short: "Mount Union", conference_short: "OAC", division: "D-III" },
        { team_short: "MSOE", conference_short: "NACC", division: "D-III" },
        { team_short: "Mt. St. Joseph", conference_short: "HCAC", division: "D-III" },
        { team_short: "Mt. St. Mary (NY)", conference_short: "Skyline", division: "D-III" },
        { team_short: "Muhlenberg", conference_short: "Centennial", division: "D-III" },
        { team_short: "Muskingum", conference_short: "OAC", division: "D-III" },
        { team_short: "MUW", conference_short: "SLIAC", division: "D-III" },
        { team_short: "N.C. Wesleyan", conference_short: "USA South", division: "D-III" },
        { team_short: "Nazareth", conference_short: "Empire 8", division: "D-III" },
        { team_short: "Neb. Wesleyan", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Neumann", conference_short: "Atlantic East", division: "D-III" },
        { team_short: "New England Col.", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "New Jersey City", conference_short: "NJAC", division: "D-III" },
        { team_short: "Nichols", conference_short: "CNE", division: "D-III" },
        { team_short: "North Central (IL)", conference_short: "CCIW", division: "D-III" },
        { team_short: "North Central (MN)", conference_short: "UMAC", division: "D-III" },
        { team_short: "North Park", conference_short: "CCIW", division: "D-III" },
        { team_short: "Northland", conference_short: "UMAC", division: "D-III" },
        { team_short: "Northwestern-St. Paul", conference_short: "UMAC", division: "D-III" },
        { team_short: "Norwich", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Notre Dame (MD)", conference_short: "United East", division: "D-III" },
        { team_short: "NYU", conference_short: "UAA", division: "D-III" },
        { team_short: "Oberlin", conference_short: "NCAC", division: "D-III" },
        { team_short: "Occidental", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Oglethorpe", conference_short: "SAA", division: "D-III" },
        { team_short: "Ohio Northern", conference_short: "OAC", division: "D-III" },
        { team_short: "Ohio Wesleyan", conference_short: "NCAC", division: "D-III" },
        { team_short: "Old Westbury", conference_short: "Skyline", division: "D-III" },
        { team_short: "Olivet", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Oswego St.", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "Otterbein", conference_short: "OAC", division: "D-III" },
        { team_short: "Ozarks (AR)", conference_short: "SCAC", division: "D-III" },
        { team_short: "Pacific (OR)", conference_short: "NWC", division: "D-III" },
        { team_short: "Pacific Lutheran", conference_short: "NWC", division: "D-III" },
        { team_short: "Penn College", conference_short: "United East", division: "D-III" },
        { team_short: "Penn St. Brandywine", conference_short: "Independent", division: "D-III" },
        { team_short: "Penn St. Harrisburg", conference_short: "United East", division: "D-III" },
        { team_short: "Penn St.-Abington", conference_short: "United East", division: "D-III" },
        { team_short: "Penn St.-Altoona", conference_short: "AMCC", division: "D-III" },
        { team_short: "Penn St.-Behrend", conference_short: "AMCC", division: "D-III" },
        { team_short: "Penn St.-Berks", conference_short: "United East", division: "D-III" },
        { team_short: "Pfeiffer", conference_short: "USA South", division: "D-III" },
        { team_short: "Piedmont", conference_short: "CCS", division: "D-III" },
        { team_short: "Pitt.-Bradford", conference_short: "AMCC", division: "D-III" },
        { team_short: "Pitt.-Greensburg", conference_short: "AMCC", division: "D-III" },
        { team_short: "Plattsburgh St.", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "Plymouth St.", conference_short: "Little East", division: "D-III" },
        { team_short: "Pomona-Pitzer", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Pratt", conference_short: "Atlantic East", division: "D-III" },
        { team_short: "Principia", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Puget Sound", conference_short: "NWC", division: "D-III" },
        { team_short: "Purchase", conference_short: "Skyline", division: "D-III" },
        { team_short: "Ramapo", conference_short: "NJAC", division: "D-III" },
        { team_short: "Randolph", conference_short: "ODAC", division: "D-III" },
        { team_short: "Randolph-Macon", conference_short: "ODAC", division: "D-III" },
        { team_short: "Redlands", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Regent", conference_short: "NCCAA", division: "D-III" },
        { team_short: "Regis (MA)", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Rensselaer", conference_short: "Liberty League", division: "D-III" },
        { team_short: "Rhode Island Col.", conference_short: "Little East", division: "D-III" },
        { team_short: "Rhodes", conference_short: "SAA", division: "D-III" },
        { team_short: "Ripon", conference_short: "MWC", division: "D-III" },
        { team_short: "RIT", conference_short: "Liberty League", division: "D-III" },
        { team_short: "Rivier", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Roanoke", conference_short: "ODAC", division: "D-III" },
        { team_short: "Rochester (NY)", conference_short: "UAA", division: "D-III" },
        { team_short: "Rockford", conference_short: "NACC", division: "D-III" },
        { team_short: "Roger Williams", conference_short: "CNE", division: "D-III" },
        { team_short: "Rose-Hulman", conference_short: "HCAC", division: "D-III" },
        { team_short: "Rosemont", conference_short: "United East", division: "D-III" },
        { team_short: "Rowan", conference_short: "NJAC", division: "D-III" },
        { team_short: "Russell Sage", conference_short: "Empire 8", division: "D-III" },
        { team_short: "Rutgers-Camden", conference_short: "NJAC", division: "D-III" },
        { team_short: "Rutgers-Newark", conference_short: "NJAC", division: "D-III" },
        { team_short: "Saint Benedict", conference_short: "MIAC", division: "D-III" },
        { team_short: "Saint Elizabeth", conference_short: "United East", division: "D-III" },
        { team_short: "Saint John's (MN)", conference_short: "MIAC", division: "D-III" },
        { team_short: "Saint Joseph (CT)", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Saint Mary's (MN)", conference_short: "MIAC", division: "D-III" },
        { team_short: "Saint Vincent", conference_short: "PAC", division: "D-III" },
        { team_short: "Salem (NC)", conference_short: "USA South", division: "D-III" },
        { team_short: "Salem St.", conference_short: "MASCAC", division: "D-III" },
        { team_short: "Salisbury", conference_short: "C2C", division: "D-III" },
        { team_short: "Salve Regina", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Sarah Lawrence", conference_short: "Skyline", division: "D-III" },
        { team_short: "Schreiner", conference_short: "SCAC", division: "D-III" },
        { team_short: "Scranton", conference_short: "Landmark", division: "D-III" },
        { team_short: "Sewanee", conference_short: "SAA", division: "D-III" },
        { team_short: "Shenandoah", conference_short: "ODAC", division: "D-III" },
        { team_short: "Simmons", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "Simpson", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Skidmore", conference_short: "Liberty League", division: "D-III" },
        { team_short: "Smith", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Southern Me.", conference_short: "Little East", division: "D-III" },
        { team_short: "Southern Va.", conference_short: "USA South", division: "D-III" },
        { team_short: "Southwestern (TX)", conference_short: "SCAC", division: "D-III" },
        { team_short: "Spalding", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Springfield", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "St. Catherine", conference_short: "MIAC", division: "D-III" },
        { team_short: "St. John Fisher", conference_short: "Empire 8", division: "D-III" },
        { team_short: "St. Joseph's (Brkln)", conference_short: "Skyline", division: "D-III" },
        { team_short: "St. Joseph's (L.I.)", conference_short: "Skyline", division: "D-III" },
        { team_short: "St. Joseph's (ME)", conference_short: "Great Northeast", division: "D-III" },
        { team_short: "St. Lawrence", conference_short: "Liberty League", division: "D-III" },
        { team_short: "St. Mary's (IN)", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "St. Mary's (MD)", conference_short: "United East", division: "D-III" },
        { team_short: "St. Norbert", conference_short: "NACC", division: "D-III" },
        { team_short: "St. Olaf", conference_short: "MIAC", division: "D-III" },
        { team_short: "St. Scholastica", conference_short: "MIAC", division: "D-III" },
        { team_short: "St. Thomas (TX)", conference_short: "SCAC", division: "D-III" },
        { team_short: "Stevens", conference_short: "MACs", division: "D-III" },
        { team_short: "Stevenson", conference_short: "MACs", division: "D-III" },
        { team_short: "Stockton", conference_short: "NJAC", division: "D-III" },
        { team_short: "Suffolk", conference_short: "CNE", division: "D-III" },
        { team_short: "Sul Ross St.", conference_short: "Lone Star", division: "D-III" },
        { team_short: "SUNY Brockport", conference_short: "Empire 8", division: "D-III" },
        { team_short: "SUNY Canton", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "SUNY Cobleskill", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "SUNY Delhi", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "SUNY Geneseo", conference_short: "Empire 8", division: "D-III" },
        { team_short: "SUNY Maritime", conference_short: "Skyline", division: "D-III" },
        { team_short: "SUNY Morrisville", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "SUNY New Paltz", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "SUNY Oneonta", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "SUNY Poly", conference_short: "Empire 8", division: "D-III" },
        { team_short: "SUNY Potsdam", conference_short: "SUNYAC", division: "D-III" },
        { team_short: "Susquehanna", conference_short: "Landmark", division: "D-III" },
        { team_short: "Swarthmore", conference_short: "Centennial", division: "D-III" },
        { team_short: "Sweet Briar", conference_short: "ODAC", division: "D-III" },
        { team_short: "TCNJ", conference_short: "NJAC", division: "D-III" },
        { team_short: "Texas Lutheran", conference_short: "SCAC", division: "D-III" },
        { team_short: "Texas-Dallas", conference_short: "Lone Star", division: "D-III" },
        { team_short: "Thiel", conference_short: "PAC", division: "D-III" },
        { team_short: "Thomas (ME)", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "Transylvania", conference_short: "HCAC", division: "D-III" },
        { team_short: "Trine", conference_short: "Michigan Intercol. Ath. Assn.", division: "D-III" },
        { team_short: "Trinity (CT)", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Trinity (TX)", conference_short: "SCAC", division: "D-III" },
        { team_short: "Trinity Washington", conference_short: "Independent", division: "D-III" },
        { team_short: "Tufts", conference_short: "NESCAC", division: "D-III" },
        { team_short: "U New England", conference_short: "CNE", division: "D-III" },
        { team_short: "UC Santa Cruz", conference_short: "C2C", division: "D-III" },
        { team_short: "UChicago", conference_short: "UAA", division: "D-III" },
        { team_short: "UMass Boston", conference_short: "Little East", division: "D-III" },
        { team_short: "UMass Dartmouth", conference_short: "Little East", division: "D-III" },
        { team_short: "UMSV", conference_short: "Skyline", division: "D-III" },
        { team_short: "Union (NY)", conference_short: "Liberty League", division: "D-III" },
        { team_short: "Ursinus", conference_short: "Centennial", division: "D-III" },
        { team_short: "Utica", conference_short: "Empire 8", division: "D-III" },
        { team_short: "UW-River Falls", conference_short: "WIAC", division: "D-III" },
        { team_short: "Va. Wesleyan", conference_short: "ODAC", division: "D-III" },
        { team_short: "Valley Forge", conference_short: "United East", division: "D-III" },
        { team_short: "Vassar", conference_short: "Liberty League", division: "D-III" },
        { team_short: "VTSU Castleton", conference_short: "Little East", division: "D-III" },
        { team_short: "VTSU Lyndon", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "VTSU-Johnson", conference_short: "North Atlantic", division: "D-III" },
        { team_short: "Wabash", conference_short: "NCAC", division: "D-III" },
        { team_short: "Warren Wilson", conference_short: "C2C", division: "D-III" },
        { team_short: "Wartburg", conference_short: "American Rivers", division: "D-III" },
        { team_short: "Wash. & Jeff.", conference_short: "PAC", division: "D-III" },
        { team_short: "Wash. & Lee", conference_short: "ODAC", division: "D-III" },
        { team_short: "Washington Col.", conference_short: "Centennial", division: "D-III" },
        { team_short: "WashU", conference_short: "UAA", division: "D-III" },
        { team_short: "Waynesburg", conference_short: "PAC", division: "D-III" },
        { team_short: "Webster", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Wellesley", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Wentworth", conference_short: "CNE", division: "D-III" },
        { team_short: "Wesleyan (CT)", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Wesleyan (GA)", conference_short: "CCS", division: "D-III" },
        { team_short: "WestConn", conference_short: "Little East", division: "D-III" },
        { team_short: "Western New Eng.", conference_short: "CNE", division: "D-III" },
        { team_short: "Westfield St.", conference_short: "MASCAC", division: "D-III" },
        { team_short: "Westminster (MO)", conference_short: "SLIAC", division: "D-III" },
        { team_short: "Westminster (PA)", conference_short: "PAC", division: "D-III" },
        { team_short: "Wheaton (IL)", conference_short: "CCIW", division: "D-III" },
        { team_short: "Wheaton (MA)", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Whitman", conference_short: "NWC", division: "D-III" },
        { team_short: "Whittier", conference_short: "SCIAC", division: "D-III" },
        { team_short: "Whitworth", conference_short: "NWC", division: "D-III" },
        { team_short: "Widener", conference_short: "MACs", division: "D-III" },
        { team_short: "Wilkes", conference_short: "Landmark", division: "D-III" },
        { team_short: "Willamette", conference_short: "NWC", division: "D-III" },
        { team_short: "William Peace", conference_short: "USA South", division: "D-III" },
        { team_short: "Williams", conference_short: "NESCAC", division: "D-III" },
        { team_short: "Wilmington (OH)", conference_short: "OAC", division: "D-III" },
        { team_short: "Wilson", conference_short: "United East", division: "D-III" },
        { team_short: "Wis. Lutheran", conference_short: "NACC", division: "D-III" },
        { team_short: "Wis.-Eau Claire", conference_short: "WIAC", division: "D-III" },
        { team_short: "Wis.-La Crosse", conference_short: "WIAC", division: "D-III" },
        { team_short: "Wis.-Oshkosh", conference_short: "WIAC", division: "D-III" },
        { team_short: "Wis.-Platteville", conference_short: "WIAC", division: "D-III" },
        { team_short: "Wis.-Stevens Point", conference_short: "WIAC", division: "D-III" },
        { team_short: "Wis.-Stout", conference_short: "WIAC", division: "D-III" },
        { team_short: "Wis.-Superior", conference_short: "UMAC", division: "D-III" },
        { team_short: "Wis.-Whitewater", conference_short: "WIAC", division: "D-III" },
        { team_short: "Wittenberg", conference_short: "NCAC", division: "D-III" },
        { team_short: "Wm. Paterson", conference_short: "NJAC", division: "D-III" },
        { team_short: "Wooster", conference_short: "NCAC", division: "D-III" },
        { team_short: "Worcester St.", conference_short: "MASCAC", division: "D-III" },
        { team_short: "WPI", conference_short: "NEWMAC", division: "D-III" },
        { team_short: "Yeshiva", conference_short: "Skyline", division: "D-III" },
        { team_short: "York (NY)", conference_short: "CUNYAC", division: "D-III" },
        { team_short: "York (PA)", conference_short: "MACs", division: "D-III" },
    ]

        const csvDivisionOneUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d1_24.csv';
        const csvDivisionTwoUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d2_24.csv';
        const csvDivisionThreeUrl = 'https://raw.githubusercontent.com/widbuntu/vbdb-info/refs/heads/main/data/ncaaw_d3_24.csv';
        const csvDivisionOneData = await fetchAndParseCSV(csvDivisionOneUrl);
        const csvDivisionTwoData = await fetchAndParseCSV(csvDivisionTwoUrl);
        const csvDivisionThreeData = await fetchAndParseCSV(csvDivisionThreeUrl);

        // Set up event listeners
        document.getElementById('d1-conferences-results-dropdown').addEventListener('change', populateTeams('d1', divisionOneTeams));
        document.getElementById('d2-conferences-results-dropdown').addEventListener('change', populateTeams('d2', divisionTwoTeams));
        document.getElementById('d3-conferences-results-dropdown').addEventListener('change', populateTeams('d3', divisionThreeTeams));
    
        // Initial call to populate dropdowns
        populateConferences('d1', divisionOneTeams);
        populateConferences('d2', divisionTwoTeams);
        populateConferences('d3', divisionThreeTeams);

        populateTable('d1', csvDivisionOneData);
        populateTable('d2', csvDivisionTwoData);
        populateTable('d3', csvDivisionThreeData);

        document.getElementById('d1-conferences-results-dropdown').addEventListener('change', () => populateTable('d1', csvDivisionOneData));
        document.getElementById('d1-teams-results-dropdown').addEventListener('change', () => populateTable('d1', csvDivisionOneData));
        document.getElementById('d1-startDate').addEventListener('change', () => populateTable('d1', csvDivisionOneData));
        document.getElementById('d1-endDate').addEventListener('change', () => populateTable('d1', csvDivisionOneData));

        document.getElementById('d2-conferences-results-dropdown').addEventListener('change', () => populateTable('d2', csvDivisionTwoData));
        document.getElementById('d2-teams-results-dropdown').addEventListener('change', () => populateTable('d2', csvDivisionTwoData));
        document.getElementById('d2-startDate').addEventListener('change', () => populateTable('d2', csvDivisionTwoData));
        document.getElementById('d2-endDate').addEventListener('change', () => populateTable('d2', csvDivisionTwoData));

        document.getElementById('d3-conferences-results-dropdown').addEventListener('change', () => populateTable('d3', csvDivisionThreeData));
        document.getElementById('d3-teams-results-dropdown').addEventListener('change', () => populateTable('d3', csvDivisionThreeData));
        document.getElementById('d3-startDate').addEventListener('change', () => populateTable('d3', csvDivisionThreeData));
        document.getElementById('d3-endDate').addEventListener('change', () => populateTable('d3', csvDivisionThreeData));
}