describe("Login",()=>{
    it("user Input validation show and remove error message",()=>{
        cy.visit("/")
        cy.findByRole("textbox").as("userInput")
        cy.get("@userInput").click()
        cy.get("@userInput").should("be.focused")
        cy.findByRole("heading",{name:/login/i}).click()
        cy.findByText(/debe informar el campo/i).should("exist")
        cy.get("@userInput").type("randomText")
        cy.findByText(/debe informar el campo/i).should("not.exist")
    })

    it("password Input validation show and remove error message when ",()=>{
        cy.visit("/")
        cy.get("input[type='password']").as("passwordInput")
        cy.get("@passwordInput").click()
        cy.get("@passwordInput").should("be.focused")
        cy.findByRole("heading",{name:/login/i}).click()
        cy.findByText(/debe informar el campo/i).should("exist")
        cy.get("@passwordInput").type("randomPassword")
        cy.findByText(/debe informar el campo/i).should("not.exist")
    })

    it("show error message when username incorrect",()=>{
        cy.visit("/")
        cy.findByRole("textbox").as("userInput")
        cy.get("input[type='password']").as("passwordInput")
        cy.get("@userInput").type("incorrectUser")
        cy.get("@passwordInput").type("test")
        cy.findByRole("button", {name:/login/i}).click()
        cy.findByText("Usuario y/o password no válidos").should("exist")
    })

    it("show error message when password incorrect",()=>{
        cy.visit("/")
        cy.findByRole("textbox").as("userInput")
        cy.get("input[type='password']").as("passwordInput")
        cy.get("@userInput").type("admin")
        cy.get("@passwordInput").type("incorrectPassword")
        cy.findByRole("button", {name:/login/i}).click()
        cy.findByText("Usuario y/o password no válidos").should("exist")
    })

    it("show error message when password and password incorrect",()=>{
        cy.visit("/")
        cy.findByRole("textbox").as("userInput")
        cy.get("input[type='password']").as("passwordInput")
        cy.get("@userInput").type("incorrectUser")
        cy.get("@passwordInput").type("incorrectPassword")
        cy.findByRole("button", {name:/login/i}).click()
        cy.findByText("Usuario y/o password no válidos").should("exist")
    })

    it("navigate to main dashboard when correct login",()=>{
        cy.correctLogin()
        cy.url().should("eq",`${Cypress.config().baseUrl}/submodule-list`)
    })

})