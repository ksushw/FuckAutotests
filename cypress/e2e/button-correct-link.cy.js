const targetUrl = Cypress.env('targetUrl');

describe('Кнопка "regiser now" с заданной ссылкой {offer_link}&place=button', function () {
  it('Кнопка "regiser now" должна иметь ссылку {offer_link}&place=button', function () {
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
