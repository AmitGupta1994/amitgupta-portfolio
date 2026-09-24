import { describe, it, expect } from 'vitest';
import { mapProject } from '../projects';
import { mapSkillCategory } from '../skills';

describe('mapProject', () => {
  it('flattens the tech stack and stringifies the id', () => {
    const project = mapProject({
      id: 7,
      title: 'Task Management API',
      description: 'A robust backend service.',
      techStack: [{ name: 'Django' }, { name: 'PostgreSQL' }],
      githubUrl: null,
      liveUrl: '#',
      image: null,
      imageUrl: 'https://images.unsplash.com/photo.jpg',
    });

    expect(project).toEqual({
      id: '7',
      title: 'Task Management API',
      description: 'A robust backend service.',
      techStack: ['Django', 'PostgreSQL'],
      githubUrl: '',
      liveUrl: '#',
      imageUrl: 'https://images.unsplash.com/photo.jpg',
    });
  });
});

describe('mapSkillCategory', () => {
  it('uses the stable key as id and defaults visibility on', () => {
    const category = mapSkillCategory({
      id: 3,
      key: 'web',
      title: 'Web & Backend',
      show: null,
      priority: 2,
      items: [{ name: 'Python', rating: 9 }],
    });

    expect(category).toEqual({
      id: 'web',
      title: 'Web & Backend',
      show: true,
      priority: 2,
      items: [{ name: 'Python', rating: 9 }],
    });
  });
});
