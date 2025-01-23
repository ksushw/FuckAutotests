const targetUrl = Cypress.env('targetUrl');
const expectedLink = '{{link}}';
const specialButtonLink = '{{link}}&place=button';

describe('Проверка ссылок на странице', function () {
  it('Все ссылки, (исключая кнопки "register now"), должны иметь href="{{link}}"', function () {
    cy.visit(targetUrl);

    let specialLinkCount = 0;

    cy.get('body a')
      .each(($link) => {
        const href = $link.attr('href');

        if (href === specialButtonLink) {
          specialLinkCount++;
        } else {
          expect(href).to.equal(
            expectedLink,
            `Ссылка имеет некорректный href: ${href}, ожидалось ${expectedLink}`
          );
        }
      })
      .then(() => {
        expect(specialLinkCount, 'Ссылка {{link}}&place=button должна быть только одна').to.equal(
          1
        );
      });
  });
});
