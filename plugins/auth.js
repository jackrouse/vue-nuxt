import { Message } from 'element-ui'

// const getOtherQuery = (query) => {
//   return Object.keys(query).reduce((acc, cur) => {
//     if (cur !== 'redirect') {
//       acc[cur] = query[cur]
//     }
//     return acc
//   }, {})
// }

export default function({ $auth, app }) {
  $auth.checkLogin = function(redirect) {
    const router = app.router
    const route = app.context.route
    return new Promise((resolve, reject) => {
      if (!$auth.loggedIn) {
        if (redirect) {
          Message({
            message: '请先登录',
            type: 'info',
            offset: 200,
            duration: 1000,
            onClose: () => {
              router.push(`/user/login?redirect=${route.path}`)
            }
          })
        } else {
          reject(new Error('noLoggedIn'))
        }
      } else {
        resolve('loggedIn')
      }
    })
    // const redirectPath =

    // return this.$auth.loggedIn
  }

  $auth.onError((error, name, endpoint) => {
    console.error(name, error)
  })

  $auth.onRedirect((to, from) => {
    // debugger
    // let redirect
    // let otherQuery
    // const query = route.query
    // if (query) {
    //   redirect = query.redirect
    //   otherQuery = getOtherQuery(query)
    // }
    // console.log(query)
    // console.log(from)
    // console.log(redirect)
    // console.log(otherQuery)
    // { path: this.redirect || '/', query: this.otherQuery }
    // console.log(to)
    // return route.path
    // you can optionally change `to` by returning a new value
  })
}
