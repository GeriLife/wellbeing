Feature: GeriLife accessibility tests

  Background:
    Given the user opens GeriLife index page

  Scenario: User can log in and change language
    And the current language is "English"
    When the user changes the language to "Suomi"
    Then the current language is "Suomi"
    And the user changes the language to "English"
    And the user logs out