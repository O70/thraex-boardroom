export default (to, from, next) => {
  return new Proxy(next, {
    apply(target, thisArg, args) {
      // const val = target[prop]
      // return prop === 'beforeEach' ? proxyBefore(val) : val
      console.log('v1...', args)
      console.log(to.path)
      const arg = to.path === '/boardroom/booking/my' ? ['/ns/booking/long/term'] : args
      // return Reflect.apply(target, thisArg, args)
      return Reflect.apply(target, thisArg, arg)
      // return target(...args)
      // return target('/ns/booking/long/term')
    }
  })
}
