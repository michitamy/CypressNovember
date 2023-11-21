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
}
export default PostmateOrdersObjectPage