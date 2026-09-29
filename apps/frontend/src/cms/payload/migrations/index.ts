import * as migration_20260929_093207_initial from './20260929_093207_initial';

export const migrations = [
  {
    up: migration_20260929_093207_initial.up,
    down: migration_20260929_093207_initial.down,
    name: '20260929_093207_initial'
  },
];
