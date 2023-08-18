/// <reference types="Cypress" />

//import { faker } from '@faker-js/faker';

describe('Central de Atendimento ao Cliente TAT', function() {
    const user = {}
    const largeText = 'Texto extenso para visualizar o preenchimento de um longo texto e validar que a informação não impactará no teste a ser executado pelo cypress.'

/*    before(function() {
        user.nome = faker.person.firstName()
        user.sobrenome = faker.person.lastName()
        user.email = faker.internet.email()
        user.textArea = faker.lorem.words(3)
    })*/

    beforeEach(function () {
        cy.visit('./src/index.html')
        
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
         })
    
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Testes')
        cy.get('#lastName').type('Testador')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('Informação para teste')
        cy.get('button').click()
        cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')
    })

    it('Preencher campo de texto e informar um delay', function() {
        cy.get('#open-text-area')
        .type(largeText, { delay: 0 })
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Testes')
        cy.get('#lastName').type('Testador')
        cy.get('#email').type('teste')
        cy.get('#open-text-area').type(largeText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible');
    })

    it('Preencher campo telefone com valor não numerico e validar o campo vazio', function() {
        cy.get('#phone')
        .type('informacao')
        .should('have.value', '');
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Testes')
        cy.get('#lastName').type('Testador')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('Informação para teste')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible');
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Testes')
        .should('have.value', 'Testes')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Testador')
        .should('have.value', 'Testador')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('teste@teste.com')
        .should('have.value', 'teste@teste.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type(99999999)
        .should('have.value', 99999999)
        .clear().should('have.value', '')
        cy.get('#open-text-area')
        .type('Informação para teste')
        .should('have.value', 'Informação para teste')
        .clear()
        .should('have.value', '');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.contains('.error', 'Valide os campos obrigatórios!').should('be.visible');
    })

    it.only('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback', function() {
        cy.get('input[name="atendimento-tat"]')
        .check()
        .should('be.checked')
        .and('have.value', 'ajuda')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('#check input[type="checkbox"]')
        .as('checkboxes')
        .check()

        cy.get('@checkboxes')
        .each(checkbox => {
            expect(checkbox[0].checked).to.equal((true))
        })

        cy.get('@checkboxes')
        .last()
        .uncheck()
        .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/example.json')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json', { encoding: null}).as('exampleFile')
        cy.get('input[type="file"]')
        .selectFile('@exampleFile')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a[href="privacy.html"]')
        .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('a[href="privacy.html"]')
        .invoke('removeAttr', 'target')
        .click()
        
        cy.contains('Talking About Testing')
        .should('be.visible')
    })

})
  