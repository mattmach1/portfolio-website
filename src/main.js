import "./style.css";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import { inject } from "@vercel/analytics";

inject();

let vantaEffect;

window.addEventListener("DOMContentLoaded", () => {
  // Accessibility: skip animation if user prefers reduced motion
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  vantaEffect = NET({
    el: "#vanta-bg",
    THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x3fff67,
    backgroundColor: 0x0,
    points: 10,
    maxDistance: 25,
    spacing: 20,
  });
});

window.addEventListener("beforeunload", () => {
  if (vantaEffect) vantaEffect.destroy();
});

const form = document.getElementById("contact-form");
const started = document.getElementById("form_started_at");
started.value = Date.now();

form.addEventListener("submit", (e) => {
  // If the honeypot has content, abort.
  if (form.website && form.website.value) {
    e.preventDefault();
    return;
  }
  // Abort if form is sumbitted in < 2 seconds
  const elapsed = Date.now() - Number(started.value || 0);
  if (elapsed < 2000) {
    e.preventDefault();
    return;
  }
});

window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};
