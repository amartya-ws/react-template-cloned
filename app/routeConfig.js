import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import SongContainer from '@containers/SongContainer/Loadable';
import SongDetailContainer from './containers/SongDetailContainer/index';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  ituneSongPage: {
    component: SongContainer,
    ...routeConstants.songs
  },
  songDetailPage: {
    component: SongDetailContainer,
    ...routeConstants.song
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
