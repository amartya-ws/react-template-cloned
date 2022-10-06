/**
 *
 * ItuneCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';

const StyledCard = styled(Card)`
  && {
    width: 15rem;
    min-height: 20rem;
  }
`;

const StyledImg = styled.img`
  && {
    max-height: 14.5rem;
    object-fit: cover;
  }
`;

export function ItuneCard({ artistName, trackName, artworkUrl100 }) {
  const { Meta } = Card;
  return (
    <div data-testid="itune-card">
      <StyledCard cover={<StyledImg alt={'song cover'} src={artworkUrl100} data-testid="song-image" />}>
        <Meta title={trackName ?? 'not found'} description={artistName ?? 'not found'} data-testid="song-detail" />
      </StyledCard>
    </div>
  );
}

ItuneCard.propTypes = {
  artistName: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl100: PropTypes.string
};

export default ItuneCard;
