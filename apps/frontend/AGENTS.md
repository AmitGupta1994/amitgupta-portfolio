# Frontend Agent Instructions

This project is a personal portfolio website built with Next.js, React, TypeScript, Tailwind CSS, and motion experiences powered by GSAP.

## Project goals

- Keep the site polished, modern, and minimal.
- Prioritize a strong personal brand presentation for projects, bio, and contact information.
- Use Tailwind utilities for styling and GSAP for subtle, high-quality animations.
- Maintain fast, responsive, and accessible UI behavior across devices.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## Project structure

- Use the app router in src/app.
- Keep reusable UI in src/components.
- Keep content such as profile details and project information in src/data.
- Prefer small, focused components over large monolithic ones.

## Coding guidelines

- Use server components by default.
- Only turn a component into a client component when interactivity or hooks are required.
- Favor semantic HTML and accessible markup.
- Keep animations tasteful, lightweight, and performance-conscious.
- Avoid unnecessary dependencies; if a new package is needed, justify it clearly.

## Styling rules

- Use Tailwind utility classes for layout, spacing, colors, and responsiveness.
- Keep styling consistent with the existing design language: clean cards, soft borders, neutral surfaces, and strong typography.
- Avoid inline styles unless absolutely necessary.
- Prefer dark/light-friendly classes and accessible contrast.

## Animation rules

- Use GSAP for entrance, scroll-triggered, hover, or section transition effects.
- Keep motion purposeful rather than decorative.
- Ensure animations are smooth, not excessive, and do not hurt usability.
- Respect reduced-motion preferences when possible.

## Content and data

- Update content through the existing data files in src/data rather than hardcoding copy directly in components when possible.
- Keep project information, profile details, and navigation values centralized and easy to edit.

## Quality bar

- Make changes that are simple, readable, and maintainable.
- Ensure the app still builds and linting remains clean after modifications.
- When you finish, verify the relevant checks and summarize what changed.
