export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  songs: {
    route: '/song',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  newHomePath: {
    route: '/new-home-path',
    exact: true
  },
  song: {
    route: '/song/:trackId'
  }
};
