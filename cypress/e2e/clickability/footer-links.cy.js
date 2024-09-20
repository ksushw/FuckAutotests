// MOC LINKS
const targetUrl = Cypress.env('targetUrl');

describe('Все ссылки в блоке footer некликабельные', function () {
  it('должен быть некликабельным', function () {
    cy.visit(targetUrl);

    cy.get('footer').then(($footer) => {
      if ($footer.find('a').length > 0) {
        const footerPointerEvents = $footer.css('pointer-events');

        if (footerPointerEvents === 'none') {
          // Если у всего footer pointer-events: none, тест проходит успешно
          cy.log('У всех ссылок в блоке footer - pointer-events: none, все ссылки некликабельные');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
          cy.wrap($footer)
            .find('a')
            .each(($link) => {
              cy.wrap($link).should('have.css', 'pointer-events', 'none');
            });
          cy.log('У всех ссылок в блоке footer - pointer-events: none, все ссылки некликабельные');
        }
      } else {
        // Если в футере нет ссылок, тест проходит успешно
        cy.log('Блок footer не имеет ссылок');
      }
    });
  });
});
