export default [
    {
        path: '/p/rules',
        name: 'rules',
        component: /* #__LOADABLE__ */ () => import('views/rules')
    },
    {
        path: '/p/xxx',
        name: 'xxx',
        component: /* #__LOADABLE__ */ () => import('views/xxx')
    },
    {
        type: 'Redirect',
        from: '/',
        to: '/p/rules'
    }
]

