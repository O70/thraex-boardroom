function needVerify(route) {
  // console.debug(route)
  // const need = route.matched

  // return route.path === '/boardroom/booking/my'
  return true
}

function proxyNext([to, from, next]) {
  console.log('proxyNext')
  /* new Proxy(next, {
    apply(target, thisArg, args) {
      console.log('proxyNext')
      console.log('***************')
      // const arg = to.path === '/boardroom/booking/my' ? ['/verify'] : args
      return Reflect.apply(target, thisArg, args)
    }
  }) */

  const newNext = needVerify(to) ? new Proxy(next, {
    apply(target, thisArg, args) {
      console.log('proxyNext1')
      console.log('***************')
      return Reflect.apply(target, thisArg, args)
    }
  }) : next
  // console.log(newNext)

  return [to, from, newNext]
}

function builder(dest, fn, argFn) {
  const arg = args => argFn ? [fn(argFn(args))] : fn(args)
  const apply = (target, thisArg, args) => Reflect.apply(target, thisArg, arg(args))

  return new Proxy(dest, { apply })
}

export default router => {
  // const proxyFn = dest => builder(dest, proxyNext)
  // const proxyBefore = dest => builder(dest, proxyFn)
  /* const proxyFn = dest => new Proxy(dest, {
    apply: (target, thisArg, args) => {
      console.log('proxyFn...')
      return Reflect.apply(target, thisArg, proxyNext(args))
    }
  })

  const proxyBefore = dest => new Proxy(dest, {
    apply: (target, thisArg, [args]) => {
      console.log('proxyBefore...')
      return Reflect.apply(target, thisArg, [proxyFn(args)])
    }
  }) */

  return new Proxy(router, {
    get(target, prop) {
      const val = target[prop]
      return prop === 'beforeEach'
        ? builder(val, dest => builder(dest, proxyNext), ([arg]) => arg)
        : val
      // return prop === 'beforeEach' ? proxyBefore(val) : val
    }
  })
}
