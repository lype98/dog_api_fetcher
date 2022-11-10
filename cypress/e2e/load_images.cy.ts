/// <reference types="cypress" />
describe('Image Loading', () => {
    it("can select a dog's breed and load 1 image", () => {
        // visit site
        cy.visit('/');
        // select breed
        cy.get('#Breed').click();
        cy.findByRole('option', { name: /boxer/i }).click();
        // select number of images
        const imageNumber = 1;
        cy.findByRole('spinbutton').type(imageNumber.toString());
        // click view images
        cy.findByRole('button', { name: /view images/i }).click();
        // assertion
        cy.findByRole('list').children().should('have.length', imageNumber);
    });

    it("can select a dog's sub breed and load multiple images", () => {
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
        cy.findByRole('list').children().should('have.length', imageNumber);
    });
});
