export default {
  update(el, binding) {
    if (!binding.value.enabled) return

    // Child index
    const idx = Math.max(0, binding.value.index)

    // Get parent and child bounding info
    const parent = el.getBoundingClientRect()
    const child = el.children[idx].getBoundingClientRect()

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
  },
}
