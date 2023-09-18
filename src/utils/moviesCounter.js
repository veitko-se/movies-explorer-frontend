/**
 * Возвращает количество карточек фильмов и количество для добавления по кнопке "еще" в зависимости от ширины экрана
 * @param width Ширина экрана
 * @returns {{add: number, initial: number}}
 */
import { SCREEN, CARDS } from './constants';

function getMoviesToShowCounter(width) {
  switch (true) {
    case (width < SCREEN.S):
      return CARDS.XS;
    case (width >= SCREEN.S && width < SCREEN.M):
      return CARDS.S;
    case (width >= SCREEN.M && width < SCREEN.L):
      return CARDS.M;
    case (width >= SCREEN.L):
      return CARDS.L;
    default:
      return CARDS.DEFAULT;
  }
}
export default getMoviesToShowCounter;
