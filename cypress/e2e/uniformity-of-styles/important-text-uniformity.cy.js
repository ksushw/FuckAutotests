const targetUrl = Cypress.env('targetUrl');
const rgbaToHex = (rgba) => {
  const rgbaValues = rgba.match(/\d+/g);
  const r = parseInt(rgbaValues[0]).toString(16).padStart(2, '0');
  const g = parseInt(rgbaValues[1]).toString(16).padStart(2, '0');
  const b = parseInt(rgbaValues[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};
describe('Проверка элементов с левым бордером', () => {
  it('Элементы с левым бордером должны быть синего (#007fff) или красного (#e11229) цвета и текст в них должен быть курсивом', () => {
    cy.visit(targetUrl);
    const blueHex = '#007fff';
    const redHex = '#e11229';
    // Проверка элементов с левым бордером
    cy.get('*').then(($elements) => {
      const filteredElements = $elements.filter((index, element) => {
        const borderLeft = Cypress.$(element).css('border-left-width');
        const borderTop = Cypress.$(element).css('border-top-width');
        const borderRight = Cypress.$(element).css('border-right-width');
        const borderBottom = Cypress.$(element).css('border-bottom-width');
        return (
          borderLeft !== '0px' &&
          borderTop === '0px' &&
          borderRight === '0px' &&
          borderBottom === '0px' &&
          Cypress.dom.isVisible(element) &&
          element.innerText.trim() !== ''
        );
      });
      if (filteredElements.length === 0) {
        // Если элементов нет, тест пройден
        cy.log('Элементы с левым бордером отсутствуют.');
        return;
      }
      // Если элементы есть, проверяем их дальше
      cy.wrap(filteredElements).each(($el) => {
        cy.wrap($el).then(($el) => {
          // Проверяем цвет левого бордера
          const borderLeftColor = Cypress.$($el).css('border-left-color');
          const isCorrectColor = [blueHex, redHex].includes(rgbaToHex(borderLeftColor));
          expect(
            isCorrectColor,
            `Цвет левого бордера должен быть ${blueHex} или ${redHex}, а не ${rgbaToHex(
              borderLeftColor
            )}`
          ).to.be.true;
          // Проверяем, что текст в элементе написан курсивом
          const fontStyle = Cypress.$($el).css('font-style');
          expect(fontStyle).to.equal('italic');
        });
      });
    });
  });
});
