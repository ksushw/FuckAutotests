const targetUrl = Cypress.env('targetUrl');

describe('Пропуск строки с комментарием <!-- skip test -->', () => {
  it('Исключая строку с комментарием <!-- skip test -->', () => {
    cy.visit(targetUrl);

    cy.get('html').then(($html) => {
      const filteredElements = [];

      const hasSkipTestComment = (element) => {
        const previousSibling = element.previousSibling;
        return (
          previousSibling &&
          previousSibling.nodeType === Node.COMMENT_NODE &&
          previousSibling.nodeValue.trim() === 'skip test'
        );
      };

      $html.find('*').each((_, element) => {
        if (!hasSkipTestComment(element)) {
          filteredElements.push(element);
        }
      });
      cy.wrap(filteredElements).each(($el) => {
        cy.wrap($el).should('exist');
      });
    });
  });
});
