Feature: GeriLife activities tests

  Background:
    Given the user opens GeriLife index page

  Scenario: Activities page display and pagination
    Given the user opens the Activities page
    And the activities are visible
    When the user can filter activities by "resident"
    And the user can filter activities by "activity"
    And the user can filter activities by "resident and activity"
    Then the user can change the activities per roll of the page
    And the user can change the current activities page

  Scenario: Activities page adding and deleting
    Given the user opens the Activities page
    When the user creates a "invalid" activity
    Then the user creates a "valid" activity
    And the user deletes the activity