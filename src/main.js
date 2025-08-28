import './style.css'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'

let vantaEffect;

window.addEventListener('DOMContentLoaded', () => {
  // Accessibility: skip animation if user prefers reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  vantaEffect = NET({
    el: "#vanta-bg",
    THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3fff67,
    backgroundColor: 0x0,
    points: 10,        
    maxDistance: 25,   
    spacing: 20        
  })
})  

window.addEventListener('beforeunload', () => {
  if (vantaEffect) vantaEffect.destroy()
})

window.onbeforeunload = () => {
  for(const form of document.getElementsByTagName('form')) {
    form.reset();
  }
}

