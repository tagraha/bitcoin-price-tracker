import Home from './home';
import Converter from './converter';
import NotFound from './404/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/converter',
    component: Converter,
  },
  {
    component: NotFound,
  },
];

export default routes;
