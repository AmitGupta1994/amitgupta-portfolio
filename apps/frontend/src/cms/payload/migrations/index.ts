import * as migration_20260918_143456_initial from './20260918_143456_initial';
import * as migration_20260925_033556_research_sites from './20260925_033556_research_sites';

export const migrations = [
  {
    up: migration_20260918_143456_initial.up,
    down: migration_20260918_143456_initial.down,
    name: '20260918_143456_initial',
  },
  {
    up: migration_20260925_033556_research_sites.up,
    down: migration_20260925_033556_research_sites.down,
    name: '20260925_033556_research_sites'
  },
];
