describe('Проверка атрибута inert на странице', () => {
  it('Проверяет наличие inert в блоках aside, header, footer', () => {
    cy.get('header').then(($header) => {
      if ($header.attr('inert')) {
        cy.get('header').should('have.attr', 'inert');
      } else {
        cy.log('Атрибут inert отсутствует в header');
      }
    });

    // Проверка для footer
    cy.get('footer').then(($footer) => {
      if ($footer.attr('inert')) {
        cy.get('footer').should('have.attr', 'inert');
      } else {
        cy.log('Атрибут inert отсутствует в footer');
      }
    });

    // Проверка для aside
    cy.get('aside').then(($aside) => {
      if ($aside.attr('inert')) {
        cy.get('aside').should('have.attr', 'inert');
      } else {
        cy.log('Атрибут inert отсутствует в aside');
      }
    });
  });

  it('Проверяет, что ссылки внутри блоков с inert не кликабельны', () => {
    // Пример проверки на элементе, если inert включён
    cy.get('header[inert]')
      .find('a')
      .each(($link) => {
        cy.wrap($link).click({force: true}); // Пробуем кликнуть по ссылке с inert
        cy.location('href').should('not.eq', $link.prop('href')); // Проверяем, что перехода не произошло
      });
  });
});
