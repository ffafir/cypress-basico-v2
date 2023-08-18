/*Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => {
    cy.get('#firstName').type(user.nome)
    cy.get('#lastName').type(user.sobrenome)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.textArea)
    cy.contains('button[type="submit"]', 'Enviar').click()
})*/

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('De tal')
    cy.get('#email').type('fulano@teste.com')
    cy.get('#open-text-area').type('Texto a ser inserido para avaliar o preenchimento do campo de texto de área.')
    cy.contains('button[type="submit"]', 'Enviar').click()
})
