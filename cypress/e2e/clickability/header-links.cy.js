// MOC LINKS
const targetUrl = Cypress.env('targetUrl');

describe('header unclickable header links', function () {
  it('should be disabled', function () {
    cy.visit(targetUrl);

    cy.get('header').then(($header) => {
      if ($header.find('a').length > 0) {
        const headerPointerEvents = $header.css('pointer-events');

        if (headerPointerEvents === 'none') {
          // Если у всего header pointer-events: none, тест проходит успешно
          cy.log('Header has pointer-events: none, all links are unclickable');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
          cy.wrap($header)
            .find('a')
            .each(($link) => {
              cy.wrap($link).should('have.css', 'pointer-events', 'none');
            });
          cy.log('Links has pointer-events: none, all links are unclickable');
        }
      } else {
        // Если в хедере нет ссылок, тест проходит успешно
        cy.log('Header has no links');
      }
    });
  });
});
