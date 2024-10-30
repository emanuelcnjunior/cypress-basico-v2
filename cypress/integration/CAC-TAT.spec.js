/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function()
    {
    cy.visit('./src/index.html');
    })

    // Teste de verificação do Título
    it('verifica o título da aplicação', function()
     {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    })


    // Teste de Verificação do formulário retornando Sucesso
    it('preenche os campos obrigatórios e envia o formulário',function()
    {
 
        const   longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste';
      
        cy.clock();

        cy.get('#firstName').type('Emanuel');
        cy.get('#lastName').type('do Nascimento Júnior');
        cy.get('#email').type('emanuel.junior@ativasolucoes.com.br');
        cy.get('#open-text-area').type(longText,{delay: 0 });
        cy.get('button[type="submit"]').click();
        cy.get('.success').should('be.visible');
        cy.tick(3000);
        cy.get('.success').should('not.be.visible');
        
    })


    // Teste de Verificação do formulário retornando error
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        cy.get('#firstName').type('Emanuel');
        cy.get('#lastName').type('do Nascimento Júnior');
        cy.get('#email').type('emanuel.junior@ativasolucoes,com.br');
        cy.get('#open-text-area').type('Teste');
        cy.get('button[type="submit"]').click();      
        cy.get('.error').should('be.visible');

    })


   // Teste de Verificação do formulário retornando valor não numérico
    it('Campo telefone continua vazio quando preenchido com valor não numérico',function(){

      cy.get('#phone')
      .type('dasdsdsadsa')
      .should('have.value', '');
    
    })


   // Teste de Verificação do formulário quando telefone é obrigatório
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

      cy.get('#firstName').type('Emanuel');
      cy.get('#lastName').type('do Nascimento Júnior');
      cy.get('#email').type('emanuel.junior@ativasolucoes.com.br');
      cy.get('#phone-checkbox').check();
      cy.get('#open-text-area').type('Teste');
      cy.get('button[type="submit"]').click();
      cy.get('.error').should('be.visible');

    })   


   // Teste de Verificação utilizando a função clear
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      
      cy.get('#firstName').type('Emanuel',{delay:100}).should('have.value','Emanuel').clear().should('have.value','');
      cy.get('#lastName').type('do Nascimento Júnior').should('have.value','do Nascimento Júnior').clear().should('have.value','');
      cy.get('#phone').type('1234567890').should('have.value','1234567890').clear().should('have.value','');
      cy.get('#email').type('emanuel.junior@ativasolucoes.com.br').should('have.value','emanuel.junior@ativasolucoes.com.br').clear().should('have.value','');
      cy.get('#open-text-area').type('Teste').should('have.value','Teste').clear().should('have.value','');
   
    })


   // Teste para verificação se relatório é enviado sem preenchimento 
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

    cy.visit('./src/index.html');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
    })

    
  //Teste de formulário utilizando comando customizado
  it('envia o formuário com sucesso usando um comando customizado', function(){

  cy.fillMandatoryFieldsAndSubmit();
  cy.get('.success').should('be.visible');

  })
 //Teste de formulário utilizando contains
   it('Teste da função contains',function(){

    cy.contains('button','Enviar').click();
     
  })
  
//Teste seleciona um produto
  it('seleciona um produto (YouTube) por seu texto', function(){

  cy.get('#product').select('YouTube').should('have.value','youtube');
  cy.get('select').select('YouTube').should('have.value','youtube');
  
})
  

//Teste que seleciona um produto pelo seu valor
it('seleciona um produto (Mentoria) por seu valor (value)', function(){

cy.get('#product').select('mentoria').should('have.value','mentoria'); 

})


//Teste que seleciona um produto pelo seu indice
it('seleciona um produto (Blog) por seu índice', function(){

cy.get('#product').select(1).should('have.value','blog');  

})

//Teste marcar cada tipo de atendimento
it('marca cada tipo de atendimento', function(){

cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback');

})


it('marca cada tipo de atendimento', function(){

cy.get('input[type="radio"]')
.should('have.length',3).each(function($radio){

  cy.wrap($radio).check()
  
})



})


// Teste - uncheck 
it('marca ambos checkboxes, depois desmarca o último', function(){

  cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked');  

})


// Teste - upload de arquivos
it('seleciona um arquivo da pasta fixtures', function(){

cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
.should(function($input){expect($input[0].files[0].name).to.equal('example.json')

})

})


// Teste - seleciona um arquivo simulando um drag-and-drop

it('seleciona um arquivo simulando um drag-and-drop', function(){


cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
.should(function($input){expect($input[0].files[0].name).to.equal('example.json')

})

})



// Teste - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){

cy.fixture('example.json').as('sampleFile')
cy.get('input[type="file"]')
.selectFile('@sampleFile')
.should(function($input){
expect($input[0].files[0].name).to.equal('example.json')
})
})



// Teste - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function()
{

cy.get('#privacy a').should('have.attr','target','_blank')

})



// Teste - acessa a página da política de privacidade removendo o target e então clicando no link

it('Teste - acessa a página da política de privacidade removendo o target e então clicando no link', function(){

  cy.get('#privacy a').invoke('removeAttr', 'target').click();
  cy.contains('Talking About Testing').should('be.visible');
})



// Teste - exibe e esconde as mensagens de sucesso e erro usando o .invoke()

it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})


// Teste - preenche a area de texto usando o comando invoke

it('preenche a area de texto usando o comando invoke', function(){

const longText = Cypress._.repeat('0123456789',200);

cy.get('#open-text-area').invoke('val',longText).should('have.value', longText);

})


//Teste - faz uma requisição HTTP

it('faz uma requisição HTTP', function(){


cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should(function(response){

console.log(response);

const {status, statusText, body} = response

expect (status).to.equal(200);
expect(statusText).to.equal('OK');
expect(body).to.include('CAC TAT');

})  


})


// Teste - encontra o gato escondido

it.only('encontra o gato escondido',function(){

cy.get('#cat').invoke('show').should('be.visible');

cy.get('#title').invoke('text','CAT TAT')

cy.get('#subtitle').invoke('text','220V - Vai Corinthians 🚀' )

})











})