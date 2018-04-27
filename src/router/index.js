import Vue from 'vue'
import Router from 'vue-router'

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

Vue.use(Router)

// 路由定义使用说明:
// 1. 代码中路由统一使用name属性跳转.
// 2. 开放path属性用做简短路由, 比如: '/a1', 访问地址: www.renren.io/#/a1
export default new Router({
  mode: 'hash',
  routes: [{
      path: '/404',
      component: _import('error/404'),
      name: '404',
      desc: '404未找到'
    },
    {
      path: '/login',
      component: _import('login/index'),
      name: 'login',
      desc: '登录'
    },
    {
      path: '/',
      component: _import('layout/index'),
      name: 'layout',
      redirect: {
        name: 'home'
      },
      desc: '上左右整体布局',
      children: [
        // 通过isTab属性, 设定是否通过tab标签页展示内容
        {
          path: '/home',
          component: _import('home/index'),
          name: 'home',
          desc: '首页'
        },
        {
          path: '/layout-setting',
          component: _import('layout/setting'),
          name: 'setting',
          desc: '布局设置'
        },
        { path: '/menu', component: _import('menu/index'), name: 'menu', desc: '菜单管理', meta: { isTab: true } },
      ],
      beforeEnter(to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
          next({
            name: 'login'
          })
        }
        next()
      }
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ]
})
