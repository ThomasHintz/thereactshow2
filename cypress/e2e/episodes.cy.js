describe('Episodes component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it.only('should render the component with episodes data', () => {
    cy.get('[data-cy=episode-entry]').should('have.length', 15)

    cy.get('[data-cy=episode-title]').first().should('contain', `[87] Mechanics of React: A Beginner's Intro To React`)
    cy.get('[data-cy=episode-description]').first().should('contain', 'Learn the fundamentals of React by')
    cy.get('[data-cy=episode-date]').first().should('contain', 'March 31, 2023')

    cy.get('[data-cy=episode-title]').last().should('contain', '[73] A Fundamentally New React: My Journey with React Server Components')
    cy.get('[data-cy=episode-description]').last().should('contain', 'React Sever Components are')
  })

  it('should navigate to the show notes page when the "Show notes" link is clicked', () => {
    cy.get('[data-cy=show-notes-link]').first().click()
    cy.url().should('include', '/podcast/mechanics-of-react-a-beginners-intro-to-react')
  })

  it('should navigate to the transcript section when the "Transcript" link is clicked', () => {
    cy.get('[data-cy=transcript-link]').last().click()
    cy.url().should('include', '/podcast/a-fundamentally-new-react-my-journey-with-react-server-components#transcript')
  })
})
