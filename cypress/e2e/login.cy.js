/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });
  it('should display alert when email is empty', () => {
    cy.get('button[type="submit"]')
      .contains(/^Login$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });
  it('should  display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('test@mail.co');
    cy.get('button[type="submit"]')
      .contains(/^Login$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('a@mail.co');
    cy.get('input[placeholder="Password"]').type('wrong-pass');
    cy.get('button[type="submit"]')
      .contains(/^Login$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });
  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('a@mail.co');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('button[type="submit"]')
      .contains(/^Login$/)
      .click();
    cy.get('button')
      .contains(/^\(logout\)$/)
      .should('be.visible');
  });
});
