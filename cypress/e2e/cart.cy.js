// cypress/e2e/cart.cy.js
describe("Shopping Cart E2E", () => {
  it("adds product to cart & applies coupon", () => {
    cy.visit("http://localhost:8080");
    cy.contains("Laptop")
      .parent()
      .find("button")
      .contains("Add to Cart")
      .click();
    cy.contains("Cart").next().should("contain", "Laptop");
    cy.get("input[placeholder='Enter coupon']").type("SAVE20");
    cy.contains("Apply").click();
    cy.contains("Discount: ₹8000");
  });
});
