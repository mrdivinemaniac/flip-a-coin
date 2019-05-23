class Interpolator {
  constructor (from, to, duration, easingFn = Interpolator.EASING.LINEAR) {
    this.__from = Array.isArray(from) ? from : [from]
    this.__to = Array.isArray(to) ? to : [to]
    this.__duration = duration
    this.__remaining = duration
    this.__easingFn = easingFn
    this.__done = false
  }

  clone (easingFn = this.__easingFn) {
    return new Interpolator(this.__from, this.__to, this.__duration, easingFn)
  }

  reverse (easingFn = this.__easingFn) {
    return new Interpolator(this.__to, this.__from, this.__duration, easingFn)
  }

  reset () {
    this.__remaining = this.__duration
    this.__done = false
  }

  get done () {
    return this.__done
  }

  update (deltaTime) {
    const { __from, __to } = this
    if (this.__done) return this.__to
    const elapsed = this.__duration - this.__remaining
    this.__remaining = this.__remaining - deltaTime
    if (this.__remaining <= 0) {
      this.__done = true
      return this.__to
    }
    const value = elapsed
      ? __from.map((val, index) => {
        return this.__easingFn(elapsed, val, __to[index] - val, this.__duration)
      })
      : this.__from
    return value
  }
}

// REFERENCE: https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
Interpolator.EASING = {
  LINEAR (t, b, c, d) {
    return b + (t / d * c)
  },

  IN: {
    QUAD (t, b, c, d) {
      return c * (t /= d) * t + b
    },

    CUBIC (t, b, c, d) {
      return c * (t /= d) * t * t + b
    },

    QUART (t, b, c, d) {
      return c * (t /= d) * t * t * t + b
    },

    QUINT (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b
    },

    SINE (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },

    EXPO (t, b, c, d) {
      return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },

    CIRC (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },

    ELASTIC (t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c
      if (t === 0) return b; if ((t /= d) === 1) return b + c; if (!p) p = d * 0.3
      if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a)
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
    },

    BACK (t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      return c * (t /= d) * t * ((s + 1) * t - s) + b
    }
  },

  OUT: {
    QUAD (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b
    },

    CUBIC (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b
    },

    QUART (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },

    QUINT (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },

    SINE (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
    },

    EXPO (t, b, c, d) {
      return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },

    CIRC (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },

    ELASTIC (t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c
      if (t === 0) return b; if ((t /= d) === 1) return b + c; if (!p) p = d * 0.3
      if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a)
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
    },

    BACK (t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    }
  },

  IN_OUT: {
    QUAD (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * ((--t) * (t - 2) - 1) + b
    },

    CUBIC (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
      return c / 2 * ((t -= 2) * t * t + 2) + b
    },

    QUART (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    QUINT (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    SINE (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },

    EXPO (t, b, c, d) {
      if (t === 0) return b
      if (t === d) return b + c
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },

    CIRC (t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },

    ELASTIC (t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c
      if (t === 0) return b; if ((t /= d / 2) === 2) return b + c; if (!p) p = d * (0.3 * 1.5)
      if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a)
      if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b
    },

    BACK (t, b, c, d, s) {
      if (s === undefined) s = 1.70158
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
    }
  }
}

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

export default Interpolator
