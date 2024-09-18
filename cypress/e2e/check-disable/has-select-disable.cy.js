const targetUrl = Cypress.env('targetUrl');

describe('Проверка наличия стилей CSS', () => {
  it('Должен подтвердить наличие хотя бы одного элемента с указанными стилями', () => {
    cy.visit(targetUrl);
    let styleFound = false;

    const checkStyles = (selector) => {
      cy.get('body')
        .find(selector)
        .then(($elements) => {
          if ($elements.length > 0) {
            console.log($elements);
            $elements.each((index, element) => {
              const $el = Cypress.$(element);
              if ($el.css('pointer-events') === 'none') {
                if (
                  cy.wrap($el).should('have.css', 'pointer-events', 'none')
                  // .and('have.css', 'user-select', 'none')
                  // .and('have.css', '-webkit-user-select', 'none')
                  // .and('have.css', '-ms-user-select', 'none')
                  // .and('have.css', '-moz-user-select', 'none')
                ) {
                  styleFound = true;
                }
              }
            });
          }
        });
    };

    checkStyles('.check__wrapper');

    checkStyles('.check');

    checkStyles('.un-steps__check');

    cy.then(() => {
      expect(styleFound).to.be.true;
    });
  });
});

describe('Проверка наличия стилей CSS', () => {
  it('Должен подтвердить наличие элементов с указанными стилями', () => {
    cy.visit(targetUrl);

    let styleFound = false;
    // Функция для проверки наличия и значения стиля
    const checkStyles = (selector) => {
      cy.get('body')
        .find(selector)
        .then(($elements) => {
          if ($elements.length > 0) {
            console.log($elements);
            $elements.each((index, element) => {
              const $el = Cypress.$(element);
              if ($el.css('pointer-events') === 'none') {
                if (
                  cy
                    .wrap($el)
                    .should('have.css', 'user-select', 'none')
                    .or('have.css', '-webkit-user-select', 'none')
                    .or('have.css', '-ms-user-select', 'none')
                    .or('have.css', '-moz-user-select', 'none')
                ) {
                  styleFound = true;
                }
              }
            });
          }
        });
    };

    checkStyles('[class$="check-mobile"]');

    cy.then(() => {
      expect(styleFound).to.be.true;
    });
  });
});
