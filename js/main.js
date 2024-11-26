import { loadNavItems } from './nav-bar.js';
import { loadVBDBContent } from './vbdb.js';
import { loadLiveScores } from './live.js';
import { loadResultsContent, initResults } from './results.js';
import { loadRankingsContent } from './rankings.js';
import { loadTeamsContent } from './teams.js';
import { loadPlayersContent, initPlayers } from './players.js';

document.addEventListener('DOMContentLoaded', () => {
    // Load static navbar and main content
    loadNavItems();
    loadVBDBContent();
    loadLiveScores();

    // Load Results Section
    document.getElementById('results').innerHTML = loadResultsContent();
    initResults();

    // Load Players Section
    document.getElementById('players').innerHTML = loadPlayersContent();
    initPlayers();  // Ensure all dynamic behaviors and data loading are handled

    // Load other content
    loadRankingsContent();
    loadTeamsContent();
});
