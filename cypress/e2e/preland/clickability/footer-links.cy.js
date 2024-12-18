const targetUrl = Cypress.env('targetUrl');

describe('Все ссылки в блоке <footer> некликабельные', function () {
  it('Ссылки в блоке <footer> должны быть некликабельными', function () {
    cy.visit(targetUrl);

    cy.get('footer').then(($footer) => {
      // Проверяем, есть ли ссылки внутри footer
      if ($footer.find('a').length > 0) {
        const footerPointerEvents = $footer.css('pointer-events');

        if (footerPointerEvents === 'none') {
          // Если у всего footer pointer-events: none, тест проходит успешно
          cy.log('Все ссылки в блоке footer некликабельные через pointer-events: none');
        } else if ($footer.attr('inert')) {
          // Если у footer есть атрибут inert
          cy.log('Все ссылки в блоке footer некликабельные через атрибут inert');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none или inert
          cy.wrap($footer)
            .find('a')
            .each(($link) => {
              const linkPointerEvents = $link.css('pointer-events');
              if (linkPointerEvents !== 'none' && !$link.closest('[inert]').length) {
                throw new Error(
                  'Ссылка в блоке footer кликабельна и не имеет inert или pointer-events: none'
                );
              }
            });
          cy.log(
            'Все ссылки в блоке footer некликабельные через pointer-events: none или атрибут inert'
          );
        }
      } else {
        // Если в футере нет ссылок, тест проходит успешно
        cy.log('Блок footer не имеет ссылок');
      }
    });
  });
});
