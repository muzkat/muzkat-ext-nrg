(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * ExtJS Prototype kit by muzkat
 *
 * @param name
 * @param mainComponent
 * @param loginNeeded
 * @returns {{appDescriptor: {name: *, mainComponent: *, loginNeeded: *}, app: undefined, launchApp: launchApp, defineBaseClass: defineBaseClass, start: start}}
 */
function muzkatApp(name, mainComponent, loginNeeded, file) {

    var appName = name;
    var appMainComponent = mainComponent;
    var appLoginNeeded = loginNeeded;

    return {
        app: undefined,
        appName: appName,
        appMainComponent: appMainComponent,
        appLoginNeeded: appLoginNeeded,
        /**
         *
         * @param descriptor
         */
        launchApp: function () {
            this.defineBaseClass();
            this.start();
        },
        /**
         *
         * @param name
         * @param mainComponent
         * @param loginNeeded
         */
        defineBaseClass: function () {
            var me = this;
            Ext.define(me.appName + '.MainApplication', {
                extend: 'Ext.container.Container',
                alias: 'widget.' + me.appName + 'Main',
                layout: 'fit',

                requestLogin: me.appLoginNeeded,
                mainComponent: me.appMainComponent,
                appName: me.appName,

                fileArray: [],

                initComponent: function () {
                    var items = [];
                    if (this.requestLogin) {
                        items = [{
                            xtype: 'container',
                            html: 'login required...'
                        }]
                    } else {
                        if (this.mainComponent !== false) {
                            items = [{xtype: this.mainComponent}]
                        } else {
                            this.fileArray.push(file.url);
                            items = [{
                                xtype: 'button',
                                layout: 'fit',
                                text: 'Muzkat Frame was loaded without module OR supplied with a module url.',
                                handler: function (btn) {
                                    var mv = btn.up(appName + 'Main');
                                    mv.changeComponent();
                                }
                            }];
                        }
                    }
                    this.items = items;
                    this.callParent(arguments);
                },

                changeComponent: function () {
                    var me = this;
                    this.loadScripts(this.fileArray).then(function (success) {
                        Ext.defer(function () {
                            me.removeAll();
                            me.add({xtype: file.cmp});
                        }, 300);
                    });
                },

                loadScripts: function (jsCssArray) {
                    var loadingArray = [], me = this;
                    return new Ext.Promise(function (resolve, reject) {
                        Ext.Array.each(jsCssArray, function (url) {
                            loadingArray.push(me.loadScript(url));
                        });

                        Ext.Promise.all(loadingArray).then(function (success) {
                                console.log('artefacts were loaded successfully');
                                resolve('');
                            },
                            function (error) {
                                reject('Error during artefact loading...');
                            });
                    });
                },

                loadScript: function (url) {
                    return new Ext.Promise(function (resolve, reject) {
                        Ext.Loader.loadScript({
                            url: url,
                            onLoad: function () {
                                console.log(url + ' was loaded successfully');
                                resolve('Loading was successful');
                            },
                            onError: function (error) {
                                reject('Loading was not successful for: ' + url);
                            }
                        });
                    });
                }
            });
        },
        /**
         *
         */
        start: function () {
            var me = this;
            this.app = Ext.application({
                name: me.appName,
                muzkatAppRef: this,
                mainView: me.appName + '.MainApplication',
                launch: function () {
                    Ext.log(me.appName + ' booted!');
                }
            });
        }
    };
}

module.exports = muzkatApp;
},{}],2:[function(require,module,exports){
var muzkatApp = require('muzkat-ext-app');
var pt = new muzkatApp('Muzkat NRG', 'muzkatNrgMain', false);
pt.launchApp();
},{"muzkat-ext-app":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbXV6a2F0LWV4dC1hcHAvYXBwLmpzIiwic3JjL3dyYXBwZXIvd3JhcHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEV4dEpTIFByb3RvdHlwZSBraXQgYnkgbXV6a2F0XG4gKlxuICogQHBhcmFtIG5hbWVcbiAqIEBwYXJhbSBtYWluQ29tcG9uZW50XG4gKiBAcGFyYW0gbG9naW5OZWVkZWRcbiAqIEByZXR1cm5zIHt7YXBwRGVzY3JpcHRvcjoge25hbWU6ICosIG1haW5Db21wb25lbnQ6ICosIGxvZ2luTmVlZGVkOiAqfSwgYXBwOiB1bmRlZmluZWQsIGxhdW5jaEFwcDogbGF1bmNoQXBwLCBkZWZpbmVCYXNlQ2xhc3M6IGRlZmluZUJhc2VDbGFzcywgc3RhcnQ6IHN0YXJ0fX1cbiAqL1xuZnVuY3Rpb24gbXV6a2F0QXBwKG5hbWUsIG1haW5Db21wb25lbnQsIGxvZ2luTmVlZGVkLCBmaWxlKSB7XG5cbiAgICB2YXIgYXBwTmFtZSA9IG5hbWU7XG4gICAgdmFyIGFwcE1haW5Db21wb25lbnQgPSBtYWluQ29tcG9uZW50O1xuICAgIHZhciBhcHBMb2dpbk5lZWRlZCA9IGxvZ2luTmVlZGVkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXBwOiB1bmRlZmluZWQsXG4gICAgICAgIGFwcE5hbWU6IGFwcE5hbWUsXG4gICAgICAgIGFwcE1haW5Db21wb25lbnQ6IGFwcE1haW5Db21wb25lbnQsXG4gICAgICAgIGFwcExvZ2luTmVlZGVkOiBhcHBMb2dpbk5lZWRlZCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBkZXNjcmlwdG9yXG4gICAgICAgICAqL1xuICAgICAgICBsYXVuY2hBcHA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lQmFzZUNsYXNzKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gbWFpbkNvbXBvbmVudFxuICAgICAgICAgKiBAcGFyYW0gbG9naW5OZWVkZWRcbiAgICAgICAgICovXG4gICAgICAgIGRlZmluZUJhc2VDbGFzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgICAgIEV4dC5kZWZpbmUobWUuYXBwTmFtZSArICcuTWFpbkFwcGxpY2F0aW9uJywge1xuICAgICAgICAgICAgICAgIGV4dGVuZDogJ0V4dC5jb250YWluZXIuQ29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICBhbGlhczogJ3dpZGdldC4nICsgbWUuYXBwTmFtZSArICdNYWluJyxcbiAgICAgICAgICAgICAgICBsYXlvdXQ6ICdmaXQnLFxuXG4gICAgICAgICAgICAgICAgcmVxdWVzdExvZ2luOiBtZS5hcHBMb2dpbk5lZWRlZCxcbiAgICAgICAgICAgICAgICBtYWluQ29tcG9uZW50OiBtZS5hcHBNYWluQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGFwcE5hbWU6IG1lLmFwcE5hbWUsXG5cbiAgICAgICAgICAgICAgICBmaWxlQXJyYXk6IFtdLFxuXG4gICAgICAgICAgICAgICAgaW5pdENvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdExvZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeHR5cGU6ICdjb250YWluZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6ICdsb2dpbiByZXF1aXJlZC4uLidcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYWluQ29tcG9uZW50ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zID0gW3t4dHlwZTogdGhpcy5tYWluQ29tcG9uZW50fV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlQXJyYXkucHVzaChmaWxlLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4dHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dDogJ2ZpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdNdXprYXQgRnJhbWUgd2FzIGxvYWRlZCB3aXRob3V0IG1vZHVsZSBPUiBzdXBwbGllZCB3aXRoIGEgbW9kdWxlIHVybC4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoYnRuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXYgPSBidG4udXAoYXBwTmFtZSArICdNYWluJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdi5jaGFuZ2VDb21wb25lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsUGFyZW50KGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGNoYW5nZUNvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTY3JpcHRzKHRoaXMuZmlsZUFycmF5KS50aGVuKGZ1bmN0aW9uIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBFeHQuZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLmFkZCh7eHR5cGU6IGZpbGUuY21wfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgbG9hZFNjcmlwdHM6IGZ1bmN0aW9uIChqc0Nzc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2FkaW5nQXJyYXkgPSBbXSwgbWUgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEV4dC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEV4dC5BcnJheS5lYWNoKGpzQ3NzQXJyYXksIGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nQXJyYXkucHVzaChtZS5sb2FkU2NyaXB0KHVybCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIEV4dC5Qcm9taXNlLmFsbChsb2FkaW5nQXJyYXkpLnRoZW4oZnVuY3Rpb24gKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2FydGVmYWN0cyB3ZXJlIGxvYWRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdFcnJvciBkdXJpbmcgYXJ0ZWZhY3QgbG9hZGluZy4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgbG9hZFNjcmlwdDogZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEV4dC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEV4dC5Mb2FkZXIubG9hZFNjcmlwdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVybCArICcgd2FzIGxvYWRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnTG9hZGluZyB3YXMgc3VjY2Vzc2Z1bCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnTG9hZGluZyB3YXMgbm90IHN1Y2Nlc3NmdWwgZm9yOiAnICsgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmFwcCA9IEV4dC5hcHBsaWNhdGlvbih7XG4gICAgICAgICAgICAgICAgbmFtZTogbWUuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICBtdXprYXRBcHBSZWY6IHRoaXMsXG4gICAgICAgICAgICAgICAgbWFpblZpZXc6IG1lLmFwcE5hbWUgKyAnLk1haW5BcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgbGF1bmNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIEV4dC5sb2cobWUuYXBwTmFtZSArICcgYm9vdGVkIScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtdXprYXRBcHA7IiwidmFyIG11emthdEFwcCA9IHJlcXVpcmUoJ211emthdC1leHQtYXBwJyk7XG52YXIgcHQgPSBuZXcgbXV6a2F0QXBwKCdNdXprYXQgTlJHJywgJ211emthdE5yZ01haW4nLCBmYWxzZSk7XG5wdC5sYXVuY2hBcHAoKTsiXX0=
