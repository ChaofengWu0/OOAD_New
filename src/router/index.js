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
import teacher_add_class from "@/pages/teacherCenter/addClass/addClasses"
import teacher_my_class_list from "@/pages/teacherCenter/classList"
import teacher_course_chapter from "@/pages/teacherCenter/addClass/classChapter"
// import teacher_course_publish from "@/pages/teacherCenter/addClass/classPublish"

import admin_center from "@/pages/administratorCenter"
import admin_personal_center  from "@/pages/administratorCenter/personalCenter"
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
const Router= new VueRouter({
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
      redirect: 'teacher_center/personal_center',
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
          },
          redirect: 'class_list',
          children: [
            {
              name: 'teacher_add_course',
              component: teacher_add_class,
              path: 'add_class',
              meta: {
                title: 'AddClass'
              }
            },
            {
              name: 'teacher_class_list',
              component: teacher_my_class_list,
              path: 'class_list',
              meta: {
                title: 'ClassList'
              }
            },
            {
              name: 'add_course_info',
              component: teacher_add_class,
              path: 'info/:id',
              hidden: true,
              meta: {
                title: 'AddClass'
              }
            },
            {
              name: 'teacher_add_course_chapter',
              component: teacher_course_chapter,
              path: 'chapter/:id',
              hidden: true,
              meta: {
                title: 'AddClass'
              }
            },
            // {
            //   name: 'teacher_add_course_publish',
            //   component: teacher_course_publish,
            //   path: 'publish/:id',
            //   hidden: true,
            //   meta: {
            //     title: 'AddClass'
            //   }
            // },
          ]
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
      redirect: '/admin_center/personal_center',
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
      redirect: 'stu_center/personal_center',
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
          path: 'my_classes',
          component: stu_my_classes,
          meta: {
            title: 'MyClasses'
          }
        }
      ]
    },

    {
      name: 'MainPage',
      path: '/main_page',
      component: main_page,
    }

  ]
})
export default Router


Router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('token')
    next()
  }
  else if (from.path.startsWith('/login')){
    let user = window.sessionStorage.getItem('token')

    if (!user) {
      console.log(this)
      window.alert("请先登录");
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
  if (to.path.startsWith('/admin_center')) {
    let user = window.sessionStorage.getItem('token')

    if (user!=="1") {
      console.log(this)
      window.alert("你没有管理员权限");

    } else {
      next()
    }
  }
  if (to.path.startsWith('/stu_center')) {
    let user = window.sessionStorage.getItem('token')

    if (user==="1") {
      next()

    } else {
      console.log(this)
      window.alert("你不是学生");
    }
  }
  if (to.path.startsWith('/teacher_center')) {
    let user = window.sessionStorage.getItem('token')
    if (user==="1") {
      next()

    } else {
      console.log(this)
      window.alert("你没有老师权限");

    }
  }
});

