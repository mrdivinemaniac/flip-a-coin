class ParallelInterpolatorSet {
  constructor (interpolators) {
    this.__items = interpolators
    this.__done = false
  }

  get done () {
    return this.__done
  }

  reset () {
    this.__items.forEach(item => item.reset())
    this.__done = false
  }

  update (deltaTime) {
    let allDone = true
    const vals = this.__items.map(item => {
      const val = item.update(deltaTime)
      allDone = allDone && item.done
      return val
    })
    if (allDone) { this.__done = true }
    return vals
  }
}

export default ParallelInterpolatorSet
