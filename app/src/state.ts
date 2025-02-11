import { atom } from 'recoil'

export const pointsState = atom({
  key: 'pointsState',
  default: [ ],
});

export const linkageTypeState = atom({
  key: 'linkageTypeState',
  default: 0, // 0: Single, 1: Complete
});
