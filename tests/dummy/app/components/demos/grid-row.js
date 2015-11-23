import Ember from 'ember';
import { default as GridRow } from 'sl-ember-components/components/sl-grid-row2';
import layout from '../../templates/components/demos/sl-grid-row';

export default GridRow.extend({
    layout,

	rowActions: Ember.computed(
		function() {
			return this.get( 'rowData' );
		}
	),

	actions: {

        dropButtonSelect( record, actionName ) {
			console.log( 'called', actionName, record );
            this.triggerAction( actionName, record );
        }

	}
});
