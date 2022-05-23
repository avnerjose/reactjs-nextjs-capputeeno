function handleBuyProduct() {
  cy.findByText("Camisetas").click();
  cy.get(".grid > :nth-child(1) > .flex").click();
  cy.findByRole("button").click();
  cy.get(".shopping-cart").click();
}

describe("e2e testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to finish buying product", () => {
    handleBuyProduct();
    cy.get("#finish-order").click();

    cy.findByText(/(0 produtos)/).should("exist");
    cy.findByRole("button").should("be.disabled");
  });

  it("should be able delete product from cart", () => {
    handleBuyProduct();
    cy.get(".items-center > .w-5").click();

    cy.findByText(/(0 produtos)/).should("exist");
    cy.findByRole("button").should("be.disabled");
  });

  it("should be able to change product amount", () => {
    handleBuyProduct();

    cy.findByTestId("amount-select").select("3");

    cy.findByText(/(3 produtos)/).should("exist");
    cy.findByRole("button").should("not.be.disabled");
  });
});
