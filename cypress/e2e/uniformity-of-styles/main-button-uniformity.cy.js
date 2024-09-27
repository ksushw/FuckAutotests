const targetUrl = Cypress.env('targetUrl');

const rgbaToHex = (rgba) => {
  // Извлекаем числовые значения RGBA из строки, проверяя наличие 'rgba()'
  const rgbaValues = rgba.match(/[\d.]+/g);
  const r = Math.round(rgbaValues[0]).toString(16).padStart(2, '0');
  const g = Math.round(rgbaValues[1]).toString(16).padStart(2, '0');
  const b = Math.round(rgbaValues[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

describe('Кнопка "regiser now" с заданной ссылкой {offer_link}&place=button - нужного цвета ', () => {
  it('Цвет кнопки "regiser now" с заданной ссылкой {offer_link}&place=button - должен быть синий(#007fff) или красный(#e11229)', () => {
    cy.visit(targetUrl);
    const offer_link = '{offer_link}';

    // Проверяем, что элемент с нужной ссылкой имеет синий или красный фон
    cy.get(`a[href="${offer_link}&place=button"]`).then(($link) => {
      // Получаем фоновый цвет в формате RGBA
      const backgroundColor = $link.css('background-color');
      const backgroundColorHex = rgbaToHex(backgroundColor); // Преобразуем в HEX

      // Определяем валидные HEX цвета
      const validHexColors = ['#007fff', '#e11229'];

      // Проверяем, что цвет фона входит в диапазон допустимых значений
      expect(validHexColors).to.include(backgroundColorHex);
    });
  });
});
