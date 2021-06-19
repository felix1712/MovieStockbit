Feature: Home Page

  Scenario: Success - Home
    When User Visit Home
    Then User Will See Landing Page

  Scenario: Success - Try Search
    When User Try Search
    Then User Will Saw Suggestion

  Scenario: Success - Try Search and click
    When User Click Search
    Then User Redirect to Detail

# Failed Scenario Here