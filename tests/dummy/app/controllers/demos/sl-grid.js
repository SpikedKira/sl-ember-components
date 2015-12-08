import Ember from 'ember';

export default Ember.Controller.extend({
    sortProperties: [ 'fruit' ],
    sortedModel: Ember.computed.sort( 'model', 'sortProperties' ),

    actions: {
        rowClick( row ) {
            window.console.log( 'Clicked', row );
        },

        logName( row ) {
            window.console.log( 'Record:', Ember.get( row, 'name' ) );
        },

        sortColumn( column, dir ) {
            let columnString = column[ 'valuePath' ];

            if ( dir !== 'asc' ) {
                columnString = `${columnString}:desc`;
            }

            this.set( 'sortProperties', [ columnString ] );
        }
    },

    columns: Ember.A([
        {
            size: 'small',
            title: 'Color',
            valuePath: 'name'
        },
        {
            size: 'small',
            primary: true,
            sortable: true,
            sorted: 'asc',
            title: 'Fruit',
            valuePath: 'fruit'
        },
        {
            size: 'small',
            sortable: true,
            title: 'Hex Code',
            valuePath: 'hexCode'
        }
    ]),

    rowActions: [
        {
            label: 'Log',
            action: 'sendLog'
        }
    ],

    totalCount: 6
});
