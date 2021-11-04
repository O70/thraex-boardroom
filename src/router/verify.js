export default (to, from, next) => {
  // const proxy = new Proxy(next, {
  //   apply(target, thisArg, args) {
  //     const val = target[prop]
  //     return prop === 'beforeEach' ? proxyBefore(val) : val
  //   }
  // })
  console.debug()

  return next
}
