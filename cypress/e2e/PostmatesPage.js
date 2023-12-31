/// <reference types="cypress"/>
//importar las clases definiendo su ruta
import AddressSelectors from './PageObjects/PostmatesDeliveryAddressObjectPage.js'
import OrdersSelectors from './PageObjects/PostmatesOrdersObjectPage.js'
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
    it("empty address", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getSearchButton().click({ force: true })
        //I think this should display an error message for the user, so the know the infomation needed
    })

    /**
     * presionar el botón de buscar
     * si direccion de lugar pero con fecha de entrega
     */
    it("empty address, adding schedule for later", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getDeliverTime().click({ force: true })
        cy.contains("Schedule for later").click({ force: true })
        cy.contains("Schedule").click()
        cy.wait(2000)
        addressDelivery.getSearchButton().click({ force: true })
        //I think this should display an error message for the user, so the know the infomation needed
    })


    /**
     * este el el happy path de poner una direccion
     * con la entrega lo mas pronto posible
     * y de alli entrar a buscar lo que se va a encargar
     * nota: tuve que usar { force: true } por que los elementos estan cubiertos por algo
     */
    it("set an address", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getAddressField().type("Ocha", { force: true })
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
    it("An existing addres but out the range of service", () => {
        const addressDelivery = new AddressSelectors()
        addressDelivery.getAddressField().type("Calle General Carlos Pacheco 7", { force: true })
        cy.contains('Calle General').click({ force: true })
        cy.get("#main-content").should('contain', "only available within the United States")

        // })
    })
    /**
     * validar que el boton de limpiar exista y funciones
     */

    it("button of 'clear' displayed when there is text", () => {
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
        it("add a unexisted address", () => {
            const addressDelivery = new AddressSelectors()
            addressDelivery.getAddressField().type(inputText, { force: true }).then(() => {
                addressDelivery.getNoResultMessage().should('exist')
            })
        })
    })



})
describe('make an order', () => {
    beforeEach("load the page with a predefined delivery address", () => {
        cy.visit("https://postmates.com/")
        cy.viewport(1440, 900)
        //cy.get("#location-typeahead-home-input").type("test", { force: true })
    })

    /**
     * 
     * Este caso de prueba solo funciona cuando el restaurante 
     * esta en horario de servicio 
     * 
     * */
    it("Add product to cart", () => {
        const addressDelivery = new AddressSelectors()
        const ordersPage = new OrdersSelectors()
        addressDelivery.selectAddressOption()
        ordersPage.getSearchField().type('pasta {enter}').then(() => {
            ordersPage.getDeliveryButtonOption().should('have.attr','aria-checked').and('equal', 'true');
            })
        ordersPage.getFieldOfBaseOfSearch().should('contain.text','pasta')
        ordersPage.getCartButton().should('contain', '0')
        ordersPage.getFirstRestaurant().click()
        cy.get("[data-testid='store-menu-item--b110c398-6ed7-5cc5-bd69-ea1539c468a7']").click().then(() => {
            cy.get("button").contains("Add 1 to order").click()
            })
            ordersPage.getCartButton().should('contain', "1")
        //como puedo hacer mock de una hora? par aprobar cuando un restaurant esta cerrado
    })
     /**
      * el caso de remover producto del carrito esta incompleto
      */
    it.skip("remove an element from the cart",()=>
    {
        const addressPage = new AddressSelectors()
        const ordersPage = new OrdersSelectors()
        addressPage.selectAddressOption()
        ordersPage.getSearchField().type('sushi {enter}').then('until the action finished',()=>
        {
            ordersPage.getDeliveryButtonOption().should('have.attr','aria-checked').and('equal', 'true');
        })
        ordersPage.getFirstRestaurant().click()
        cy.get("[data-testid='store-menu-item--227a4a84-4f1c-52f9-8c65-0d74272a6493']").click()
            cy.get("button").contains("Add 1 to order").click().then(()=>
            {
                ordersPage.getCartButton().should('contain', "1")
            })
            cy.get('[data-test="cart"]').should('be.visible')
            cy.get("[data-testid='quantity-selector']").click({force:true}).then(()=>
            {
                cy.contains('Remove').click({force:true})
            })
            cy.get('[data-test="cart"]').should('not.be.visible')
            ordersPage.getCartButton().should('contain', "0")
            // ordersPage.getCartButton().click({force: true}).then(()=>
            // {
            //     cy.get("data-testid='quantity-selector'").contains('Remove').invoke('show').click()
            //     ordersPage.getCartButton().should('contain', "0")
            //     // cy.get("select option").contains('Remove').then((option)=>
            //     // {
            //     //     //cy.wrap(option).contains('Remove')
            //     //     option[0].click()
            //     //     ordersPage.getCartButton().should('contain', "0")

            //     // })          
            //  })
            

    })
    /**
     * cuando el restaurant ya esta cerrado
     */
    it.skip("when a resturant it's closed", () => {
        const addressDelivery = new AddressSelectors()
        const ordersPage = new OrdersSelectors()
        addressDelivery.selectAddressOption()
        ordersPage.getSearchField().type('pasta {enter}')
        ordersPage.getFirstRestaurant().first().click().then(() => {
            cy.get('[data-test="modality-pill"]').should('include.text', 'Closed')
        })

        //no entiendo por que en cypres el encabezado sale como lugar muy lejos
        //y en browser de chrome sale que el restaurante sale cerrado
        //(thinking)
    })
})