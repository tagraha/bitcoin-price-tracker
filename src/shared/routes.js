import Home from './home';
import Repo from './repo';
import NotFound from './404/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/repo',
    component: Repo,
  },
  {
    component: NotFound,
  },
];

export default routes;
