Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){

    cy.get('#firstName').type('Emanuel');
    cy.get('#lastName').type('do Nascimento Júnior');
    cy.get('#email').type('emanuel.junior@ativasolucoes.com.br');
    cy.get('#open-text-area').type('Teste');
    cy.contains('button','Enviar').click();

})