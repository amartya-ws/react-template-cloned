/**
 *
 * Tests for SongContainer container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@utils/testUtils';
import { SongContainerTest as SongContainer } from '../index';
import { songContainerTypes } from '../reducer';
import { mapDispatchToProps } from '@app/containers/SongContainer/index';

describe('<SongContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchItuneSongs on change', async () => {
    const artistName = 'eminem';
    const { getByTestId } = renderProvider(<SongContainer dispatchItuneSongs={submitSpy} />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: {
        value: artistName
      }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(artistName);
  });

  it('should call dispatchClearSongs on empty change', async () => {
    let clearSongsSpy = jest.fn();
    let getItuneSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <SongContainer dispatchClearSongs={clearSongsSpy} dispatchItuneSongs={getItuneSongsSpy} />
    );
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: {
        value: 'test'
      }
    });
    await timeout(500);
    expect(getItuneSongsSpy).toBeCalled();
    fireEvent.change(searchBar, {
      target: {
        value: ''
      }
    });
    await timeout(500);
    expect(clearSongsSpy).toBeCalled();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const artistName = 'eminem';
    const actions = {
      dispatchItuneSongs: { type: songContainerTypes.REQUEST_GET_ITUNE_SONGS, artistName },
      dispatchClearSongs: { type: songContainerTypes.CLEAR_ITUNE_SONGS }
    };

    const props = mapDispatchToProps(submitSpy);
    props.dispatchItuneSongs(artistName);
    expect(submitSpy).toBeCalledWith(actions.dispatchItuneSongs);
    await timeout(500);

    props.dispatchClearSongs();
    expect(submitSpy).toBeCalledWith(actions.dispatchClearSongs);
  });

  it('should render exact number of ItuneCards as per totalCount in result', () => {
    const resultCount = 2;
    const ituneData = {
      resultCount,
      results: [
        {
          artistName: 'tupac',
          trackName: 'california love',
          artWorkUrl100:
            'https://is2-ssl.mzstatic.com/image/thumb/Music116/v4/35/8a/d6/358ad669-4087-07c2-e14e-4f4fd66ff588/094637927359.jpg/100x100bb.jpg'
        },
        {
          artistName: 'tupac',
          trackName: 'california love',
          artWorkUrl100:
            'https://is2-ssl.mzstatic.com/image/thumb/Music116/v4/35/8a/d6/358ad669-4087-07c2-e14e-4f4fd66ff588/094637927359.jpg/100x100bb.jpg'
        }
      ]
    };
    const { getAllByTestId } = renderProvider(<SongContainer ituneData={ituneData} dispatchItuneSongs={submitSpy} />);
    expect(getAllByTestId('itune-card').length).toBe(resultCount);
  });
});
