import * as migration_20260929_093207_initial from './20260929_093207_initial';
import * as migration_20261002_164849_trek_routes from './20261002_164849_trek_routes';
import * as migration_20261005_092125_creatives_site from './20261005_092125_creatives_site';
import * as migration_20261005_100857_voxelate_site from './20261005_100857_voxelate_site';

export const migrations = [
  {
    up: migration_20260929_093207_initial.up,
    down: migration_20260929_093207_initial.down,
    name: '20260929_093207_initial',
  },
  {
    up: migration_20261002_164849_trek_routes.up,
    down: migration_20261002_164849_trek_routes.down,
    name: '20261002_164849_trek_routes',
  },
  {
    up: migration_20261005_092125_creatives_site.up,
    down: migration_20261005_092125_creatives_site.down,
    name: '20261005_092125_creatives_site',
  },
  {
    up: migration_20261005_100857_voxelate_site.up,
    down: migration_20261005_100857_voxelate_site.down,
    name: '20261005_100857_voxelate_site',
  },
];
