const targetUrl = Cypress.env('targetUrl');

function containsEmptyUrl(content) {
  const emptyUrlPatterns = ['url("")', "url('')", 'url()'];
  return emptyUrlPatterns.some((pattern) => content.includes(pattern));
}

describe('Проверка отсутствия пустых url("") в файлах', function () {
  it('HTML-файлы не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.document().then((doc) => {
      const htmlContent = doc.documentElement.outerHTML;
      if (containsEmptyUrl(htmlContent)) {
        throw new Error('В HTML найдены пустые url("").');
      }
    });
  });

  it('CSS-файлы не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('link[rel="stylesheet"]').then(($links) => {
      if (!$links.length) return;

      const checkPromises = [];

      $links.each((_, link) => {
        const href = link.getAttribute('href');
        if (href) {
          const promise = cy
            .request({
              url: href,
              failOnStatusCode: false,
            })
            .then((response) => {
              if (response.status === 200 && typeof response.body === 'string') {
                if (containsEmptyUrl(response.body)) {
                  throw new Error(`В CSS-файле ${href} найдены пустые url("").`);
                }
              }
            });

          checkPromises.push(promise);
        }
      });

      return Cypress.Promise.all(checkPromises);
    });
  });

  it('JS-файлы не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('script[src]').then(($scripts) => {
      if (!$scripts.length) return;

      const checkPromises = [];

      $scripts.each((_, script) => {
        const src = script.getAttribute('src');
        if (src) {
          const promise = cy
            .request({
              url: src,
              failOnStatusCode: false,
            })
            .then((response) => {
              if (response.status === 200 && typeof response.body === 'string') {
                if (containsEmptyUrl(response.body)) {
                  throw new Error(`В JS-файле ${src} найдены пустые url("").`);
                }
              }
            });

          checkPromises.push(promise);
        }
      });

      return Cypress.Promise.all(checkPromises);
    });
  });

  it('Встроенные стили не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('style', {timeout: 0}).then(($styles) => {
      if (!$styles.length) return;

      $styles.each((_, styleEl) => {
        const content = styleEl.textContent || '';
        if (containsEmptyUrl(content)) {
          throw new Error('Во встроенных стилях найдены пустые url("").');
        }
      });
    });
  });

  it('Инлайн-стили не должны содержать пустых url("")', function () {
    cy.visit(targetUrl);

    cy.get('[style]', {timeout: 0}).then(($elements) => {
      if (!$elements.length) return;

      $elements.each((_, el) => {
        const styleAttr = el.getAttribute('style') || '';
        if (containsEmptyUrl(styleAttr)) {
          throw new Error('В инлайн-стилях найдены пустые url("").');
        }
      });
    });
  });
});
