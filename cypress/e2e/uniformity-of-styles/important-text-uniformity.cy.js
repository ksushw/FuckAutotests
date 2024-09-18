const targetUrl = Cypress.env('targetUrl');

const rgbaToHex = (rgba) => {
  const rgbaValues = rgba.match(/\d+/g); // Извлекаем числовые значения rgba
  const r = parseInt(rgbaValues[0]).toString(16).padStart(2, '0');
  const g = parseInt(rgbaValues[1]).toString(16).padStart(2, '0');
  const b = parseInt(rgbaValues[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

describe('Тест на элементы с только левым бордером', () => {
  it('Должен проверить, что элементы имеют только левый бордер и других нет', () => {
    // Заходим на нужную страницу
    cy.visit(targetUrl[1]);

    const blueHex = '#007fff';
    const redHex = '#e32402';

    // Ищем элементы, у которых только левый бордер
    cy.get('*')
      .filter((index, element) => {
        // Проверяем на отсутствие класса, содержащего 'comment'
        const hasCommentClass = Array.from(element.classList).some((className) =>
          className.includes('comment')
        );

        const borderLeft = Cypress.$(element).css('border-left-width');
        const borderTop = Cypress.$(element).css('border-top-width');
        const borderRight = Cypress.$(element).css('border-right-width');
        const borderBottom = Cypress.$(element).css('border-bottom-width');

        return (
          !hasCommentClass &&
          borderLeft !== '0px' &&
          borderTop === '0px' &&
          borderRight === '0px' &&
          borderBottom === '0px' &&
          Cypress.dom.isVisible(element) &&
          element.innerText.trim() !== ''
        );
      })
      .each(($el) => {
        // Проверяем цвет левого бордера на соответствие заданным цветам
        const borderLeftColor = Cypress.$($el).css('border-left-color');
        cy.wrap($el).should((el) => {
          expect(borderLeftColor).to.satisfy((color) => {
            return rgbaToHex(color) === blueHex || rgbaToHex(color) === redHex;
          }, 'Цвет левого бордера должен быть #007FFF или #e11229');
        });
      });
  });
});
