import Vue from "vue";
import VueRouter from 'vue-router'
// login & enroll
import login from '@/pages/login/'
import enroll from '@/pages/enroll'
// teacher
import teacher_center from "@/pages/teacherCenter";
import teacher_my_classes from "@/pages/teacherCenter/myClasses"
import teacher_personal_center from "@/pages/teacherCenter/personalCenter";
import teacher_add_class from "@/pages/teacherCenter/addClass/addClasses"
import teacher_add_course_chapter from "@/pages/teacherCenter/addClass/classChapter"
import teacher_class_list_course from "@/pages/teacherCenter/classShow/courseList"
import teacher_class_list_chapter from "@/pages/teacherCenter/classShow/chapterList"
import teacher_class_list_student from "@/pages/teacherCenter/classShow/studentList"
import teacher_class_list_student_grade from "@/pages/teacherCenter/classShow/studentHomework"
import teacher_class_list_course_detail from "@/pages/teacherCenter/classShow/courseDetail"
// student
import student_course_chapter from "@/pages/studentCenter/openClass/classChapter"
import student_class_detail from "@/pages/studentCenter/openClass/myClass"
import stu_center from "@/pages/studentCenter"
import stu_personal_center from "@/pages/studentCenter/personalCenter"
import stu_notification from "@/pages/studentCenter/notification"
import stu_my_classes from "@/pages/studentCenter/myClasses"
// player
import player from "@/pages/player";
// import teacher_course_publish from "@/pages/teacherCenter/addClass/classPublish"
import admin_center from "@/pages/administratorCenter"
import admin_personal_center from "@/pages/administratorCenter/personalCenter"
import admin_application_center from "@/pages/administratorCenter/applications"

import main_page from "@/pages/mainPage"

import test from "@/pages/export";
import anoTest from "@/pages/addProblemComponent";


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//解决vue路由重复导航错误
//获取原型对象上的push函数
const Router = new VueRouter({
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
        title: '教师中心'
      },
      children: [
        {
          name: 'teacher_personal_center',
          component: teacher_personal_center,
          path: 'personal_center',
          meta: {
            title: '个人中心'
          }
        },

        {
          name: 'teacher_my_classes',
          component: teacher_my_classes,
          path: 'my_classes',
          meta: {
            title: '我的课程'
          },
          children: [
            {
              name: 'teacher_add_course',
              component: teacher_add_class,
              path: 'add_class',
              meta: {
                title: '添加课程'
              }
            },
            {
              name: 'add_course_info',
              component: teacher_add_class,
              path: 'info/:id',
              hidden: true,
              meta: {
                title: '添加课程'
              }
            },
            {
              name: 'teacher_add_course_chapter',
              component: teacher_add_course_chapter,
              path: 'chapter/:id',
              hidden: true,
              meta: {
                title: '添加课程'
              }
            },

            {
              name: 'teacher_class_list',
              component: teacher_class_list_course,
              path: 'class_list',
              meta: {
                title: '课程列表'
              }
            },
            {
              name: 'teacher_class_list_course',
              component: teacher_class_list_course,
              path: 'list_course/:id',
              meta: {
                title: '课程列表'
              }
            },
            {
              name: 'teacher_course_list_chapter',
              component: teacher_class_list_chapter,
              path: 'list_chapter/:id',
              meta: {
                title: 'ClassList'
              }
            },
            {
              name: 'teacher_course_list_student',
              component: teacher_class_list_student,
              path: 'student_list/:id',
              meta: {
                title: '课程列表'
              }
            },

            {
              name: 'teacher_course_list_course',
              component: teacher_class_list_course_detail,
              path: 'course_detail/:id',
              meta: {
                title: '课程列表'
              }
            },

            {
              name: 'teacher_course_list_student_grade',
              component: teacher_class_list_student_grade,
              path: 'student_grade/:id',
              meta: {
                title: '课程列表'
              }
            }

          ]
        },

      ]
    },

    {
      name: 'administratorCenter',
      path: '/admin_center',
      component: admin_center,
      redirect: '/admin_center/personal_center',
      meta: {
        title: '管理员中心'
      },
      children: [
        {
          name: 'admin_personal_center',
          path: 'personal_center',
          component: admin_personal_center,
          meta: {title: '个人中心'}
        },
        {
          name: 'admin_application_center',
          path: 'application_center',
          component: admin_application_center,
          meta: {
            title: '申请中心'
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
        title: '学生中心'
      },
      children: [
        {
          name: 'stu_personal_center',
          path: 'personal_center',
          component: stu_personal_center,
          meta: {
            title: '个人中心'
          }
        },
        {
          name: 'stu_notification',
          path: 'notification',
          component: stu_notification,
          meta: {
            title: '通知'
          }
        },
        {
          name: 'stu_my_classes',
          path: 'my_classes',
          component: stu_my_classes,
          meta: {
            title: '我的课程'
          },
          redirect: 'classes',
          children: [{
            name: 'student_add_course_chapter',
            component: student_course_chapter,
            path: 'chapter/:id',
            hidden: true,
            meta: {
              title: '我的课程'
            }
          },
            {
              name: 'student_add_course_chapter',
              component: student_class_detail,
              path: 'classes',
              hidden: true,
              meta: {
                title: '我的课程'
              }
            },
            {
              name: 'student_add_course_chapter',
              component: student_class_detail,
              path: 'class_detail/:id',
              hidden: true,
              meta: {
                title: '我的课程'
              }
            },


          ]
        },


      ]
    },


    {
      path: "/anoTest",
      component: anoTest
    },


    {
      name: 'test',
      path: '/test',
      component: test
    },
    {
      name: 'player',
      path: '/player/:id',
      component: player,
    },

    {
      name: 'MainPage',
      path: '/main_page',
      component: main_page,
    },
  ]
})
export default Router


