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
 selectFirstRestaurant()
 {
    return cy.get("[data-testid='store-card']")
 }
}
export default PostmateOrdersObjectPage