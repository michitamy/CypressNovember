class PostmateOrdersObjectPage
{
 getSearchField()
 {
    return cy.get("#search-suggestions-typeahead-input")
 }
 selectOptionFood()
 {
    return cy.contains('Search for "pasta"')
 }
 getFirstRestaurant()
 {
    return cy.get("[data-testid='store-card']").first()
 }
 getDeliveryButtonOption()
 {
   return cy.get("div [role='radio']").contains('Delivery')
 }
 getFieldOfBaseOfSearch()
 {
   return cy.get('div h1')
 }
 getCartButton()
 {
   return cy.get("button[data-test='cart-btn']")
 }
}
export default PostmateOrdersObjectPage