const targetUrl = Cypress.env('targetUrl');

describe('Проверка ссылок с якорем #form', function () {
  it('Все ссылки должны содержать href="#form", кроме тех, что имеют target="_blank",', function () {
    cy.visit(targetUrl);

    cy.get('a').each(($link) => {
      const href = $link.attr('href');
      const target = $link.attr('target');

      if (target !== '_blank') {
        expect(href).to.equal('#form', `Ссылка не ведёт к #form: ${href}`);
      }
    });
  });
});
