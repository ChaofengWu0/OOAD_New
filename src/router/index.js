import Vue from "vue";
import VueRouter from 'vue-router'
import login from '@/pages/login/'
import enroll from '@/pages/enroll'
import teacher_center from "@/pages/teacherCenter";
import teacher_my_classes from "@/pages/teacherCenter/myClasses"
import teacher_notification from "@/pages/teacherCenter/notification"
import student_list from "@/pages/teacherCenter/studentList";
import teacher_application_center from "@/pages/teacherCenter/applicationCenter";
import teacher_personal_center from "@/pages/teacherCenter/personalCenter";
import admin_center from "@/pages/administratorCenter"
import admin_personal_center from "@/pages/administratorCenter/personalCenter"
import admin_application_center from "@/pages/administratorCenter/applications"
import stu_center from "@/pages/studentCenter"
import stu_personal_center from "@/pages/studentCenter/personalCenter"
import stu_notification from "@/pages/studentCenter/notification"
import stu_my_classes from "@/pages/studentCenter/myClasses"
import main_page from "@/pages/mainPage"
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
      // redirect: '/teacherCenter/personal_center',
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
      name: 'administratorCenter',
      path: '/admin_center',
      component: admin_center,
      // redirect:'/admin_center/personal_center',
      meta: {
        title: 'AdminCenter'
      },
      children: [
        {
          name: 'admin_personal_center',
          path: 'personal_center',
          component: admin_personal_center,
          meta: {title: 'PersonalCenter'}
        },
        {
          name: 'admin_application_center',
          path: 'application_center',
          component: admin_application_center,
          meta: {
            title: 'ApplicationCenter'
          }
        }
      ]
    },

    {
      name: 'stuCenter',
      path: '/stu_center',
      component: stu_center,
      meta: {
        title: 'StudentCenter'
      },
      children: [
        {
          name: 'stu_personal_center',
          path: 'personal_center',
          component: stu_personal_center,
          meta: {
            title: 'PersonalCenter'
          }
        },
        {
          name: 'stu_notification',
          path: 'notification',
          component: stu_notification,
          meta: {
            title: 'Notification'
          }
        },
        {
          name: 'stu_my_classes',
          path:'my_classes',
          component: stu_my_classes,
          meta:{
            title: 'MyClasses'
          }
        }
      ]
    },

    {
      name:'MainPage',
      path:'/main_page',
      component:main_page,
    }

  ]
})



