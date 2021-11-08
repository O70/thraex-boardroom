function proxyNext(to, from, next) {
  return new Proxy(next, {
    apply(target, thisArg, args) {
      console.log('proxyNext')
      // console.group('Proxy before enter fn:')
      // // console.log(target)
      // // console.log(thisArg)
      // console.log(args)
      // console.groupEnd()
      // const a = target('/ns/booking/periodic')
      // const a = target.apply(thisArg, ['/ns/booking/periodic'])
      // console.log(a)
      // return a
      // return target(...args)
      const arg = to.path === '/boardroom/booking/my' ? ['/verify'] : args
      return Reflect.apply(target, thisArg, arg)
    }
  })
}

function proxyFn(dest) {
  return new Proxy(dest, {
    apply: (target, thisArg, [to, from, next]) => {
      console.log('proxyFn')
      // return target.apply(thisArg, [to, from, proxyNext(to, from, next)])
      // return target.apply(thisArg, [to, from, next])
      return Reflect.apply(target, thisArg, [to, from, proxyNext(to, from, next)])
    }
  })
}

function proxyBeforeEnter(dest) {
  return new Proxy(dest, {
    apply: (target, thisArg, [arg]) => {
      console.log('proxyBeforeEnter')
      // return target.call(thisArg, proxyFn(arg))
      return Reflect.apply(target, thisArg, [proxyFn(arg)])
    }
  })
}

export default router => {
  return new Proxy(router, {
    get(target, prop) {
      const val = target[prop]
      return prop === 'beforeEach' ? proxyBeforeEnter(val) : val
    }
  })
}
