const targetUrl = Cypress.env('targetUrl');

// Функция для преобразования RGBА в HEX
const rgbaToHex = (rgba) => {
  const rgbaValues = rgba.match(/[\d.]+/g);
  const r = Math.round(rgbaValues[0]).toString(16).padStart(2, '0');
  const g = Math.round(rgbaValues[1]).toString(16).padStart(2, '0');
  const b = Math.round(rgbaValues[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

describe('Кнопка "register now" должна быть синим или красным', () => {
  it('Цвет кнопки "register now" с заданной ссылкой {offer_link}&place=button должен быть синий (#007fff) или красный (#e11229)', () => {
    cy.visit(targetUrl);
    const offer_link = '{offer_link}';

    // Проверяем, что элемент с нужной ссылкой имеет синий или красный фон
    cy.get(`a[href="${offer_link}&place=button"]`).then(($link) => {
      // Получаем фоновый цвет элемента
      const backgroundColor = $link.css('background-color');
      const backgroundColorHex = rgbaToHex(backgroundColor); // Преобразуем в HEX

      // Допустимые цвета фона в формате HEX
      const validHexColors = ['#007fff', '#e11229'];

      // Проверяем, что цвет фона соответствует одному из допустимых значений
      expect(
        validHexColors.includes(backgroundColorHex),
        `Цвет фона должен быть ${validHexColors.join(' или ')}, а не ${backgroundColorHex}`
      ).to.be.true;
    });
  });
});
