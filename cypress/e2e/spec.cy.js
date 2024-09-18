// is link aviable
const targetUrl = Cypress.env('targetUrl');

describe('service is available', function () {
  it('should be available on the link', function () {
    cy.visit(targetUrl);
  });
});
