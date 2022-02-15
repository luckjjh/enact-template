Feature: App
	Scenario: Launch the app
		When The app is launched.
		Then App is displayed well.

	Scenario: Close the app
		When User clicks X button.
		Then The app is closed.