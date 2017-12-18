Feature: GeriLife residents tests

  Background:
    Given the user opens GeriLife index page

  Scenario: Residents page display and pagination
    Given the user opens the Residents page
    And the residents are visible
    When the user can change the current residents page
    And the user can change the residents per roll of the page
    Then the user searches for a resident by "name"
    And the user searches for a resident by "home"

  Scenario: Residents page adding residents
    Given the user opens the Residents page
    When the user adds a new resident
    And the user adds a new departed resident