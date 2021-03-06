import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CasesState } from '@app/store/cases/cases.state';

export const getCasesState = createFeatureSelector<CasesState>('cases');

export const selectCases = createSelector(
  getCasesState,
  (state: CasesState) => state?.casesList,
);

export const selectRegionsCases = createSelector(
  getCasesState,
  (state: CasesState) => state?.regionCases,
);
