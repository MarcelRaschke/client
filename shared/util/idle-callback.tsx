import {forceImmediateLogging} from '../local-debug'
import {isMobile, isDebuggingInChrome} from '../constants/platform'

type TimeoutInfo = {
  didTimeout: boolean
  timeRemaining: () => number
}

function immediateCallback(cb: (info: TimeoutInfo) => void): ReturnType<typeof setImmediate> {
  cb({didTimeout: true, timeRemaining: () => 0})
  const r = {
    _onImmediate: () => {},
    hasRef: () => false,
    ref: () => r,
    unref: () => r,
  }
  return r
}

function timeoutFallback(cb: (info: TimeoutInfo) => void): ReturnType<typeof setTimeout> {
  return setTimeout(function () {
    cb({
      didTimeout: true,
      timeRemaining: function () {
        return 0
      },
    })
  }, 20)
}

// Timers in RN in chrome are super problematic. https://github.com/facebook/react-native/issues/4470
const useFallback =
  typeof window === 'undefined' || !window.requestIdleCallback || (isMobile && isDebuggingInChrome)

const requestIdleCallback = forceImmediateLogging
  ? immediateCallback
  : useFallback
  ? timeoutFallback
  : window.requestIdleCallback.bind(window)

const onIdlePromise = (timeout: number = 100): Promise<TimeoutInfo> =>
  new Promise(resolve => requestIdleCallback(resolve, {timeout}))

export {requestIdleCallback, onIdlePromise}
