/**
 *
 * Tests for ItuneCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import ItuneCard from '../index';

describe('<ItuneCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItuneCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItuneCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ItuneCard />);
    expect(getAllByTestId('itune-card').length).toBe(1);
  });

  it('should render itune song details inside the card', () => {
    const data = {
      artistName: 'eminem',
      trackName: 'Till I Collapse (feat. Nate Dogg)',
      url: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b4/13/e9/b413e91d-40aa-a1a8-b8e3-2bacc3b3e222/00606949329020.rgb.jpg/100x100bb.jpg',
      audioUrl: 'https://preview.demo.com/bjgf45tf'
    };

    const { artistName, trackName, url, audioUrl } = data;

    const { getByTestId } = renderWithIntl(
      <ItuneCard artistName={artistName} trackName={trackName} artworkUrl100={url} previewUrl={audioUrl} />
    );

    expect(getByTestId('song-detail')).toHaveTextContent(artistName);
    expect(getByTestId('song-detail')).toHaveTextContent(trackName);
    expect(getByTestId('song-image')).toHaveAttribute('src', url);
    expect(getByTestId('preview-audio')).toHaveAttribute('src', audioUrl);
  });

  it('should call setCurrentSongId on play event', async () => {
    let submitSpy = jest.fn();

    const { getByTestId } = renderWithIntl(<ItuneCard setCurrentSongId={submitSpy} />);
    fireEvent.play(getByTestId('preview-audio'));
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
