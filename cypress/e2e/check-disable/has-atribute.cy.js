const targetUrl = Cypress.env('targetUrl');

describe('Проверка наличия хотя бы одного contenteditable="false"', () => {
  it('Должен подтвердить наличие contenteditable="false"', () => {
    cy.visit(targetUrl);
    let isContentEditableFound = false;

    // Функция для проверки наличия и значения атрибута contenteditable
    const checkContentEditable = (selector) => {
      cy.get('body')
        .find(selector)
        .each(($el) => {
          const attr = $el.attr('contenteditable');
          if (attr === 'false') {
            isContentEditableFound = true;
          }
        });
    };

    // Проверяем первый вариант
    checkContentEditable('.check__wrapper');

    // Проверяем второй вариант
    checkContentEditable('.check');

    // Проверяем третий вариант (если нужно)
    checkContentEditable('.un-steps__check');

    checkContentEditable('[class$="check-mobile"]');

    // Убеждаемся, что хотя бы один элемент с атрибутом найден
    cy.then(() => {
      expect(isContentEditableFound).to.be.true;
    });
  });
});
