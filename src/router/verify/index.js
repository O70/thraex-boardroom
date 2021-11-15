import Code from './code'

const VERIFY_PATH = '/router/verify'

function needVerify(route) {
  const verifys = route.matched.map(({ props }) => {
    const def = props.default || {}
    const prop = typeof def === 'function' ? def(route) : def
    return prop.verify
  }).map(v => v === undefined ? v : Boolean(v)).reverse()

  const parse = arr => {
    if (!Array.isArray(arr) || arr.length === 0) return false

    const [first, ...others] = arr

    return first === undefined ? parse(others) : first
  }

  return parse(verifys)
}

function proxyNext([to, from, next]) {
  let newNext = next

  if (needVerify(to) && !Code.validate()) {
    // Opt: Named routes params
    const { path, query } = to
    const newArg = {
      path: VERIFY_PATH,
      query: { path, query }
    }

    newNext = builder(next, null, _ => [newArg])
  }

  return [to, from, newNext]
}

function builder(dest, proxyFn, argFn) {
  const arg = args => argFn ? argFn(proxyFn, args) : proxyFn(args)
  const apply = (target, thisArg, args) => Reflect.apply(target, thisArg, arg(args))

  return new Proxy(dest, { apply })
}

export default router => new Proxy(router, {
  get(target, prop) {
    const val = target[prop]
    return prop === 'beforeEach'
      ? builder(val, dest => builder(dest, proxyNext), (fn, [arg]) => [fn(arg)])
      : val
  }
})
