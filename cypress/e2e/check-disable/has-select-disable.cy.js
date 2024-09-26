const targetUrl = Cypress.env('targetUrl');

describe('Проверка наличия стилей CSS для чека', () => {
  it('Для класса .check (чек банка) применены CSS-стили, которые отключают возможность взаимодействия пользователя с содержимым', () => {
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
                let wrapper = cy.wrap($el);

                wrapper.then(($el) => {
                  const stylesToCheck = [
                    'user-select',
                    '-webkit-user-select',
                    '-ms-user-select',
                    '-moz-user-select',
                  ];

                  stylesToCheck.forEach((style) => {
                    if (Cypress.$($el).css(style) === 'none') {
                      styleFound = true;
                    }
                  });
                });
              }
            });
          }
        });
    };

    checkStyles('.check__wrapper');

    checkStyles('.check');

    checkStyles('.un-steps__check');

    checkStyles('[class$="check-mobile"]');

    cy.then(() => {
      expect(styleFound).to.be.true;
    });
  });
});
