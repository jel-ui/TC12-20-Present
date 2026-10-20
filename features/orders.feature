Feature: Place order

  @TC14 @orders
  Scenario: Register during checkout and place an order
    Given I open the homepage
    Then the homepage is visible
    When I open the Products page
    And I hover over the first product
    And I click Add to cart for the first product
    And I click View Cart
    Then the cart page is displayed
    When I click Proceed To Checkout
    And I click Register or Login
    And I enter signup name and email
    And I click Signup
    And I enter account details:
      | Password      | 12345                                 |
      | First name    | Tran                                  |
      | Last name     | Nam                                   |
      | Address       | D2 Street, Thu Duc City, Ho Chi Minh City |
      | Country       | United States                         |
      | State         | California                            |
      | City          | New York City                         |
      | Zipcode       | 100000                                |
      | Mobile Number | 1231231235                            |
    And I click Create Account
    Then the account created message is displayed
    When I click Continue after account creation
    Then I am logged in as the new user
    When I click Cart in the navigation menu
    And I click Proceed To Checkout
    Then the address details are displayed
    And the order review is displayed
    When I enter the order comment:
      | Comment | Please deliver my order. |
    And I click Place Order
    And I enter payment details:
      | Name on Card     | Tran Nam         |
      | Card Number      | 1234567890123456 |
      | CVC              | 123              |
      | Expiration Month | 12               |
      | Expiration Year  | 2030             |
    And I click Pay and Confirm Order
    Then the order success message is displayed
    When I click Delete Account
    Then the account deleted message is displayed
    And I click Continue after account deletion

  @TC15 @orders
  Scenario: Register before checkout and place an order
    Given I open the homepage
    Then the homepage is visible
    When I click Signup / Login
    Then the signup form is displayed
    When I enter signup name and email
    And I click Signup
    And I enter account details:
      | Password      | 12345                                 |
      | First name    | Tran                                  |
      | Last name     | Nam                                   |
      | Address       | D2 Street, Thu Duc City, Ho Chi Minh City |
      | Country       | United States                         |
      | State         | California                            |
      | City          | New York City                         |
      | Zipcode       | 100000                                |
      | Mobile Number | 1231231235                            |
    And I click Create Account
    Then the account created message is displayed
    When I click Continue after account creation
    Then I am logged in as the new user
    When I open the Products page
    And I hover over the first product
    And I click Add to cart for the first product
    And I click Continue Shopping
    And I hover over the second product
    And I click Add to cart for the second product
    And I click View Cart
    Then the cart page is displayed
    When I click Proceed To Checkout
    Then the address details are displayed
    And the order review is displayed
    When I enter the order comment:
      | Comment | Please deliver my order. |
    And I click Place Order
    And I enter payment details:
      | Name on Card     | Tran Nam         |
      | Card Number      | 1234567890123456 |
      | CVC              | 123              |
      | Expiration Month | 12               |
      | Expiration Year  | 2030             |
    And I click Pay and Confirm Order
    Then the order success message is displayed
    When I click Delete Account
    Then the account deleted message is displayed
    And I click Continue after account deletion

  @TC16 @orders
  Scenario: Log in before checkout and place an order
    Given I open the homepage
    Then the homepage is visible
    When I click Signup / Login
    Then the signup form is displayed
    When I enter existing login details:
      | Email    | tc16.user@gmail.com |
      | Password | 12345               |
      | Username | tc16                |
    And I click Login
    Then I am logged in as the existing user
    When I open the Products page
    And I hover over the first product
    And I click Add to cart for the first product
    And I click Continue Shopping
    And I hover over the second product
    And I click Add to cart for the second product
    And I click View Cart
    Then the cart page is displayed
    When I click Proceed To Checkout
    Then the address details are displayed
    And the order review is displayed
    When I enter the order comment:
      | Comment | Please deliver my order. |
    And I click Place Order
    And I enter payment details:
      | Name on Card     | Tran Nam         |
      | Card Number      | 1234567890123456 |
      | CVC              | 123              |
      | Expiration Month | 12               |
      | Expiration Year  | 2030             |
    And I click Pay and Confirm Order
    Then the order success message is displayed
    When I click Delete Account
    Then the account deleted message is displayed
    And I click Continue after account deletion


  @TC23 @orders @checkout
  Scenario: Verify delivery and billing addresses at checkout
    Given I open the homepage
    Then the homepage is visible
    When I click Signup / Login
    Then the signup form is displayed
    When I enter signup name and email
    And I click Signup
    And I enter account details:
      | Password      | 12345                                 |
      | First name    | Tran                                  |
      | Last name     | Nam                                   |
      | Address       | D2 Street, Thu Duc City, Ho Chi Minh City |
      | Country       | United States                         |
      | State         | California                            |
      | City          | New York City                         |
      | Zipcode       | 100000                                |
      | Mobile Number | 1231231235                            |
    And I click Create Account
    Then the account created message is displayed
    When I click Continue after account creation
    Then I am logged in as the new user
    When I open the Products page
    And I hover over the first product
    And I click Add to cart for the first product
    And I click Continue Shopping
    And I hover over the second product
    And I click Add to cart for the second product
    And I click Continue Shopping
    And I click Cart in the navigation menu
    Then the cart page is displayed
    When I click Proceed To Checkout
    Then delivery and billing addresses match these details:
      | First name    | Tran                                  |
      | Last name     | Nam                                   |
      | Address       | D2 Street, Thu Duc City, Ho Chi Minh City |
      | State         | California                            |
      | City          | New York City                         |
      | Zipcode       | 100000                                |
      | Country       | United States                         |
      | Mobile Number | 1231231235                            |
    When I click Delete Account
    Then the account deleted message is displayed
    And I click Continue after account deletion