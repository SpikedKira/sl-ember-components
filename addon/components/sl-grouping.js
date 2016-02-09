import Ember from 'ember';
import layout from '../templates/components/sl-grouping';

export default Ember.Component.extend({
    layout: layout,

    groupsOf: 1,

    groupTag: 'div',

    items: Ember.A(),

    groups: Ember.computed(
        'items',
        function() {
            const items = this.get( 'items' );
            const groupsOf = this.get( 'groupsOf' );
            const groups = Ember.A();
            let currentGroup = null;

            items.forEach( function( item, index ) {
                if ( !(index % groupsOf) ) {
                    currentGroup = Ember.A();
                    groups.push( currentGroup );
                }
                currentGroup.push( item );
            });

            return groups;
        }
    )
});
