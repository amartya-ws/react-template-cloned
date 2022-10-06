/**
 *
 * SongContainer Container
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Input } from 'antd';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import For from '@app/components/For';
import T from '@components/T';
import ItuneCard from '@app/components/ItuneCard';
import { selectItuneData, selectArtistName } from './selectors';
import { songContainerCreators } from './reducer';
import saga from './saga';

const StyledInput = styled(Input)`
  && {
    width: 25rem;
    height: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export function SongContainer({ artistName, ituneData, dispatchItuneSongs, dispatchClearSongs }) {
  const [currentSongId, setCurrentSongId] = useState(0);
  const changeHandler = (searchTerm) => {
    if (searchTerm) {
      dispatchItuneSongs(searchTerm);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandler = debounce(changeHandler, 500);

  const renderSongList = () => {
    let songs = get(ituneData, 'results', null);
    return (
      <>
        <For
          of={songs}
          ParentComponent={CardWrapper}
          renderItem={(item, index) => (
            <ItuneCard key={index} {...item} currentSongId={currentSongId} setCurrentSongId={setCurrentSongId} />
          )}
        />
      </>
    );
  };

  return (
    <Wrapper>
      <T id="get_song_details" marginBottom={10} />
      <StyledInput
        placeholder="enter artist"
        defaultValue={artistName}
        type="text"
        data-testid="search-bar"
        onChange={(evt) => debouncedHandler(evt.target.value)}
      />
      <CardWrapper>{renderSongList()}</CardWrapper>
    </Wrapper>
  );
}

SongContainer.propTypes = {
  artistName: PropTypes.string,
  ituneData: PropTypes.object,
  dispatchClearSongs: PropTypes.func,
  dispatchItuneSongs: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  ituneData: selectItuneData(),
  artistName: selectArtistName()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItuneSongs, clearItuneSongs } = songContainerCreators;
  return {
    dispatchItuneSongs: (artistName) => dispatch(requestGetItuneSongs(artistName)),
    dispatchClearSongs: () => dispatch(clearItuneSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'songContainer', saga }))(SongContainer);

export const SongContainerTest = compose(injectIntl)(SongContainer);
