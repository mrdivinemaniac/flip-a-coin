import Interpolator from '../../interpolators/Interpolator'
import SerialInterpolatorSet from '../../interpolators/SerialInterpolatorSet'
import ParallelInterpolatorSet from '../../interpolators/ParallelInterpolatorSet'

export function flipAnimation (gameObject) {
  const startY = gameObject.position.y
  const midY = startY + 2
  const endY = midY + 1
  const jump = new Interpolator(startY, midY, 400)
  const slowJump = new Interpolator(midY, endY, 400, Interpolator.EASING.OUT.SINE)
  const stall = new Interpolator(endY, endY, 100)
  const jumpAnim = new SerialInterpolatorSet([
    jump,
    slowJump,
    stall,
    slowJump.reverse(Interpolator.EASING.IN.SINE),
    jump.reverse()
  ])
  const slowFlip = new Interpolator(0, 480, 900)
  const flip = new Interpolator(0, 720, 400)
  const flipAnim = new SerialInterpolatorSet([
    flip,
    slowFlip,
    flip.clone()
  ])
  return new ParallelInterpolatorSet([
    jumpAnim,
    flipAnim
  ])
}
