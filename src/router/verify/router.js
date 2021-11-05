const VERIFY_PATH = '/verify'

function parse(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return false

  const [first, ...others] = arr

  return first === undefined ? parse(others) : first
}

function needVerify(route) {
  // console.debug(route)
  const verifys = route.matched.map(({ props }) => {
    const def = props.default || {}
    const prop = typeof def === 'function' ? def(route) : def
    return prop.verify
  }).map(v => v === undefined ? v : Boolean(v)).reverse()
  // console.debug('verifys:', verifys)
  // const c = arr => {
  //   if (!arr || arr.length === 0) return false

  //   console.debug('arr:', arr)
  //   const [first] = arr
  //   return first
  // }
  // console.debug('undfined:', parse())
  // console.debug('number:', parse(1))
  // console.debug('string:', parse('1'))
  // console.debug('empty:', parse([]))
  /* console.group('one:')
  console.debug('one undefined:', parse([undefined]))
  console.debug('one false:', parse([false]))
  console.debug('one true:', parse([true]))
  console.groupEnd() */
  /* console.group('two:')
  console.debug(parse([undefined, undefined].reverse()))
  console.debug(parse([undefined, false].reverse()))
  console.debug(parse([undefined, true].reverse()))
  console.debug('***********')
  console.debug(parse([false, undefined].reverse()))
  console.debug(parse([false, false].reverse()))
  console.debug(parse([false, true].reverse()))
  console.debug('***********')
  console.debug(parse([true, undefined].reverse()))
  console.debug(parse([true, false].reverse()))
  console.debug(parse([true, true].reverse()))
  console.groupEnd() */
  console.group('three:')
  console.debug(parse([true, undefined, undefined].reverse()))
  console.debug(parse([true, undefined, false].reverse()))
  console.debug(parse([true, undefined, true].reverse()))
  console.debug('***********')
  console.debug(parse([true, false, undefined].reverse()))
  console.debug(parse([true, false, false].reverse()))
  console.debug(parse([true, false, true].reverse()))
  console.debug('***********')
  console.debug(parse([true, true, undefined].reverse()))
  console.debug(parse([true, true, false].reverse()))
  console.debug(parse([true, true, true].reverse()))
  console.debug('***********')
  console.groupEnd()
  // console.debug('verifys:', verifys.reverse())
  // console.debug('verifys:', verifys)
  // const [last] = verifys.reverse()
  // console.debug('verifys:', last)

  // return route.path === '/boardroom/booking/my'
  return false
}

function proxyNext([to, from, next]) {
  const newNext = needVerify(to) ? new Proxy(next, {
    apply(target, thisArg, args) {
      console.log('proxyNext1')
      console.log('***************')
      return Reflect.apply(target, thisArg, [VERIFY_PATH])
    }
  }) : next

  return [to, from, newNext]
}

function builder(dest, proxyFn, argFn) {
  const arg = args => argFn ? [proxyFn(argFn(args))] : proxyFn(args)
  const apply = (target, thisArg, args) => Reflect.apply(target, thisArg, arg(args))

  return new Proxy(dest, { apply })
}

export default router => new Proxy(router, {
  get(target, prop) {
    const val = target[prop]
    return prop === 'beforeEach'
      ? builder(val, dest => builder(dest, proxyNext), ([arg]) => arg)
      : val
  }
})
