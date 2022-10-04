import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the songContainer state domain
 */

export const selectSongContainerDomain = (state) => state.songContainer || initialState;

export const selectItuneData = () =>
  createSelector(selectSongContainerDomain, (substate) => get(substate, 'ituneData'));

export const selectArtistName = () =>
  createSelector(selectSongContainerDomain, (substate) => get(substate, 'artistName'));
