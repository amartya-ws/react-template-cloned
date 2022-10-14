import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the songDetailContainer state domain
 */

export const selectSongDetailContainerDomain = (state) => state.songDetailContainer || initialState;

export const selectSingleItune = () =>
  createSelector(selectSongDetailContainerDomain, (substate) => get(substate, 'singleItune'));

export const selectTrackId = () =>
  createSelector(selectSongDetailContainerDomain, (substate) => get(substate, 'trackId'));
