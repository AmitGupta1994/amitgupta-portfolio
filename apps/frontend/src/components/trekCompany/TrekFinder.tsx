"use client";

import { useMemo, useState } from "react";

import type { Difficulty, TrekPackage } from "@/types/trekCompany";
import { DIFFICULTY } from "./format";
import TrekPackageCard from "./TrekPackageCard";

const ANY = "any";
const LENGTHS = [
  { value: ANY, label: "Any length" },
  { value: "short", label: "Up to 9 days", test: (days: number) => days <= 9 },
  { value: "medium", label: "10–14 days", test: (days: number) => days >= 10 && days <= 14 },
  { value: "long", label: "15+ days", test: (days: number) => days >= 15 },
];

const select =
  "rounded-full border border-foreground/15 bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground outline-none backdrop-blur transition-colors focus:border-brand";

/** Every trek, filterable by region, difficulty and length. */
export default function TrekFinder({ treks }: { treks: TrekPackage[] }) {
  const [region, setRegion] = useState(ANY);
  const [difficulty, setDifficulty] = useState<Difficulty | typeof ANY>(ANY);
  const [length, setLength] = useState(ANY);

  const regions = useMemo(() => Array.from(new Set(treks.map((trek) => trek.region).filter(Boolean))) as string[], [treks]);
  const levels = useMemo(
    () => (Object.keys(DIFFICULTY) as Difficulty[]).filter((level) => treks.some((trek) => trek.difficulty === level)),
    [treks]
  );

  const lengthTest = LENGTHS.find((option) => option.value === length)?.test;
  const shown = treks.filter(
    (trek) =>
      (region === ANY || trek.region === region) &&
      (difficulty === ANY || trek.difficulty === difficulty) &&
      (!lengthTest || (trek.days !== undefined && lengthTest(trek.days)))
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filter treks">
        <select aria-label="Region" value={region} onChange={(event) => setRegion(event.target.value)} className={select}>
          <option value={ANY}>All regions</option>
          {regions.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select
          aria-label="Difficulty"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value as Difficulty | typeof ANY)}
          className={select}
        >
          <option value={ANY}>Any difficulty</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {DIFFICULTY[level].label}
            </option>
          ))}
        </select>
        <select aria-label="Length" value={length} onChange={(event) => setLength(event.target.value)} className={select}>
          {LENGTHS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="ml-auto text-sm font-semibold text-muted" aria-live="polite">
          {shown.length} of {treks.length} treks
        </p>
      </div>

      {shown.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((trek) => (
            <li key={trek.id}>
              <TrekPackageCard trek={trek} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-3xl border border-dashed border-foreground/15 p-10 text-center text-muted">
          No trek matches those filters — try widening them, or ask us for a custom route.
        </p>
      )}
    </div>
  );
}
