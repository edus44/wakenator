/** @typedef {import('../../Exchange.js').Wake} Wake */

/** @returns {Wake} */
function recoverWake() {
  return JSON.parse(new URLSearchParams(location.search).get('wake') || '{"name": "Unknown"}')
}

/** @param {Wake} wake */
function printWake(wake) {
  const $name = document.getElementById('name')
  if ($name) $name.textContent = wake.name
  const $host = document.getElementById('host')
  if ($host) $host.textContent = [wake.user, wake.host].filter(Boolean).join('@')
}

async function loadImage() {
  const tags = [
    'attention+seeker',
    'wake+up',
    'listen+to+me',
    'look+at+me',
    'hey+you',
    'hello',
    'please',
  ]

  const tag = tags[Math.floor(Math.random() * tags.length)]
  const res = await fetch(
    'http://api.giphy.com/v1/gifs/random?api_key=4ApXtggHE6OgVhsuhvGyD4MQQHqRLW9t&tag=' + tag
  )
  const body = await res.json()
  const url = body.data.images.original.url

  const $img = document.getElementById('picture')
  if ($img) $img.style.backgroundImage = `url(${url})`
}

function playSound() {
  const audio = new Audio('./sound.mp3')
  audio.loop = true
  audio.play()

  return () => {
    let vol = 1
    const interval = 50
    const fadeout = setInterval(function () {
      if (vol > 0) {
        vol -= 0.1
        audio.volume = vol
        console.log(vol)
      } else {
        clearInterval(fadeout)
      }
    }, interval)
  }
}

function followMouse() {
  let mouseX = 0
  let mouseY = 0
  let xp = 0
  let yp = 0

  const circle = document.getElementById('circle')

  document.addEventListener('mousemove', function (e) {
    mouseX = e.pageX - 30
    mouseY = e.pageY - 40
  })

  function animate() {
    if (!circle) return
    xp += (mouseX - xp) / 20
    yp += (mouseY - yp) / 20
    circle.style.left = xp + 'px'
    circle.style.top = yp + 'px'
    requestAnimationFrame(animate)
  }
  animate()
}

/** @param {ReturnType<typeof playSound>} stopSound */
function bindClick(stopSound) {
  document.addEventListener('click', () => {
    document.querySelector('.band')?.classList.add('away')
    stopSound()
    setTimeout(() => {
      window.require('electron').ipcRenderer.send('close')
    }, 600)
  })
}
async function main() {
  const wake = recoverWake()
  printWake(wake)
  const stopSound = playSound()
  bindClick(stopSound)
  followMouse()
  await loadImage()
}

main()
