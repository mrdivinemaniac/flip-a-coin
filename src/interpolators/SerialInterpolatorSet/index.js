class SerialInterpolatorSet {
  constructor (interpolators) {
    this.__items = interpolators
    this.__currentIdx = 0
  }

  get done () {
    return this.__currentIdx === this.__items.length
  }

  reset () {
    this.__currentIdx = 0
    this.__items.forEach(item => item.reset())
  }

  update (deltaTime) {
    if (this.done) {
      const lastItem = this.__items[this.__items.length - 1]
      return lastItem.update(deltaTime)
    } else {
      const currentItem = this.__items[this.__currentIdx]
      const val = currentItem.update(deltaTime)
      if (currentItem.done) ++this.__currentIdx
      return val
    }
  }
}

export default SerialInterpolatorSet
