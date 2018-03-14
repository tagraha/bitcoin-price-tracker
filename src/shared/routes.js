import Home from './home';
import About from './about';
import NotFound from './404/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    component: NotFound,
  },
];

export default routes;
