const targetUrl = Cypress.env('targetUrl');

// Функция для преобразования RGBA в HEX
const rgbaToHex = (rgba) => {
  const rgbaValues = rgba.match(/\d+/g); // Извлекаем числовые значения RGBA
  const r = parseInt(rgbaValues[0]).toString(16).padStart(2, '0');
  const g = parseInt(rgbaValues[1]).toString(16).padStart(2, '0');
  const b = parseInt(rgbaValues[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

describe('Проверка стилей ссылок', () => {
  it('Ссылки должны быть синими (#007fff) или красными (#e11229)', () => {
    cy.visit(targetUrl);

    // Ожидаемые цвета в формате HEX
    const blueHex = '#007fff';
    const redHex = '#e11229';

    // Переменные для фиксации первого найденного стиля
    let firstDefaultColor = null;
    let firstHoverColor = null;

    // Проверка всех ссылок, которые находятся внутри тегов <p>
    cy.get('p a').each(($link) => {
      cy.wrap($link).then(($el) => {
        let defaultColor = $el.css('color');

        // Если цвет в формате rgba, преобразуем его в hex
        if (defaultColor.startsWith('rgb')) {
          defaultColor = rgbaToHex(defaultColor);
        }

        // Фиксируем цвет первой ссылки
        if (!firstDefaultColor) {
          firstDefaultColor = defaultColor;
        }

        // Проверяем, что цвет по умолчанию корректен
        expect([blueHex, redHex]).to.include(defaultColor);

        // Эмулируем наведение курсора
        cy.wrap($el)
          .trigger('mouseover')
          .then(() => {
            let hoverColor = $el.css('color');

            // Если цвет в формате rgba, преобразуем его в hex
            if (hoverColor.startsWith('rgb')) {
              hoverColor = rgbaToHex(hoverColor);
            }

            // Фиксируем цвет при наведении первой ссылки
            if (!firstHoverColor) {
              firstHoverColor = hoverColor;
            }

            // Проверяем, что цвет при наведении корректен
            expect([blueHex, redHex]).to.include(hoverColor);

            // Проверяем единообразие всех ссылок
            expect(defaultColor).to.equal(firstDefaultColor);
            expect(hoverColor).to.equal(firstHoverColor);

            // Возвращаемся в исходное состояние
            cy.wrap($el).trigger('mouseout');
          });
      });
    });
  });
});
