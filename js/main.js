import { loadNavItems } from './nav-bar.js';
import { loadVBDBContent } from './vbdb.js';
import { loadLiveScores } from './live.js';
import { loadResultsContent } from './results.js';
import { loadRankingsContent } from './rankings.js';
import { loadTeamsContent } from './teams.js';
import { loadPlayersContent } from './players.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavItems();
    loadVBDBContent();
    loadLiveScores();
    loadResultsContent();
    loadRankingsContent();
    loadTeamsContent();
    loadPlayersContent();
});