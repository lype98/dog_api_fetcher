describe('Image Loading', () => {
    it("that user can select a dog's sub breed and load multiple images", () => {
        // visit site
        cy.visit('/');
        // select breed
        cy.get('#Breed').click();
        cy.findByRole('option', { name: /bulldog/i }).click();
        // select sub breed
        cy.get('#SubBreed').click();
        cy.findByRole('option', { name: /french/i }).click();
        // select number of images
        const imageNumber = 2;
        cy.findByRole('spinbutton').type(imageNumber.toString());
        // click view images
        cy.findByRole('button', { name: /view images/i }).click();
        // assertion
        cy.findByRole('list').children().should('have.length', 2);
    });
});
