describe('Podcast episode page', () => {
  beforeEach(() => {
    cy.visit('/podcast/mechanics-of-react-a-beginners-intro-to-react')
  })

  it('loads correctly', () => {
    // Check that the page title is correct
    cy.title().should('equal', `Mechanics of React: A Beginner's Intro To React | The React Show`)

    // Check that the date is displayed
    cy.get('[data-cy=date]').should('contain', 'March 31, 2023')

    // Check that the YouTube video is embedded and playable
    cy.get('iframe[src^="https://www.youtube.com/embed/"]').should('be.visible')

    // Check that the title is correct
    cy.get('[data-cy=title]').should('contain', `[87] Mechanics of React: A Beginner's Intro To React`)

    // Check that the description is correct
    cy.get('[data-cy=description]').should('contain', 'Learn the fundamentals of React')

    // Check that the transcript is correct
    cy.get('[data-cy=transcript]').should('contain', '00:00:05 Brought to you from occupied Miwok territory by me')
  })

  it('should play the audio player when the "Listen" button is clicked', () => {
    cy.get('[data-cy=audio-player-button]').first().should('have.attr', 'aria-label', 'Play')
    cy.get('[data-cy=audio-player-button]').first().click()
    cy.get('[data-cy=audio-player-button]').first().should('have.attr', 'aria-label', 'Pause')
  })
})
