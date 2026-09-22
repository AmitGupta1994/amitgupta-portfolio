import * as migration_20260918_143456_initial from './20260918_143456_initial';

export const migrations = [
  {
    up: migration_20260918_143456_initial.up,
    down: migration_20260918_143456_initial.down,
    name: '20260918_143456_initial'
  },
];
