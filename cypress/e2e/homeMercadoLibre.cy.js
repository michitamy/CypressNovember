/// <reference types="cypress"/>

describe("Test suite homepage",()=>
{
    before("validate status of the page",()=>
    {
        cy.request("https://mercadolibre.com").then((response)=>
        {
            expect(response.status).equal(200)
        })
               
    })
    it("Select MX country",()=>
    {
        cy.visit("https://mercadolibre.com") 
        cy.get('#MX').click()
        cy.origin('https://www.mercadolibre.com.mx/#from=homecom', () => {
        cy.get('.nav-menu-cp.nav-menu-cp-logged').should('be.visible')
        })
    })

    it.only("Add Zip Code Valid",()=>
    {
        cy.visit('https://www.mercadolibre.com.mx')
        cy.get(".nav-menu-item").first().should('be.visible')
        cy.get(".nav-menu-item").first().click()
        cy.get('[data-testid=zip-code-textfield]').type("33333")
        cy.get('.andes-form-control__embedded').click()
            cy.get(".nav-header-plus-cp-wrapper").then(($element) => {
                const zipContain = $element.text()
                expect(zipContain).to.contain('33333')
        })
    })
})