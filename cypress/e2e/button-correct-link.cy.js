const targetUrl = Cypress.env('targetUrl');

describe('header unclickable header links', function () {
  it('should be disabled', function () {
    cy.visit(targetUrl);

    cy.get('a').then(($links) => {
      // Проверяем каждую ссылку
      const exactLink = $links.filter(
        (i, link) => link.getAttribute('href') === '{offer_link}&place=button'
      );

      // Убедитесь, что такая ссылка существует
      expect(exactLink.length).to.equal(1);
    });
  });
});
