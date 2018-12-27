import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => {
  // console.log(state, 'state123')
  return state.language;
}

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => {
    // console.log(languageState, 'languageState')
    return languageState.locale
  });

export { selectLanguage, makeSelectLocale };
