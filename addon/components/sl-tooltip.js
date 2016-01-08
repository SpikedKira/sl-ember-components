import Ember from 'ember';
import TooltipEnabled from '../mixins/sl-tooltip-enabled';

/**
 * @module
 * @augments ember/Component
 * @augments module:mixins/sl-tooltip-enabled
 */
export default Ember.Component.extend( TooltipEnabled, {

    // -------------------------------------------------------------------------
    // Dependencies

    // -------------------------------------------------------------------------
    // Attributes

    /** @type {String} */
    tagName: 'span',

    // -------------------------------------------------------------------------
    // Actions

    // -------------------------------------------------------------------------
    // Events

    /**
     * init event hook
     *
     * @returns {undefined}
     */
    init() {
        this._super( ...arguments );
        this.initialize();
    },

    // -------------------------------------------------------------------------
    // Properties

    // -------------------------------------------------------------------------
    // Observers

    // -------------------------------------------------------------------------
    // Methods

    /**
     * Check passed parameters on initialization
     *
     * @private
     * @throws {ember/Error} Thrown if 'title' or 'popover' is invalid
     * @returns {undefined}
     */
    initialize() {
        if ( 'string' !== Ember.typeOf( this.get( 'title' ) ) ) {
            throw new Ember.Error(
                'enableTooltip() and enablePopover() expect the parameter "title" and for it to be a string'
            );
        }

        if ( 'string' !== Ember.typeOf( this.get( 'popover' ) ) &&
             'undefined' !== Ember.typeOf( this.get( 'popover' ) ) ) {
            throw new Ember.Error(
                'enablePopover() expects the parameter "popover" and for it to be a string'
            );
        }
    }

});
