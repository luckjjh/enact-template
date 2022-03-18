Feature: Sub
	Scenario: Launch sub page
		Given Main page is launched.
		When User clicks Next button.
		Then The sub page is displayed well.

	Scenario: Go back to main with back icon
		Given Sub page is launched.
		When User clicks return icon.
		Then The main page is displayed well.

	Scenario: Go back to main with back button
		Given Sub page is launched.
		When User pushes back button on remote control.
		Then The main page is displayed well.