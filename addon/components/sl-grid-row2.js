import Ember from 'ember';
import layout from '../templates/components/sl-grid-row2';

/**
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

    // -------------------------------------------------------------------------
    // Dependencies

    // -------------------------------------------------------------------------
    // Attributes

    /** @type {String[]} */
    classNameBindings: [
        'active:active'
    ],

    /** @type {String[]} */
    classNames: [
        'sl-grid-row'
    ],

    layout,

    /** @type {String} */
    tagName: 'tr',

    // -------------------------------------------------------------------------
    // Actions

    // -------------------------------------------------------------------------
    // Events

    /**
     * @function
     * @param {Event} event - The raw click event
     * @returns {undefined}
     */
    click( event ) {
        if ( this.$( event.target ).closest( '.sl-drop-button' ).length < 1 ) {
            console.log( 'from row: ' );
            console.log( this );
            this.sendAction( 'onClick', this );
        }
    },

    // -------------------------------------------------------------------------
    // Properties

    active: false,

    /**
     * The row record model instance
     *
     * @type {?Object}
     */
    record: null

    // -------------------------------------------------------------------------
    // Observers

    // -------------------------------------------------------------------------
    // Methods

});
