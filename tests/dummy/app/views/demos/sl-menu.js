import Ember from 'ember';

export default Ember.View.extend({

    registerKeyListeners: Ember.on(
        'didInsertElement',
        function() {
            Ember.$( document ).on( 'keypress.menu', ( e ) => {
                if ( e.charCode >= 49 && e.charCode <= 57 ) {
                    const keypressed = e.charCode - 48;
                    this.get( 'controller.keyHandler' )
                        .childSelection( keypressed );
                } else if ( 45 === e.charCode ) {
                    this.get( 'controller.keyHandler' ).drillDown( '-' );
                } else if ( 48 === e.charCode ) {
                    this.get( 'controller.keyHandler' ).showAll();
                }
            });

            // keypress doesn't appear to catch ESC
            Ember.$( document ).on( 'keyup.menu', ( e ) => {
                if ( 27 === e.keyCode ) {
                    this.get( 'controller.keyHandler' ).closeAll();
                }
            });

            // need to capture TAB key with keydown event
            Ember.$( document ).on( 'keydown.menu', ( e ) => {
                if (
                    9 === e.keyCode &&
                    this.get( 'controller.keyboardInUse' )
                ) {
                    e.preventDefault();

                    if ( e.shiftKey ) {
                        this.get( 'controller.keyHandler' )
                            .cycleRootSelectionPrevious();
                    } else {
                        this.get( 'controller.keyHandler' )
                            .cycleRootSelectionNext();
                    }
                }
            });
        }
    ),

    unregisterKeyListeners: Ember.on(
        'willClearRender',
        function() {
            Ember.$( document )
                .off( 'keypress.menu' )
                .off( 'keyup.menu' )
                .off( 'keydown.menu' );
        }
    )

});
