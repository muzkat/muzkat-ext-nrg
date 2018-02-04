/**
 * Created by bnz on 7/25/17.
 */
Ext.define('Mzk.Nrg.GridLine', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id'
        },
        {
            name: 'code',
            mapping: '_source.Code'
        },
        {
            name: 'codeenum',
            mapping: '_source.CodeTypeEnum'
        },
        {
            name: 'type',
            mapping: '_source.CodeType'
        },
        {
            name: 'function',
            mapping: '_source.MarketFunction'
        },
        {
            name: 'status',
            mapping: '_source.LocalizedStatus'
        },
        {
            name: 'city',
            mapping: '_source.city'
        },
        {
            name: 'company',
            mapping: '_source.companyName'
        },
        {
            name: 'zip',
            mapping: '_source.zipCode'
        }]
});
Ext.define('Mzk.Nrg.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accountGridController',

    control: {
        '*': {
            collapsebody: 'collapsebody',
            expandbody: 'expandbody'
        }
    },

    collapsebody: function (rowNode, record, expandRow, eOpts) {
        Ext.Msg.alert('Collapse', 'The Add button was clicked');
    },

    expandbody: function (rowNode, record, expandRow, eOpts) {
        Ext.Msg.alert('Expand', 'The Add button was clicked');
    },

    onSelect: function (rowModel, record, index, eOpts) {
        if (rowModel.view) {
            var view = rowModel.view;
            view.up('#issueWrapper').updateIssue(JSON.stringify(record.getData(), undefined, 4));
        }
    }
});

Ext.define('Mzk.Nrg.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountGrid',
    iconCls: 'fas fa-building',
    controller: 'accountGridController',
    listeners: {
        select: 'onSelect'
    },
    title: 'DVGW Marktpartner',
    hideHeaders: true,
    tbar: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        flex: 1,
        padding: '15 20 15 20',
        items: [{
            xtype: 'tagfield',
            fieldLabel: 'Feld',
            store: Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [
                    {"abbr": "AL", "name": "Alabama"},
                    {"abbr": "AK", "name": "Alaska"},
                    {"abbr": "AZ", "name": "Arizona"}
                ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
        }, {
            xtype: 'tagfield',
            fieldLabel: 'Feld',
            store: Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [
                    {"abbr": "AL", "name": "Alabama"},
                    {"abbr": "AK", "name": "Alaska"},
                    {"abbr": "AZ", "name": "Arizona"}
                ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
        }, {
            xtype: 'textfield',
            flex: 1,
            emptyText: 'Marktpartnersuche',
            listeners: {
                'change': function (cmp, newVal, oldVal, eOpts) {
                    var store = cmp.up('accountGrid').getStore();
                    store.getProxy().setExtraParam('q', newVal);
                    store.load();
                }
            }
        }]
    }],
    columns: [
        {
            text: 'Code',
            dataIndex: 'code',
            flex: 2,
        },
        {
            text: 'Typ',
            flex: 1,
            dataIndex: 'type',

        },
        {
            text: 'Funktion',
            flex: 1,
            dataIndex: 'function',

        }, {
            text: 'Status',
            flex: 1,
            dataIndex: 'status',

        },
        {
            text: 'Firma',
            flex: 1,
            dataIndex: 'company',

        },
        {
            text: 'Ort',
            flex: 1,
            dataIndex: 'city',

        }],

    store: Ext.create('Ext.data.BufferedStore', {
        proxy: {
            type: 'ajax',
            url: 'http://pro.bnz-power.com/gas/marketpartner',
            useDefaultHeader: false,
            reader: {
                type: 'json',
                rootProperty: 'hits.hits',
                totalProperty: 'hits.total'
            }
        },
        pageSize: 100,
        autoLoad: true,
        model: 'Mzk.Nrg.GridLine'
    })
});

Ext.define('Mzk.Nrg.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.muzkatNrgMain',
    title: 'Main Viewport View',
    header: false,
    layout: 'fit',
    items: [{
        xtype: 'container',
        title: 'BPC Issues',
        iconCls: 'fas fa-ticket-alt',
        itemId: 'issueWrapper',
        viewModel: {
            data: {
                activeItem: null
            }
        },
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'accountGrid',
                flex: 4
            },
            {
                xtype: 'box',
                flex: 3,
                bind: {
                    html: '{activeItem}'
                }
            }],
        updateIssue: function (key) {
            this.getViewModel().set('activeItem', key);
        }
    }]
});