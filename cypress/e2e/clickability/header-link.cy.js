// not done(header clickability)

describe('header unclickable header links', function () {
    it('should be disabled', function() {
        cy.visit('http://5.45.74.202/landers/anupria_goenka_protest_wa_aa_bbc_in/Anupria-Goenka_protest_bbc/index.php?pwd=s712jzchsiq7hhvGxlndoz1');

        // Проверяем наличие ссылок в заголовке
        cy.get('header').then($header => {
            if ($header.filter('a')) {
                // Если ссылок нет, проверка проходит успешно
                cy.get('header').find('a').should('have.length', 0);
            } else {

                $header.filter('a').then($links => { $links.should('have.css', 'pointer-events', 'none')})
                // Если ссылки есть, проверяем их на некликабельность
                // cy.wrap($header.filter('a')).each($link => {
                //     cy.wrap($link).should('have.css', 'pointer-events', 'none')
                // })
            }
        })
    });
});





