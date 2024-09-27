const targetUrl = Cypress.env('targetUrl');

// Функция для преобразования RGBА в HEX
const rgbaToHex = (rgba) => {
  // Извлекаем числовые значения RGBA из строки
  const rgbaValues = rgba.match(/[\d.]+/g); // Извлекаем все числовые значения
  const r = Math.round(rgbaValues[0]).toString(16).padStart(2, '0');
  const g = Math.round(rgbaValues[1]).toString(16).padStart(2, '0');
  const b = Math.round(rgbaValues[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

describe('Проверка стилей ссылок', () => {
  it('Ссылки должны быть синими (#007fff) или красными (#e11229)', () => {
    cy.visit(targetUrl);

    // Определяем валидные HEX цвета
    const validHexColors = ['#007fff', '#e11229'];

    // Проверка всех ссылок, которые находятся внутри тегов <p>
    cy.get('p a').each(($link) => {
      // Получаем цвет ссылки
      cy.wrap($link).then(($el) => {
        const color = $el.css('color');

        // Преобразуем цвет из RGBA в HEX
        const colorHex = rgbaToHex(color);

        // Проверяем, что цвет ссылки соответствует допустимым значениям
        expect(validHexColors).to.include(colorHex);
      });
    });
  });
});
