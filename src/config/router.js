export default [
    {
        path: '/p/rules',
        name: 'rules',
        component: () => import('views/rules'/**1231231**/)
    },
    {
        path: '/p/xxx',
        name: 'xxx',
        component: () => import('views/xxx')
    },
    {
        type: 'Redirect',
        from: '/',
        to: '/p/rules'
    }
]

