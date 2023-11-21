/// <reference types="cypress"/>
//importar las clases definiendo su ruta
import AddressSelectors from './PageObjects/PostmatesDeliveryAddressObjectPage.js'
describe("Set the address to delivery", () => {

    beforeEach("to load the page", () => {
        cy.visit("https://postmates.com/")

    })

    /**
     * Este caso de prueba es para verificar que 
     * el servidor respondaon exito al cargar la pagina 
     */
    it("200 response from server", () => {
        cy.request({
            "url": "https://postmates.com/"
        }).then((response) => {
            expect(response.status).equal(200);
        })
    })

    /**
     * presionar el botón de buscar
     * si haber ingresado informacion
     */
    it.skip("empty address", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getSearchButton().click({ force: true })
        //cy.contains('Search here').click({ force: true })
        //I think this should display an error message for the user, so the know the infomation needed
    })

    /**
     * presionar el botón de buscar
     * si direccion de lugar pero con fecha de entrega
     */
    it.skip("empty address, adding schedule for later", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getDeliverTime().click({force:true})
        //cy.contains("Deliver now").click({ force: true })
        cy.contains("Schedule for later").click({ force: true })
        cy.contains("Schedule").click()
        cy.wait(2000)
        addressDelivery.getSearchButton().click({ force: true })
        //cy.contains('Search here').click({ force: true })
        //I think this should display an error message for the user, so the know the infomation needed
    })


    /**
     * este el el happy path de poner una direccion
     * con la entrega lo mas pronto posible
     * y de alli entrar a buscar lo que se va a encargar
     * nota: tuve que usar { force: true } por que los elementos estan cubiertos por algo
     */
    it.skip("set an address", () => {
        // cy.contains("cookies").should('exist').then(() => {
        //     cy.contains("Got it").click({ force: true })
        // })

        const addressDelivery = new AddressSelectors()
        addressDelivery.getAddressField().type("test", { force: true })
        //cy.get("#location-typeahead-home-input").type("test", { force: true })
        addressDelivery.getDeliverTime().should('exist')
        //cy.contains("Deliver now").should('exist')
        cy.contains('Ocha').click({ force: true })
        addressDelivery.getLocationDisplay().should('contain', "Ocha")
        //cy.get("[data-testid='edit-delivery-location-button']").should('contain', "Ocha")
    })

    /**
     * cuando la direccion es correcta pero no hay servicio para esa zona
     */
    it.skip("An existing addres but out the range of service", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getAddressField().type("quintana roo", { force: true })
        cy.contains('Aruba').click({ force: true })
        cy.get("#main-content").should('contain', "only available within the United States")

        // })
    })
    /**
     * validar que el boton de limpiar exista y funciones
     */

    it.skip("button of 'clear' displayed when there is text", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getClearButton().should("not.exist")
        addressDelivery.getAddressField().type("lo que sea", { force: true })
        .then(() => {
            addressDelivery.getClearButton().should('exist')
            addressDelivery.getClearButton().click({ force: true })
        })
        addressDelivery.getAddressField().should('have.text', "")



    })
    /**
     * cuando se pone texto que no genera direcciones
     */
    const inputsAddress = ["0", "%^", "   "]
    inputsAddress.forEach((inputText) => {
        it.only("add a unexisted address", () => {
            const addressDelivery = new AddressSelectors()
            addressDelivery.getAddressField().type(inputText, { force: true })
            addressDelivery.getNoResultMessage().should('exist')
        })
    })



})
describe.skip('make an order', () => {
    it.skip("add a item to the car", () => {
        cy.get("#location-typeahead-home-input").type("test", { force: true })
        cy.contains('Seoul').invoke("show").click({ force: true })
        cy.get("#search-suggestions-typeahead-input").type("sushi")
    })
})