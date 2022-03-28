const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointment", () => {
  beforeEach(() => {

    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    //run the steps
    cy.get("[alt=Add]").first().click();
    cy.get('[data-testid="student-name-input"]').type("Lydia Miller-Jones");
    cy.get(':nth-child(1) > .interviewers__item-image').click();
    cy.contains("Save").click();

    //check if appointment is added
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit the interview", () => {
    //run the steps
    cy.get("[alt=Edit]").first().click({force: true});
    cy.get('[data-testid="student-name-input"]').clear().type("Lydia Miller-Jones");
    cy.get(':nth-child(1) > .interviewers__item-image').click();
    cy.contains("Save").click();

    //check if appointment is added
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should cancel the interview", () => {
    //run the steps
    cy.get("[alt=Delete]").first().click({force: true});
    cy.contains("Confirm").click();
    // cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    //check if appointment is deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});