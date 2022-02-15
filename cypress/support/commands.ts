Cypress.Commands.add('correctLogin', () => {
    const user = "admin"
    const password = "test"
    cy.visit("/")
    cy.findByRole("textbox").as("userInput")
    cy.get("input[type='password']").as("passwordInput")
    cy.get("@userInput").type(user)
    cy.get("@passwordInput").type(password)
    cy.findByRole("button", {name:/login/i}).click()
  });