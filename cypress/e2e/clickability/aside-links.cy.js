// MOC LINKS
const targetUrl = Cypress.env('targetUrl');

describe('aside unclickable links', function () {
  it('should be disabled', function () {
    cy.visit(targetUrl[1]);

    cy.get('body').then(($body) => {
      if ($body.find('aside').length > 0) {
        cy.wrap($body)
          .find('aside')
          .each(($aside) => {
            if ($aside.find('a').length > 0 || Cypress.$($aside).is(':visible')) {
              const asidePointerEvents = $aside.css('pointer-events');
              if (asidePointerEvents === 'none') {
                // Если у всего aside pointer-events: none, тест проходит успешно
                cy.log('Aside has pointer-events: none, all links are unclickable');
              } else {
                // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none
                cy.wrap($aside)
                  .find('a')
                  .each(($link) => {
                    cy.wrap($link).should('have.css', 'pointer-events', 'none');
                  });
                cy.log('Aside links have pointer-events: none, all links are unclickable');
              }
            } else {
              // Если в aside нет ссылок, тест проходит успешно
              cy.log('Aside has no links');
            }
          });
      } else {
        cy.log('No aside elements found on the page');
      }
    });
  });
});
