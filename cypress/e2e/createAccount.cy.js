// cypress/integration/create_account.spec.js

describe('Create Account Page', () => {
  beforeEach(() => {
    // Set the base URL and visit the create account page
    cy.request('POST', '/api/reset-test-db').then((response) => {
      // Expect the response status to be 200, otherwise log an error message and stop the tests
      expect(response.status, 'Reset test database successfully').to.eq(200);

      // Visit the create account page if the response status is 200
      cy.visit('/reactors/create-account?csi=cs_test_a1WLk3QvOyIJRFeV21BNIhdtXx26z5rF2x6pIzYKHq32ujVSz4W4fZ0IGI');
    });
  });

  it('renders the page correctly', () => {
    cy.contains('The Reactors - Create Account');
    cy.get('input[name="emailprefilled"]').should('be.disabled');
    cy.get('input[name="emailprefilled"]').should('have.value', 'me@thintz.com');
    cy.get('input[name="password"]').should('have.attr', 'minlength', '12');
    cy.get('input[name="passwordagain"]').should('have.attr', 'minlength', '12');
  });

  it('shows an error message when passwords do not match', () => {
    cy.get('input[name="password"]').type('ValidPassword123');
    cy.get('input[name="passwordagain"]').type('InvalidPassword456');
    cy.get('button[type="submit"]').click();
    cy.contains('There was an error with your submission');
  });

  it('shows an error message when the password is too short', () => {
    cy.get('input[name="password"]').type('Short');
    cy.get('input[name="passwordagain"]').type('Short');
    cy.get('button[type="submit"]').click();
    cy.contains('There was an error with your submission');
  });

  it('submits the form successfully with valid input', () => {
    const validPassword = 'ValidPassword123';

    cy.get('input[name="password"]').type(validPassword);
    cy.get('input[name="passwordagain"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/reactors`)
  });

  it('should rate limit when sending multiple requests', () => {
    const testPassword = 'aVerySecureP@ssword123';

    // A helper function to submit the create account form
    const submitForm = () => {
      cy.get('input[name="password"]').type(testPassword);
      cy.get('input[name="passwordagain"]').type(testPassword);
      cy.get('button[type="submit"').click();
    };

    submitForm();

    // Check that the user is redirected (assuming success)
    cy.url().should('not.include', '/reactors/create-account');
    cy.visit('/reactors/create-account?csi=cs_test_a1WLk3QvOyIJRFeV21BNIhdtXx26z5rF2x6pIzYKHq32ujVSz4W4fZ0IGI');
    // Send requests up to the rate limit
    for (let i = 0; i < 8; i++) {
      submitForm();

      cy.contains('Unexpected Error');

      // Return to the create account page for the next iteration
      cy.visit('/reactors/create-account?csi=cs_test_a1WLk3QvOyIJRFeV21BNIhdtXx26z5rF2x6pIzYKHq32ujVSz4W4fZ0IGI');
    }

    // The 11th request should trigger rate limiting
    submitForm();

    // Check that the user is still on the create account page with a rate-limiting error message
    cy.url().should('include', '/rate-limited');
    cy.contains('Too many requests.');
  });
});
