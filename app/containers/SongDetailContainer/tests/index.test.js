/**
 *
 * Tests for SongDetail container
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { SongDetailContainerTest as SongDetailContainer, mapDispatchToProps } from '../index';
import { songDetailContainerTypes } from '../reducer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ trackId: 12345 }))
}));

describe('<SongDetailContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
    //jest.spyOn(Router, 'useParams').mockReturnValue({ trackId: 12345 });
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongDetailContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchGetSingleItune when data is not available', async () => {
    let trackId = 12345;
    let ituneData = {};
    let singleItune = {};

    renderProvider(
      <SongDetailContainer ituneData={ituneData} singleItune={singleItune} dispatchGetSingleItune={submitSpy} />
    );

    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackId);
  });

  it('should should not call dispatchGetSingleItune when ituneData is available', async () => {
    let ituneData = {
      resultCount: 1,
      results: [
        { trackId: 12345, artistName: 'tupac', trackName: 'california love', artworkUrl100: 'https://demo.com' }
      ]
    };
    let singleItune = {};

    const { getByTestId } = renderProvider(
      <SongDetailContainer ituneData={ituneData} singleItune={singleItune} dispatchGetSingleItune={submitSpy} />
    );

    await timeout(500);
    expect(submitSpy).not.toBeCalled();
    expect(getByTestId('song-image')).toHaveAttribute('src', ituneData.results[0].artworkUrl100);
  });

  it('should should not call dispatchGetSingleItune when data is available in singleData', async () => {
    let ituneData = {};
    let singleItune = {
      resultCount: 1,
      results: [
        { trackId: 12345, artistName: 'tupac', trackName: 'california love', artworkUrl100: 'https://demo.com' }
      ]
    };

    const { getByTestId } = renderProvider(
      <SongDetailContainer ituneData={ituneData} singleItune={singleItune} dispatchGetSingleItune={submitSpy} />
    );

    await timeout(500);
    expect(submitSpy).not.toBeCalled();
    expect(getByTestId('song-image')).toHaveAttribute('src', singleItune.results[0].artworkUrl100);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const trackId = 12345;
    const actions = {
      dispatchGetSingleItune: { type: songDetailContainerTypes.REQUEST_GET_SINGLE_ITUNE, trackId }
    };

    const props = mapDispatchToProps(submitSpy);
    props.dispatchGetSingleItune(trackId);
    await timeout(500);
    expect(submitSpy).toBeCalledWith(actions.dispatchGetSingleItune);
  });
});
