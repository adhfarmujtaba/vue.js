import { createRouter, createWebHistory } from 'vue-router';
import NewsList from '../components/NewsList.vue'; // Adjust the path based on your folder structure
import PostDetail from '../components/NewsDetail.vue'; // Adjust the path based on your folder structure
import CategoryList from '../components/CategoryList.vue'; // Import the CategoryList component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: NewsList,
  },
  {
    path: '/:categorySlug',
    component: CategoryList,
  },
  {
    path: '/:category_slug/:slug',
    name: 'PostDetail',
    component: PostDetail,
    props: true, // Pass route params as props to the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
