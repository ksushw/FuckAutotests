const targetUrl = Cypress.env('targetUrl');

describe('Проверка наличия плейсхолдера {{form}} в HTML-разметке', function () {
  it('На странице должен быть плейсхолдер {{form}}', function () {
    cy.visit(targetUrl);

    cy.document().then((doc) => {
      const htmlContent = doc.documentElement.outerHTML;
      expect(htmlContent).to.include(
        '{{form}}',
        'Плейсхолдер {{form}} отсутствует в HTML-разметке'
      );
    });
  });
});
