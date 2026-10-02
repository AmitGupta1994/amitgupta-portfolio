import * as migration_20260929_093207_initial from './20260929_093207_initial';
import * as migration_20261002_164849_trek_routes from './20261002_164849_trek_routes';

export const migrations = [
  {
    up: migration_20260929_093207_initial.up,
    down: migration_20260929_093207_initial.down,
    name: '20260929_093207_initial',
  },
  {
    up: migration_20261002_164849_trek_routes.up,
    down: migration_20261002_164849_trek_routes.down,
    name: '20261002_164849_trek_routes'
  },
];
