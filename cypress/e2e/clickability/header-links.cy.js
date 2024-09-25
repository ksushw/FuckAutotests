// MOC LINKS
const targetUrl = Cypress.env('targetUrl');

describe('Все ссылки в блоке header некликабельные', function () {
  it('Все ссылки в блоке header должны быть некликабельными', function () {
    cy.visit(targetUrl);

    cy.get('header').then(($header) => {
      if ($header.find('a').length > 0) {
        const headerPointerEvents = $header.css('pointer-events');

        if (headerPointerEvents === 'none') {
          // Если у всего header pointer-events: none, тест проходит успешно
          cy.log('У всех ссылок в блоке header - pointer-events: none, все ссылки некликабельные');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
          cy.wrap($header)
            .find('a')
            .each(($link) => {
              cy.wrap($link).should('have.css', 'pointer-events', 'none');
            });
          cy.log('У всех ссылок в блоке header - pointer-events: none, все ссылки некликабельные');
        }
      } else {
        // Если в хедере нет ссылок, тест проходит успешно
        cy.log('Блок header не имеет ссылок');
      }
    });
  });
});
