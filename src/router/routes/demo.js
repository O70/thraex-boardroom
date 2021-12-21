import Layout from '@/layout'

export default [
  {
    path: '/demo',
    component: Layout,
    meta: { title: 'Demo' },
    children: [
      {
        path: 'sockjs',
        name: 'DemoSockJS',
        component: () => import('@/views/demo/sockjs'),
        meta: { title: 'SockJS' }
      },
      {
        path: 'uploads',
        name: 'DemoUpload',
        component: () => import('@/views/demo/uploads'),
        meta: { title: 'Uploads' }
      }
    ]
  }
]
