declare namespace Cypress {
    interface Chainable {
      correctLogin(): Chainable<Element>;
    }
  }