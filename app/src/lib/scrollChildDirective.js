export default function(idx) {
  if (idx === -1) return

  // Find elements
  const el = document.querySelector('.tray .content')
  const person = document.querySelectorAll('.person')[idx]

  if (idx === 0) {
    el.scrollTop = 0
    return
  }

  // Get parent and child bounding info
  const parent = el.getBoundingClientRect()
  const child = person.getBoundingClientRect()

  // Calc parent top and bottom limits
  const parentTop = el.scrollTop
  const parentBottom = parentTop + parent.height

  // Calc child top and bottom limits
  let childTop = child.top - parent.top + parentTop
  let childBottom = childTop + child.height

  // Apply offsets
  childTop -= 60
  childBottom += 60

  // Scroll top
  if (childTop < parentTop) {
    el.scrollTop = childTop
  }

  // Scroll bottom
  else if (childBottom > parentBottom) {
    el.scrollTop = childBottom - parent.height
  }
}
