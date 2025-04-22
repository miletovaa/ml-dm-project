import { atom } from 'recoil'
import { Points, LinkageType } from './types'

export const pointsState = atom<Points>({
  key: 'pointsState',
  // default: [ ],
  default: [
    { id: '1', x: 5, y: 5 },
    { id: '2', x: 4, y: 4 },
    { id: '3', x: 1, y: 2 },
    { id: '4', x: 1, y: 1 },
    { id: '5', x: 2, y: 1 },
  ],
});

export const linkageTypeState = atom<LinkageType>({
  key: 'linkageTypeState',
  default: "S",
});
