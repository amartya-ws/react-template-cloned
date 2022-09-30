import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import SongContainer from '@containers/SongContainer/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  ituneSongPage: {
    component: SongContainer,
    ...routeConstants.songs
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
