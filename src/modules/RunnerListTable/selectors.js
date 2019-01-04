import { createSelector } from 'reselect';
// const sortByCaptured = (task1, task2) => task2.captured - task1.captured;

// Selector to sort incoming captures
// const capturesSelector = state => state.capturesReducer.captures;
// const sorter = allCaptures => allTasks.sort(sortTasks);
// export const orderedCapturesSelector = createSelector(capturesSelector, sorter);

const runnerOrderer = allRunners => Array.from(allRunners).reverse();
const runnerSet = state => state.capturesReducer.runnerSet;

export const runnersSelector = createSelector(runnerSet, runnerOrderer);
export const eventsSelector = state => state.capturesReducer.captures;
export const readerIdSelector = state => state.capturesReducer.baseReaderId;
