const targetUrl = Cypress.env('targetUrl');

describe('Проверка наличия плейсхолдера {{aio.visit.fields.offer_name.for_visitor}} в HTML-разметке', function () {
  it('На странице должен быть плейсхолдер {{aio.visit.fields.offer_name.for_visitor}}', function () {
    cy.visit(targetUrl);

    cy.document().then((doc) => {
      const htmlContent = doc.documentElement.outerHTML;
      const placeholder = '{{aio.visit.fields.offer_name.for_visitor}}';

      if (!htmlContent.includes(placeholder)) {
        throw new Error(`Плейсхолдер ${placeholder} отсутствует в HTML-разметке`);
      }
    });
  });
});
