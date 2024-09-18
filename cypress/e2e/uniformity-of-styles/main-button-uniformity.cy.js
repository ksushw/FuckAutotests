const targetUrl = Cypress.env('targetUrl');

// Функция для преобразования RGBА в HEX
const rgbaToHex = (rgba) => {
  // Извлекаем числовые значения RGBA из строки, проверяя наличие 'rgba()'
  const rgbaValues = rgba.match(/[\d.]+/g); // Извлекаем все числовые значения
  const r = Math.round(rgbaValues[0]).toString(16).padStart(2, '0');
  const g = Math.round(rgbaValues[1]).toString(16).padStart(2, '0');
  const b = Math.round(rgbaValues[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

describe('Тест на фон кнопки с предложением', () => {
  it('Должен проверить, что фон кнопки с заданной ссылкой синий или красный', () => {
    cy.visit(targetUrl);
    // Замените этот адрес на фактический
    const offer_link = '{offer_link}'; // Например, 'https://example.com'

    // Проверяем, что элемент с нужной ссылкой имеет синий или красный фон
    cy.get(`a[href="${offer_link}&place=button"]`).then(($link) => {
      // Получаем фоновый цвет в формате RGBA
      const backgroundColor = $link.css('background-color');
      const backgroundColorHex = rgbaToHex(backgroundColor); // Преобразуем в HEX

      // Определяем валидные HEX цвета
      const validHexColors = ['#007fff', '#e11229']; // HEX значения для синего и красного

      // Проверяем, что цвет фона входит в диапазон допустимых значений
      expect(validHexColors).to.include(backgroundColorHex);
    });
  });
});
