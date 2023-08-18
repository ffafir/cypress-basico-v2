Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => {
    cy.get('#firstName').type(user.nome)
    cy.get('#lastName').type(user.sobrenome)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.textArea)
    cy.contains('button[type="submit"]', 'Enviar').click()
})
