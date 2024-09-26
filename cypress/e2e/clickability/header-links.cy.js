const targetUrl = Cypress.env('targetUrl');

describe('Все ссылки в блоке header некликабельные', function () {
  it('Ссылки в блоке header должны быть некликабельными', function () {
    cy.visit(targetUrl);

    cy.get('header').then(($header) => {
      // Проверяем, есть ли ссылки внутри header
      if ($header.find('a').length > 0) {
        const headerPointerEvents = $header.css('pointer-events');

        if (headerPointerEvents === 'none') {
          // Если у всего header pointer-events: none, тест проходит успешно
          cy.log('Все ссылки в блоке header некликабельные через pointer-events: none');
        } else if ($header.attr('inert')) {
          // Если у header есть атрибут inert
          cy.log('Все ссылки в блоке header некликабельные через атрибут inert');
        } else {
          // Проверяем каждую ссылку, чтобы убедиться, что у нее pointer-events: none или inert
          cy.wrap($header)
            .find('a')
            .each(($link) => {
              const linkPointerEvents = $link.css('pointer-events');
              if (linkPointerEvents !== 'none' && !$link.closest('[inert]').length) {
                throw new Error(
                  'Ссылка в блоке header кликабельна и не имеет inert или pointer-events: none'
                );
              }
            });
          cy.log(
            'Все ссылки в блоке header некликабельные через pointer-events: none или атрибут inert'
          );
        }
      } else {
        // Если в хедере нет ссылок, тест проходит успешно
        cy.log('Блок header не имеет ссылок');
      }
    });
  });
});
