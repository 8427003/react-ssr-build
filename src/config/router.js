export default [
    {
        path: '/rules',
        name: 'rules',
        component: () => import('views/rules')
    },
    {
        path: '/xxx',
        name: 'xxx',
        component: () => import('views/xxx')
    },
    {
        type: 'Redirect',
        from: '/',
        to: '/xxx'
    }
]

