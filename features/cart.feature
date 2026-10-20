Feature: Cart

  @TC12 @cart
  Scenario: Add the first two products and check the cart
    Given I open the homepage
    Then the homepage is visible
    When I open the Products page
    And I hover over the first product
    And I click Add to cart for the first product
    And I click Continue Shopping
    And I hover over the second product
    And I click Add to cart for the second product
    And I click View Cart
    Then the cart has the following products:
      | Product        | Price    | Quantity | Total    |
      | First product  | Rs. 500  | 1        | Rs. 500  |
      | Second product | Rs. 400  | 1        | Rs. 400  |

  @TC13 @cart
  Scenario: Add a product with quantity of 4
    Given I open the homepage
    Then the homepage is visible
    When I click View Product for the first product
    Then the product detail page is displayed
    When I set the product quantity using:
      | Quantity | 4 |
    And I click Add to cart on the product detail page
    And I click View Cart
    Then the cart has the following products:
      | Product       | Quantity |
      | First product | 4        |

  @TC20 @cart @search
  Scenario: Search products and verify cart after login
    Given I open the homepage
    Then the homepage is visible
    When I open the Products page
    Then the ALL PRODUCTS heading is visible
    When I search using this data:
      | Search term | Expected text in each result |
      | Blue        | Blue                         |
    Then the SEARCHED PRODUCTS heading is visible
    And every result contains the expected text
    When I add all search results to the cart
    And I click Cart in the navigation menu
    Then all searched products are visible in the cart
    When I click Signup / Login
    And I enter existing login details:
      | Email    | tc16.user@gmail.com |
      | Password | 12345               |
      | Username | tc16                |
    And I click Login
    Then I am logged in as the existing user
    When I click Cart in the navigation menu
    Then all searched products are visible in the cart