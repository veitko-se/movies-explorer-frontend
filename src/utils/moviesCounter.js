/**
 * Возвращает количество карточек фильмов и количество для добавления по кнопке "еще" в зависимости от ширины экрана
 * @param width Ширина экрана
 * @returns {{add: number, initial: number}}
 */
function getMoviesToShowCounter(width) {
  switch (true) {
    case (width < 630):
      return {initial: 5, add: 2};
    case (width >= 630 && width < 930):
      return {initial: 8, add: 2};
    case (width >= 930 && width < 1280):
      return {initial: 12, add: 3};
    case (width >= 1280):
      return {initial: 16, add: 4};
    default:
      return {initial: 0, add: 0};
  }
}
export default getMoviesToShowCounter;
