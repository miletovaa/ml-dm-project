import { atom } from 'recoil'
import { Points, LinkageType } from './types'

export const pointsState = atom<Points>({
  key: 'pointsState',
  default: [ ],
});

export const linkageTypeState = atom<LinkageType>({
  key: 'linkageTypeState',
  default: 0,
});
