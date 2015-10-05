import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import sinon from 'sinon';

const testOptions = {
    chartOptions: {
        chart: {
            type: 'bar'
        },

        xAxis: {
            categories: [ 'Apples', 'Bananas', 'Oranges' ]
        },

        yAxis: {
            title: {
                text: 'Fruit Eaten'
            }
        }
    }
};

const testSeries = [
    {
        name: 'Alice',
        data: [ 1, 0, 4 ]
    }
];

moduleForComponent( 'sl-chart', 'Unit | Component | sl chart', {
    unit: true
});

test( 'updateData() is called after series property is modified', function( assert ) {
    const component = this.subject({
        options: testOptions,
        series: testSeries
    });

    this.render();

    const spy = sinon.spy( component, 'updateData' );
    const changedTestSeries = [];

    component.set( 'series', changedTestSeries );

    assert.ok(
        spy.calledOnce,
        'updateData() is called once after series modified'
    );
});

test( '"Options" property needs to be an object', function( assert ) {

    const properties = Ember.Object.create({
        series: testSeries
    });

    const callSubject = () => this.subject( properties );

    // null
    properties.set( 'options', null );

    assert.throws(
        callSubject,
        'property was null'
    );

    // Array
    properties.set( 'options', [] );

    assert.throws(
        callSubject,
        'property was an Array'
    );

    // String
    properties.set( 'options', 'test string' );

    assert.throws(
        callSubject,
        'property was a String'
    );

    // undefined
    properties.set( 'options', undefined );

    assert.throws(
        callSubject,
        'property was undefined'
    );

    // Boolean
    properties.set( 'options', false );

    assert.throws(
        callSubject,
        'property was a Boolean'
    );

    // Number
    properties.set( 'options', 132 );

    assert.throws(
        callSubject,
        'property was a Number'
    );

    // Function
    properties.set( 'options', function() {} );

    assert.throws(
        callSubject,
        'property was a Function'
    );

    // Object
    properties.set( 'options', {} );

    assert.ok(
        callSubject(),
        'property was an Object'
    );
});

test( '"Series" property needs to be an array', function( assert ) {

    const properties = Ember.Object.create({
        options: testOptions
    });

    const callSubject = () => this.subject( properties );

    // null
    properties.set( 'series', null );

    assert.throws(
        callSubject,
        'property was null'
    );

    // String
    properties.set( 'series', 'test string' );

    assert.throws(
        callSubject,
        'property was a String'
    );

    // undefined
    properties.set( 'series', undefined );

    assert.throws(
        callSubject,
        'property was undefined'
    );

    // Boolean
    properties.set( 'series', false );

    assert.throws(
        callSubject,
        'property was a Boolean'
    );

    // Number
    properties.set( 'series', 132 );

    assert.throws(
        callSubject,
        'property was a Number'
    );

    // Function
    properties.set( 'series', function() {} );

    assert.throws(
        callSubject,
        'property was a Function'
    );

    // Object
    properties.set( 'series', {} );

    assert.throws(
        callSubject,
        'property was an Object'
    );

    // Array
    properties.set( 'series', [] );

    assert.ok(
        callSubject(),
        'property was an Array'
    );
});

test( 'setupChart initializes chart and updates data upon render', function( assert ) {
    const chartTest = 'a test chart';
    const chartDivMock = {
        highcharts( options ) {
            return ( 'undefined' === Ember.typeOf( options ) ) ? chartTest : null;
        }
    };

    const component = this.subject({
        options: testOptions,
        series: testSeries,
        $: function() {
            return chartDivMock;
        },
        updateData: function() {
            return;
        }
    });

    const setupSpy = sinon.spy( component, 'setupChart' );
    const updateSpy = sinon.spy( component, 'updateData' );
    const highchartsSpy = sinon.spy( chartDivMock, 'highcharts' );

    assert.strictEqual(
        component.get( 'chart' ),
        null,
        'Chart is null upon initilization'
    );

    this.render();

    assert.ok(
        setupSpy.calledOnce,
        'setupChart was called once upon render'
    );

    assert.ok(
        updateSpy.calledOnce,
        'updateData was called once upon render'
    );

    assert.ok(
        highchartsSpy.calledTwice,
        'highcharts was called twice upon render'
    );

    assert.ok(
        highchartsSpy.calledWithExactly( component.get( 'highchartsOptions' ) ),
        'highcharts was called once with options'
    );

    assert.ok(
        highchartsSpy.calledWithExactly(),
        'highcharts was called once with no parameters'
    );

    assert.strictEqual(
        component.get( 'chart' ),
        chartTest,
        'chart is initialized'
    );
});

test( 'highchartsOptions returns expected options', function( assert ) {
    const component = this.subject({
        options: testOptions,
        series: testSeries
    });
    const chartStyle = {
        fontFamily: '"Benton Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '13px'
    };
    const options = Ember.$.extend( true, {
        chart: {
            animation: false,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            style: chartStyle
        },
        title: null,
        colors: [
            '#298fce',
            '#94302e',
            '#00a14b',
            '#f29c1e',
            '#fadb00',
            '#34495d'
        ],
        credits: {
            enabled: false
        },
        legend: {
            itemStyle: chartStyle
        },
        plotOptions: {
            bar: {
                borderColor: 'transparent'
            },
            series: {
                animation: false
            }
        },
        tooltip: {
            animation: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderWidth: 0,
            shadow: false,
            style: {
                color: '#fff'
            }
        },
        xAxis: {
            labels: {
                style: chartStyle
            }
        },
        yAxis: {
            labels: {
                style: chartStyle
            }
        }
    }, component.get( 'options' ) || {} );

    assert.deepEqual(
        options,
        component.get( 'highchartsOptions' ),
        'highchartsOptions returns expected options'
    );
});

test( 'title property is not missing in highchartsOptions and set to null', function( assert ) {
    const component = this.subject({
        options: testOptions,
        series: testSeries
    });

    assert.strictEqual(
        component.get( 'highchartsOptions' ).title,
        null,
        'title property in highchartsOptions is set to null in order to supress default behavior for our usage'
    );
});

test( 'Dependent keys are correct', function( assert ) {
    const component = this.subject({
        options: testOptions,
        series: testSeries
    });

    const styleDependentKeys = [
        'height',
        'width'
    ];

    assert.deepEqual(
        component.style._dependentKeys,
        styleDependentKeys,
        'Dependent keys are correct for style()'
    );
});

