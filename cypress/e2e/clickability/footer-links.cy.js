// MOC LINKS
const targetUrl = Cypress.env('targetUrl');

describe('footer unclickable footer links', function () {
  it('should be disabled', function () {
    cy.visit(targetUrl);

    cy.get('footer').then(($footer) => {
      if ($footer.find('a').length > 0) {
        const footerPointerEvents = $footer.css('pointer-events');

        if (footerPointerEvents === 'none') {
          // Если у всего footer pointer-events: none, тест проходит успешно
          cy.log('footer has pointer-events: none, all links are unclickable');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
          cy.wrap($footer)
            .find('a')
            .each(($link) => {
              cy.wrap($link).should('have.css', 'pointer-events', 'none');
            });
          cy.log('Links has pointer-events: none, all links are unclickable');
        }
      } else {
        // Если в хедере нет ссылок, тест проходит успешно
        cy.log('footer has no links');
      }
    });
  });
});
