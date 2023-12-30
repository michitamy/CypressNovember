class PostmatesDeliveryAddressSelectors
{
    getAddressField()
    {
        return cy.get("#location-typeahead-home-input").as("Address field")
    }

    getSearchButton()
    {
        return cy.contains('Search here').as("Search button")
    }

    getDeliverTime()
    {
        return cy.contains("Deliver now").as("Deliver now")
    }
    getLocationDisplay()
    {
        return cy.get("[data-testid='edit-delivery-location-button']").as("Address Display")
    }
    getClearButton()
    {
        return cy.get(".am.ak.d4.dz button")
        //por alguna razon este campo no le puedo poner .as("algo")
        //si le pongo .as() no encuentra el elemento
    }
    getNoResultMessage()
    {
        return cy.contains('Try again').as("Try again")
    }
    selectAddressOption()
    {
        cy.get("#location-typeahead-home-input").type("test", { force: true }).then(()=>
        {
            return cy.contains('Test').invoke("show").click({ force: true })
        })
    }
}
//this is to make the class available for all other files in the framework
export default PostmatesDeliveryAddressSelectors;