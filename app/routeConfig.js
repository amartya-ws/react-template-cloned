import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import SongContainer from '@containers/SongContainer/Loadable';
import SongDetailContainer from './containers/SongDetailContainer/index';
import React from 'react';

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
  newHomePath: {
    component: () => <h1>New Home path</h1>,
    ...routeConstants.newHomePath
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
