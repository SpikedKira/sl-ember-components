import Ember from 'ember';
import ComponentInputId from '../mixins/sl-component-input-id';
import Namespace from '../mixins/sl-namespace';
import layout from '../templates/components/sl-date-range-picker';

/**
 * @module
 * @augments ember/Component
 * @augments module:mixins/sl-component-input-id
 * @augments module:mixins/sl-namespace
 */
export default Ember.Component.extend( ComponentInputId, Namespace, {

    // -------------------------------------------------------------------------
    // Dependencies

    // -------------------------------------------------------------------------
    // Attributes

    /** @type {String[]} */
    classNames: [
        'sl-date-range-picker'
    ],

    /** @type {Object} */
    layout,

    // -------------------------------------------------------------------------
    // Actions

    // -------------------------------------------------------------------------
    // Events

    init() {
        this._super( ...arguments );

        // wish this didn't need to be here.... it's copied from calendar
        // currently this needs to exist here as well
        const selectConstraint = this.get( 'selectConstraint' );

        for ( let i in selectConstraint ) {
            selectConstraint[ i ] = window.moment( selectConstraint[i] );
            if ( !selectConstraint[ i ].isValid ) {
                // throw an error or warning here
            }
        }
        this.set( 'selectConstraint', selectConstraint );
    },

    /**
     * didInsertElement event hook
     *
     * @returns {undefined}
     */
   /* didInsertElement() {
        this._super( ...arguments );
        //this.setupFocusTransition();
    },*/

    /**
     * willClearRender event hook
     *
     * @returns {undefined}
     */
    /*willClearRender() {
        this._super( ...arguments );
        //this.unregisterEvents();
    },*/

    // -------------------------------------------------------------------------
    // Properties

    /**
     * The value for the endDate input
     *
     * @type {?String}
     */
    endDateValue: null,

    /**
     * The string format for date values
     *
     * @type {String}
     */
    format: null,

    /**
     * The last valid date for the date range
     *
     * @type {?Date|String}
     */
    //maxDate: null,

    /**
     * The earliest date selectable in the range
     *
     * @type {?Date|String}
     */
    //minDate: null,

    /**
     * The value for the startDate input
     *
     * @type {?String}
     */
    startDateValue: null,

    startDate: null,

    endDate: null,

    selectConstraint: {
        start: null,
        end: null
    },

    locale: 'en',

    // -------------------------------------------------------------------------
    // Observers

    // -------------------------------------------------------------------------
    // Methods

    endSelectConstraint: Ember.computed(
        'endDate',
        'selectConstraint',
        function() {
            const endDate = this.get( 'endDate' );
            const selectConstraint = this.get( 'selectConstraint' );

            return {
                start: selectConstraint.start,
                end: endDate ? endDate : selectConstraint.end
            };
        }
    ),

    startSelectConstraint: Ember.computed(
        'startDate',
        'selectConstraint',
        function() {
            const startDate = this.get( 'startDate' );
            const selectConstraint = this.get( 'selectConstraint' );

            return {
                start: startDate ? startDate : selectConstraint.start,
                end: selectConstraint.end
            };
        }
    ),

    /**
     * The earliest selectable endDate, based on minDate and
     * current startDateValue
     *
     * @function
     * @returns {?Date|String} Defaults to null
     */
    earliestEndDate: Ember.computed(
        'minDate',
        'startDateValue',
        function() {
            /*const minDate = this.get( 'minDate' );
            const startDateValue = this.get( 'startDateValue' );

            if ( startDateValue ) {
                return startDateValue;
            }

            if ( minDate ) {
                return minDate;
            }

            return null;*/
        }
    ),

    /**
     * The latest selectable startDate, based on maxDate and
     * current endDateValue
     *
     * @function
     * @returns {Date|String} Defaults to null
     */
    latestStartDate: Ember.computed(
        'endDateValue',
        'maxDate',
        function() {
            /*const endDateValue = this.get( 'endDateValue' );
            const maxDate = this.get( 'maxDate' );

            if ( endDateValue ) {
                return endDateValue;
            }

            if ( maxDate ) {
                return maxDate;
            }

            return null;*/
        }
    ),

    /**
     * Set up a transition that moves focus to the endDate input when the
     * startDate input is changed
     *
     * @private
     * @returns {undefined}
     */
    setupFocusTransition() {
        /*this.set( 'startDateInput', this.$( '.sl-daterange-start-date input' ) );
        this.set( 'endDateInput', this.$( '.sl-daterange-end-date input' ) );
        this.get( 'startDateInput' ).on( this.namespaceEvent( 'changeDate' ), () => {
            this.get( 'endDateInput' ).trigger( 'focus' );
        });*/
    },

    /**
     * Remove events
     *
     * @private
     * @returns {undefined}
     */
    unregisterEvents() {
        //this.get( 'startDateInput' ).off( this.namespaceEvent( 'changeDate' ) );
    }

});
