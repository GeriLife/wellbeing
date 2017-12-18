Feature: GeriLife settings tests

  Background:
    Given the user opens GeriLife index page

  Scenario: user can access, view and change activity types
    Given the user opens the "Settings" page
    When the user opens the "Activity Types" page
    And the activities are visible
    Then the user can "add" an activity type
    And the user can "remove" an activity type

  Scenario: user can access and change time zone
    Given the user opens the "Settings" page
    When the user opens the "Date/Time" page
    Then the user can change the time zone

  Scenario: user can view and edit roles
    Given the user opens the "Settings" page
    When the user opens the "Roles" page
    And the roles are visible
#    Then the user can "add" a role
#    And the user can "remove" a role

  Scenario: user can add and remove user
    Given the user opens the "Settings" page
    When the user opens the "Users" page
    And the user creates a new user
    Then the user can change the user's email
    And the user can make the new user an admin
    And the user can remove the new user