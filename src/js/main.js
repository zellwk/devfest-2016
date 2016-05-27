import svg4everybody from 'svg4everybody'

// Polyfill for external SVG spritesheets
svg4everybody()

console.log(window.innerWidth)

window.addEventListener('resize', () => {
  console.log(window.innerWidth)
})
