Feature: Verify Packages on Airalo Website

  Background: Below given step is to launch browser and open Airalo website
    Below given step is to launch browser and open Airalo website

    Given User open the Airalo website

  Scenario: Verify Package Details    
    Then the title should be "Buy eSIMs for international travel - Airalo"
    When user type "Japan" in search field on homepage
    Then user select "Japan" from options   
    When user select first package from list and click on buy now
    Then package details popup appears
    And user verify following details on popup
            | Coverage | Japan       |
            | Data     | 1 GB        |
            | Validity | 7 Days      |
            | Price    | 4.50        |