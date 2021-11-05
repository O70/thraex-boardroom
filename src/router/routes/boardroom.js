import Layout from '@/layout'

const locales = {
  zh: {
    maintain: '维护',
    boardroom: '会议室',
    booking: '预定',
    my: '我的预定',
    periodic: '周期预定',
    longTerm: '长期预定',
    approve: '审批',
    service: '服务人员查询',
    modify: '修改',
    edit: '编辑'
  },
  en: {
    maintain: 'Maintain',
    boardroom: 'Boardroom',
    booking: 'Booking',
    my: 'My Booking',
    periodic: 'Periodic',
    longTerm: 'Long-term',
    approve: 'Approve',
    service: 'Service',
    modify: 'Modify',
    edit: 'Edit'
  }
}
const locale = navigator.languages.includes('en') ? locales.en : locales.zh

export default [
  // Hide sidebar: [Plan 3]
  {
    path: '/boardroom',
    component: Layout,
    props: route => ({
      verify: true,
      showSidebar: route.meta.sidebar,
      showHeader: route.meta.header
    }),
    meta: { title: locale.boardroom },
    children: [
      {
        path: '',
        name: 'BrBookingStatistics',
        component: () => import('@/views/boardroom/statistics'),
        meta: { title: locale.booking }
      },
      {
        path: 'maintain',
        name: 'BrMaintain',
        component: () => import('@/views/boardroom/maintain'),
        meta: { title: locale.maintain, sidebar: false, header: false },
        hidden: true
      },
      {
        path: 'booking/my',
        name: 'BrMyBooking',
        component: () => import('@/views/boardroom/my-booking'),
        meta: { title: locale.my }
      },
      {
        path: 'booking/periodic',
        name: 'BrBookingPeriodic',
        component: () => import('@/views/boardroom/periodic'),
        meta: { title: locale.periodic, sidebar: false, header: false },
        hidden: true
      },
      {
        path: 'booking/long/term',
        name: 'BrBookingLongTerm',
        component: () => import('@/views/boardroom/long-term'),
        meta: { title: locale.longTerm, sidebar: false, header: false },
        hidden: true
      },
      {
        path: 'booking/approve',
        name: 'BrBookingApprove',
        component: () => import('@/views/boardroom/approve'),
        meta: { title: locale.approve, sidebar: false, header: false },
        hidden: true
      },
      {
        path: 'booking/service',
        name: 'BrBookingService',
        component: () => import('@/views/boardroom/service'),
        meta: { title: locale.service, sidebar: false, header: false },
        hidden: true
      },
      {
        path: 'booking/modify/:id',
        props: route => Object.assign(route.params, { modify: true }),
        name: 'BrBookingModify',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: locale.modify },
        hidden: true
      },
      {
        // Reference: https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
        path: 'booking/:id/:start?',
        props: true,
        name: 'BrBooking',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: locale.edit },
        hidden: true
      }
    ]
  },

  {
    path: '/ns',
    component: Layout,
    props: route => ({
      showSidebar: route.meta.sidebar,
      showHeader: route.meta.header
    }),
    meta: { title: 'Temporary(No Sidebar)' },
    children: [
      {
        path: 'maintain',
        name: 'NsBrMaintain',
        component: () => import('@/views/boardroom/maintain'),
        meta: { title: locale.maintain }
      },
      {
        path: 'booking/periodic',
        name: 'NsBrBookingPeriodic',
        component: () => import('@/views/boardroom/periodic'),
        meta: { title: locale.periodic }
      },
      {
        path: 'booking/long/term',
        name: 'NsBrBookingLongTerm',
        component: () => import('@/views/boardroom/long-term'),
        meta: { title: locale.longTerm }
      },
      {
        path: 'booking/approve',
        name: 'NsBrBookingApprove',
        component: () => import('@/views/boardroom/approve'),
        meta: { title: locale.approve }
      },
      {
        path: 'booking/service',
        name: 'NsBrBookingService',
        component: () => import('@/views/boardroom/service'),
        meta: { title: locale.service }
      }
    ]
  }

  // Hide sidebar: [Plan 1]
  /* {
    path: '/boardroom/booking/periodic',
    component: () => import('@/views/boardroom/periodic'),
    hidden: true
  },
  {
    path: '/boardroom/booking/long/term',
    component: () => import('@/views/boardroom/long-term'),
    hidden: true
  }, */

  // Hide sidebar: [Plan 2]
  /* {
    path: '/other/booking',
    component: Layout,
    props: { hideSidebar: true },
    hidden: true,
    meta: { title: 'Other Booking', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'periodic',
        component: () => import('@/views/boardroom/periodic')
      },
      {
        path: 'long/term',
        component: () => import('@/views/boardroom/long-term')
      }
    ]
  }, */
]
