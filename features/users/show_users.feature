Feature: Show Users
  As a visitor to the website
  I want to see registered users listed on the homepage
  so I can know if the site has users

    Scenario: Viewing users
      Given I am logged in
      When I look at the list of users
      Then I should see my name
	  
	Scenario: Viewing users as guest
	  Given I do not exist as a user
	  When I look at the list of users
	  Then I should not see "Users"
	
	
	