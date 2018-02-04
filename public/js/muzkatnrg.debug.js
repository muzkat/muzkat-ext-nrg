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

    onSelect: function (rowModel, record, index, eOpts) {
        if (rowModel.view) {
            var view = rowModel.view;
            view.up('#issueWrapper').updateIssue(record);
        }
    }
});

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
Ext.define('Mzk.Nrg.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.muzkatNrgMain',
    layout: 'fit',
    items: [{
        xtype: 'container',
        itemId: 'issueWrapper',
        viewModel: {
            data: {
                activeItem: null,
                activeContact: {
                    ansprechpartner: {
                        anrede: null,
                        email: null,
                        fax: null,
                        nachname: null,
                        telefon: null,
                        vorname: null
                    },
                    codenummer: {
                        bis: null,
                        codenummer: null,
                        codetyp: null,
                        von: null,
                        marktfunktion: null
                    },
                    firmenanschrift: {
                        ort: null,
                        plz: null,
                        unternehmen: null,
                        url: null
                    }
                }
            },
            formulas: {}
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
                xtype: 'container',
                flex: 3,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    flex: 1,
                    padding: '10 10 10 10'
                },
                items: [
                    {
                        xtype: 'container', layout: {
                            type: 'vbox',
                            align: 'stretch'
                        }, flex: 4,
                        defaults: {
                            flex: 1,
                            padding: '10 10 10 10'
                        }, items: [{
                            xtype: 'fieldset',
                            bind: {
                                title: 'Ansprechpartner - {activeContact.firmenanschrift.unternehmen}'
                            },
                            collapsible: true,
                            defaultType: 'textfield',
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            items: [{
                                fieldLabel: 'Field 1',
                                name: 'field1',
                                bind: {
                                    value: '{activeContact.ansprechpartner.email}'
                                }
                            }, {
                                fieldLabel: 'Field 2',
                                name: 'field2'
                            }]

                        }, {
                            xtype: 'fieldset',
                            bind: {
                                title: 'Code Informationen - {activeContact.codenummer.codenummer}'
                            },
                            collapsible: true,
                            defaultType: 'textfield',
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            items: [{
                                fieldLabel: 'CodeTyp',
                                bind: {
                                    value: '{activeContact.codenummer.codetyp}'
                                }
                            }, {
                                fieldLabel: 'CodeNummer',
                                bind: {
                                    value: '{activeContact.codenummer.codenummer}'
                                }
                            }]

                        }, {
                            xtype: 'fieldset',
                            title: 'Firma',
                            collapsible: true,
                            defaultType: 'textfield',
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            items: [{
                                fieldLabel: 'Field 1',
                                name: 'field1',
                                bind: {
                                    value: '{activeContact.ansprechpartner.email}'
                                }
                            }, {
                                fieldLabel: 'Field 2',
                                name: 'field2'
                            }]

                        }]
                    }, {
                        xtype: 'container', bind: {
                            html: '{activeItem}'
                        }
                    }]
            }],
        updateIssue: function (record) {
            if (Ext.isDefined(record)) {
                var recordData = record.getData();
                if (recordData['_source'] && recordData['_source']['contact']) {
                    var contactData = recordData['_source']['contact'];
                    if (contactData['code-nummern-vergabe']) {
                        contactData.codenummer = contactData['code-nummern-vergabe'];
                        delete contactData['code-nummern-vergabe'];
                        if (contactData.codenummer['code typ']) {
                            contactData.codenummer.codetyp = contactData.codenummer['code typ'];
                            delete contactData.codenummer['code typ'];
                        }
                    }

                    var me = this;
                    Ext.iterate(contactData, function (key, obj) {
                        Ext.iterate(obj, function (subkey, val) {
                            me.getViewModel().set('activeContact.' + key + '.' + subkey, val);
                        });
                    });
                    Ext.log({dump: contactData, msg: 'data..'});
                    // this.getViewModel().set('activeContact', contactData);
                }
                this.getViewModel().set('activeItem', JSON.stringify(recordData));
            }


        }
    }]
});