// Router.beforeEach((to, from, next) => {
// if (to.path.startsWith('/login')) {
//   window.sessionStorage.removeItem('token')
//   next()
// } else if (to.path.startsWith('/enroll')) {
//
//   next()
//
// } else if (from.path.startsWith('/login')) {
//   let user = window.sessionStorage.getItem('token')
//
//   if (!user) {
//     console.log(this)
//     window.alert("请先登录");
//     next({
//       path: '/login'
//     })
//   } else {
//     next()
//   }
// }
//
// if (to.path.startsWith('/admin_center')) {
//   let user = window.sessionStorage.getItem('token')
//
//   if (user !== "1") {
//     console.log(this)
//     window.alert("你没有管理员权限");
//
//   } else {
//     next()
//   }
// }
// if (to.path.startsWith('/teacher_center')) {
//   let user = window.sessionStorage.getItem('token')
//   if (user === "1") {
//     next()
//
//   } else {
//     console.log(this)
//     window.alert("你没有老师权限");
//
//   }
// }
// if (to.path.startsWith('/stu_center')) {
//   let user = window.sessionStorage.getItem('token')
//
//   if (user === "1") {
//     next()
//
//   } else {
//     console.log(this)
//     window.alert("你不是学生");
//   }
// }
//
// if (to.path.startsWith('/main_page')) {
//   let user = window.sessionStorage.getItem('token')
//   if (user === "1") {
//     next()
//   } else {
//     window.alert("你没有老师权限");
//   }
// }
//
// if (to.path.startsWith('/test')) {
//   let user = window.sessionStorage.getItem('token')
//   if (user === "1") {
//     next()
//   } else {
//     window.alert("你没有老师权限");
//   }
// }
//
// if (to.path.startsWith('/player')) {
//   let user = window.sessionStorage.getItem('token')
//   if (user === "1") {
//     next()
//   } else {
//     window.alert("你没有老师权限");
//   }
// }
// if (to.path.startsWith('/anoTest')) {
//   let user = window.sessionStorage.getItem('token')
//   if (user === "1") {
//     next()
//   } else {
//     window.alert("你没有老师权限");
//   }
// }


// });


