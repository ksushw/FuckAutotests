const targetUrl = Cypress.env('targetUrl');
const expectedLink = '{{link}}';
const specialButtonLink = '{{link}}&place=button';

describe('Таги <a> с заданной ссылкой {{link}}', function () {
  it('Все ссылки, (исключая кнопки "register now"), должны иметь href="{{link}}"', function () {
    cy.visit(targetUrl);

    cy.get('body a').each(($link) => {
      const href = $link.attr('href');

      if ($link.text().trim() === 'register now') {
        expect(href).to.equal(specialButtonLink);
      } else {
        expect(href).to.equal(expectedLink);
      }
    });
  });
});
