import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../ProjectCard';

describe('ProjectCard component', () => {
  const sampleProject = {
    title: 'Portfolio Website',
    description: 'Modern portfolio built with Next.js and Tailwind CSS.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/portfolio',
    liveUrl: 'https://example.com',
    imageUrl: 'https://example.com/image.png',
  };

  it('renders project title, description, and tech stack tags', () => {
    render(<ProjectCard {...sampleProject} />);

    expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
    expect(screen.getByText('Modern portfolio built with Next.js and Tailwind CSS.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('renders external links when valid URLs are provided', () => {
    render(<ProjectCard {...sampleProject} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/example/portfolio');

    const liveLink = screen.getByRole('link', { name: /live demo/i });
    expect(liveLink).toHaveAttribute('href', 'https://example.com');
  });

  it('hides GitHub and Live Demo links when URL is placeholder "#"', () => {
    render(
      <ProjectCard
        {...sampleProject}
        githubUrl="#"
        liveUrl="#"
      />
    );

    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument();
  });
});
