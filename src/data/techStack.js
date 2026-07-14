// ============================================================
//  TECH STACK REGISTRY
//  Maps a technology to its local logo SVG + brand color.
//  `dark: true` means the logo is near-black, so the UI gives
//  it a light chip in dark mode to keep it visible.
//  Logos live in src/assets/logos (from simpleicons.org).
// ============================================================
import react from "../assets/logos/react.svg";
import nextjs from "../assets/logos/nextdotjs.svg";
import typescript from "../assets/logos/typescript.svg";
import javascript from "../assets/logos/javascript.svg";
import html5 from "../assets/logos/html5.svg";
import css from "../assets/logos/css.svg";
import tailwind from "../assets/logos/tailwindcss.svg";
import bootstrap from "../assets/logos/bootstrap.svg";
import redux from "../assets/logos/redux.svg";
import reactquery from "../assets/logos/reactquery.svg";
import nodejs from "../assets/logos/nodedotjs.svg";
import express from "../assets/logos/express.svg";
import mongodb from "../assets/logos/mongodb.svg";
import mysql from "../assets/logos/mysql.svg";
import python from "../assets/logos/python.svg";
import pandas from "../assets/logos/pandas.svg";
import openai from "../assets/logos/openai.svg";
import copilot from "../assets/logos/githubcopilot.svg";
import git from "../assets/logos/git.svg";
import github from "../assets/logos/github.svg";
import docker from "../assets/logos/docker.svg";
import aws from "../assets/logos/amazonwebservices.svg";
import vite from "../assets/logos/vite.svg";
import figma from "../assets/logos/figma.svg";
import jwt from "../assets/logos/jsonwebtokens.svg";
import jest from "../assets/logos/jest.svg";
import storybook from "../assets/logos/storybook.svg";
import nx from "../assets/logos/nx.svg";
import turborepo from "../assets/logos/turborepo.svg";

// name → { logo, color, dark? }
export const tech = {
  React: { logo: react, color: "#61DAFB" },
  "Next.js": { logo: nextjs, color: "#000000", dark: true },
  TypeScript: { logo: typescript, color: "#3178C6" },
  JavaScript: { logo: javascript, color: "#F7DF1E" },
  HTML5: { logo: html5, color: "#E34F26" },
  CSS3: { logo: css, color: "#663399" },
  "Tailwind CSS": { logo: tailwind, color: "#06B6D4" },
  Bootstrap: { logo: bootstrap, color: "#7952B3" },
  Redux: { logo: redux, color: "#764ABC" },
  "React Query": { logo: reactquery, color: "#FF4154" },
  "Node.js": { logo: nodejs, color: "#5FA04E" },
  Express: { logo: express, color: "#000000", dark: true },
  "Express.js": { logo: express, color: "#000000", dark: true },
  MongoDB: { logo: mongodb, color: "#47A248" },
  MySQL: { logo: mysql, color: "#4479A1" },
  Python: { logo: python, color: "#3776AB" },
  Pandas: { logo: pandas, color: "#150458", dark: true },
  OpenAI: { logo: openai, color: "#412991" },
  "OpenAI API": { logo: openai, color: "#412991" },
  "GitHub Copilot": { logo: copilot, color: "#000000", dark: true },
  Git: { logo: git, color: "#F05032" },
  GitHub: { logo: github, color: "#181717", dark: true },
  Docker: { logo: docker, color: "#2496ED" },
  AWS: { logo: aws, color: "#FF9900" },
  Vite: { logo: vite, color: "#646CFF" },
  Figma: { logo: figma, color: "#F24E1E" },
  JWT: { logo: jwt, color: "#000000", dark: true },
  Jest: { logo: jest, color: "#C21325" },
  Storybook: { logo: storybook, color: "#FF4785" },
  Nx: { logo: nx, color: "#143055", dark: true },
  Turborepo: { logo: turborepo, color: "#EF4444" },
};

// The curated set shown as the big logo grid + marquee (order matters).
export const featuredTech = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Python",
  "Redux",
  "React Query",
  "OpenAI",
  "GitHub Copilot",
  "Git",
  "Docker",
  "AWS",
  "Figma",
  "Vite",
  "HTML5",
  "CSS3",
  "Bootstrap",
];

// Helper: resolve a skill string to a tech entry (loose match).
export function resolveTech(name) {
  if (tech[name]) return tech[name];
  const key = Object.keys(tech).find(
    (k) => name.toLowerCase().includes(k.toLowerCase())
  );
  return key ? tech[key] : null;
}
