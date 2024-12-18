const targetUrl = Cypress.env('targetUrl');

describe('Все ссылки в блоке <aside> некликабельные', function () {
  it('Ссылки в блоке <aside> должны быть некликабельными', function () {
    cy.visit(targetUrl);

    cy.get('aside').then(($aside) => {
      // Проверяем, есть ли ссылки внутри aside
      if ($aside.find('a').length > 0) {
        const asidePointerEvents = $aside.css('pointer-events');

        if (asidePointerEvents === 'none') {
          // Если у всего aside pointer-events: none, тест проходит успешно
          cy.log('Все ссылки в блоке aside некликабельные через pointer-events: none');
        } else if ($aside.attr('inert')) {
          // Если у aside есть атрибут inert
          cy.log('Все ссылки в блоке aside некликабельные через атрибут inert');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none или inert
          cy.wrap($aside)
            .find('a')
            .each(($link) => {
              const linkPointerEvents = $link.css('pointer-events');
              if (linkPointerEvents !== 'none' && !$link.closest('[inert]').length) {
                throw new Error(
                  'Ссылка в блоке aside кликабельна и не имеет inert или pointer-events: none'
                );
              }
            });
          cy.log(
            'Все ссылки в блоке aside некликабельные через pointer-events: none или атрибут inert'
          );
        }
      } else {
        // Если в aside нет ссылок, тест проходит успешно
        cy.log('Блок aside не имеет ссылок');
      }
    });
  });
});
