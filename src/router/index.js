import Vue from "vue";
import VueRouter from 'vue-router'
import login from '@/pages/login/'
import enroll from '@/pages/enroll'
import teacher_center from "@/pages/teacher_center";
import teacher_my_classes from "@/pages/teacher_center/myClasses"
import teacher_notification from "@/pages/teacher_center/notification"
import student_list from "@/pages/teacher_center/studentList";
import teacher_application_center from "@/pages/teacher_center/applicationCenter";
import teacher_personal_center from "@/pages/teacher_center/personalCenter";
import admin_center from "@/pages/administrator_center"
import admin_personal_center from "@/pages/administrator_center/personalCenter"
import admin_application_center from "@/pages/administrator_center/applications"
// import test from "@/pages/test";

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//解决vue路由重复导航错误
//获取原型对象上的push函数


export default new VueRouter({
  routes: [
    {
      name: 'start',
      path: '',
      redirect: '/login',
      meta: {
        title: 'Start'
      }
    },

    {
      name: 'login_page',
      component: login,
      path: '/login',
      meta: {
        title: 'Login'
      }
    },

    {
      name: 'enroll_page',
      component: enroll,
      path: '/enroll',
      meta: {
        title: 'Enroll'
      }
    },

    {
      name: 'teacher_center',
      component: teacher_center,
      path: '/teacher_center',
      // redirect: '/teacher_center/personal_center',
      meta: {
        title: 'TeacherCenter'
      },
      children: [
        {
          name: 'teacher_personal_center',
          component: teacher_personal_center,
          path: 'personal_center',
          meta: {
            title: 'PersonalCenter'
          }
        },
        {
          name: 'teacher_my_classes',
          component: teacher_my_classes,
          path: 'my_classes',
          meta: {
            title: 'MyClasses'
          }
        },
        {
          name: 'teacher_notification',
          component: teacher_notification,
          path: 'notification',
          meta: {
            title: 'Notification'
          }
        },
        {
          name: 'teacher_student_list',
          component: student_list,
          path: 'student_list',
          meta: {
            title: 'StudentList'
          }
        },
        {
          name: 'teacher_application_center',
          component: teacher_application_center,
          path: 'application_center',
          meta: {
            title: 'ApplicationCenter'
          }
        }
      ]
    },

    {
      name: 'administrator_center',
      path: '/admin_center',
      component: admin_center,
      // redirect:'/admin_center/personal_center',
      meta: {
        title: 'AdminCenter'
      },
      children:[
        {name: 'admin_personal_center',
        path: 'personal_center',
        component: admin_personal_center,
        meta: {title: 'PersonalCenter'}
        },
        {
          name: "admin_application_center",
          path: 'application_center',
          component: admin_application_center,
          meta: {
            title: 'ApplicationCenter'
          }
        }
      ]
    }

  ]
})



