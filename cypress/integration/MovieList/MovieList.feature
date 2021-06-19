Feature: Movie List Page

  Scenario: Success - Movie List
    When User Visit Movie List
    Then User Saw Movie List

  Scenario: Success - Movie List Increased
    When User Scroll to Bottom
    Then Movie List Increased

  Scenario: Success - Movie List Clicked
    When User Click Movie List
    Then User Redirect to Detail

# Failed Scenario Here