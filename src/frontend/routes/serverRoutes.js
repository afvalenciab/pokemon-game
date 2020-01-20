import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

const serverRoutes = () => {
  return [
    {
      path: '/:lang?',
      component: Home,
      exact: true,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
