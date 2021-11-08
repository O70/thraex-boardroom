// import store from '@/store'
// console.debug(1, store)
/* store.registerModule('verify', {
  state: {
    code: null
  },
  mutations: {
    SET_CODE: (state, code) => (state.code = code)
  },
  actions: {
    set: ({ commit }, code) => commit('SET_CODE', code),
    clear: ({ commit }) => commit('SET_CODE')
  }
}) */

let store
import('@/store').then(module => {
  console.debug('async:', module)
  store = module.default
  store.registerModule('verify', {
    namespaced: true,
    state: {
      code: null
    },
    mutations: {
      SET_CODE: (state, code) => (state.code = code)
    },
    actions: {
      set: ({ commit }, code) => commit('SET_CODE', code),
      clear: ({ commit }) => commit('SET_CODE')
    }
  })
})

const VERIFY_PATH = '/router/verify'
const MOCK_CODE = 700000

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

function valid(to, next) {
  console.debug(2, store)
  const hasCode = MOCK_CODE === store.state.verify.code
  return hasCode ? next : new Proxy(next, {
    apply(target, thisArg, args) {
      // console.log('proxyNext1')
      // console.log(to)
      // console.log('***************')
      return Reflect.apply(target, thisArg, [{ path: VERIFY_PATH, query: {
        to: to.path,
        qeury: to.query,
        params: to.params
      }}])
    }
  })
}

function proxyNext([to, from, next]) {
  const newNext = needVerify(to) ? valid(to, next) : next

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
