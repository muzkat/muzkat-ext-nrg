Ext.define('Mzk.Nrg.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountGrid',
    iconCls: 'x-fa fa-group',
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
        items: [
            {
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