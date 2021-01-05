describe('Test1',function(){
    beforeEach(()=>{
        cy.visit('https://www.google.com/')
    })
    it('Google Search',function(){
        cy.get('input[name="q"]').type('Cypress')
        cy.get('input').contains('Google Search').click()
        cy.get('body').should('contain', 'Cypress')
    })
})
