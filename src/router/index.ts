// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'Cloudia - Homepage.',
          metaTags: [
            {
              name: 'description',
              content: 'Cloudia Homepage.'
            },
          ]
        },    
      },
      {
        path: '/projects/category',
        name: 'Projects By Category',
        component: () => import('@/views/CloudProjectsByProvider.vue'),
        meta: {
          title: 'Cloudia - Keep an eye on your cloud projects.',
          metaTags: [
            {
              name: 'description',
              content: 'Cloudia - Cloud Projects by Cloud Provider.'
            },
          ]
        },    
      },
      {
        path: '/projects',
        name: 'Projects',
        component: () => import('@/views/CloudProjects.vue'),
        meta: {
          title: 'Cloudia - Cloud Projects',
        }
      },
      {
        path: '/projects/:provider/:project_id',
        name: 'Project Details',
        component: () => import('@/views/CloudProjectDetails.vue'),
        meta: {
          title: 'Cloudia - Cloud Project Details',
        }
      },
      {
        path: '/documentation',
        name: 'Documentation',
        // component: () => import('@/views/Settings.vue'),
        meta: {
          title: 'Cloudia - Documentation',
        },
        beforeEnter(to, from, next) {
          window.open('https://cloudia.readthedocs.io/', '_blank');
        }
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
        meta: {
          title: 'Cloudia - Settings',
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: {
          title: 'Cloudia - About',
        }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  if(!nearestWithMeta) return next();
  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
