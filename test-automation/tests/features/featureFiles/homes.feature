Feature: GeriLife homes tests

  Background:
    Given the user opens GeriLife index page

  Scenario: Homes page verifications
    Given the user opens the Homes page
    And the homes groups are visible
    And the user can rename a group

  Scenario: User can add new group and home
    Given the user opens the Homes page
    When the user adds a new group
    And the user add a new home to the group
    Then the group with home are visible

  Scenario: User can edit homes
    Given the user opens the Homes page
    When the user changes a home's name and group
    Then the residents and their activities are visible