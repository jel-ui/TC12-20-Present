Feature: Homepage scroll

  @TC25 @homepage @scroll
  Scenario: Scroll down and use the arrow to return to the top
    Given I open the homepage
    Then the homepage is visible
    When I scroll down to the bottom of the page
    Then the SUBSCRIPTION section is visible
    When I click the scroll-up arrow
    Then the homepage heading is visible at the top