/**
 *
 * ItuneCard
 *
 */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';

const StyledCard = styled(Card)`
  && {
    width: 18rem;
    min-height: 21rem;
  }
`;

const StyledImg = styled.img`
  && {
    max-height: 14.5rem;
    object-fit: cover;
  }
`;

const StyledAudio = styled.audio`
  && {
    width: 100%;
    height: 2.5rem;
    margin-top: 1rem;
  }
`;

export function ItuneCard({
  artistName,
  trackName,
  artworkUrl100,
  previewUrl,
  currentSongId,
  setCurrentSongId,
  trackId
}) {
  const { Meta } = Card;
  const audioRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (currentSongId !== trackId) {
      audioRef.current.pause();
    }
  }, [currentSongId]);

  const playHandler = () => {
    setCurrentSongId(trackId);
  };

  const clickHandler = () => {
    history.push(`/song/${trackId}`);
  };

  return (
    <div data-testid="itune-card" onClick={clickHandler}>
      <StyledCard cover={<StyledImg alt={'song cover'} src={artworkUrl100} data-testid="song-image" />}>
        <Meta title={trackName ?? 'not found'} description={artistName ?? 'not found'} data-testid="song-detail" />
        <StyledAudio
          data-testid="preview-audio"
          controls
          src={previewUrl}
          ref={audioRef}
          onPlay={playHandler}
          controlsList="nodownload noplaybackrate"
        >
          Audio preview
        </StyledAudio>
      </StyledCard>
    </div>
  );
}

ItuneCard.propTypes = {
  artistName: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  previewUrl: PropTypes.string,
  currentSongId: PropTypes.number,
  setCurrentSongId: PropTypes.func,
  trackId: PropTypes.number
};

export default ItuneCard;
