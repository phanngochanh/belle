/**
 * Copyright © 2017 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*jshint browser:true jquery:true*/
/*global confirm:true*/
define([
    'jquery',
    'Magento_Customer/js/model/authentication-popup',
    'Magento_Customer/js/customer-data',
    'Magento_Ui/js/modal/alert',
    'Magento_Ui/js/modal/confirm',
    'jquery/ui',
    'mage/decorate',
    'mage/collapsible',
    'mage/cookies'
], function ($, authenticationPopup, customerData, alert, confirm) {

    $.widget('mage.sidebar', {
        options: {
            isRecursive: true,
            minicart: {
                maxItemsVisible: 3
            }
        },
        scrollHeight: 0,

        /**
         * Create sidebar.
         * @private
         */
        _create: function () {
            this._initContent();
        },

        /**
         * Update sidebar block.
         */
        update: function () {
            $(this.options.targetElement).trigger('contentUpdated');
            this._calcHeight();
            this._isOverflowed();
        },

        _initContent: function () {
            var self = this,
                events = {};

            this.element.decorate('list', this.options.isRecursive);

            events['click ' + this.options.button.close] = function (event) {
                event.stopPropagation();
                $(self.options.targetElement).dropdownDialog('close');
            };
            events['click ' + this.options.button.checkout] = $.proxy(function () {
                var cart = customerData.get('cart'),
                    customer = customerData.get('customer');

                if (!customer().firstname && cart().isGuestCheckoutAllowed === false) {
                    // set URL for redirect on successful login/registration. It's postprocessed on backend.
                    $.cookie('login_redirect', this.options.url.checkout);
                    if (this.options.url.isRedirectRequired) {
                        location.href = this.options.url.loginUrl;
                    } else {
                        authenticationPopup.showModal();
                    }

                    return false;
                }
                location.href = this.options.url.checkout;
            }, this);
            events['click ' + this.options.button.remove] =  function (event) {
                event.stopPropagation();
                self._removeItem($(event.currentTarget));
            };
            events['keyup ' + this.options.item.qty] = function (event) {
                self._updateItemQty($(event.currentTarget));
            };
            events['click ' + this.options.item.button] = function (event) {
                event.stopPropagation();
                self._updateItemQty($(event.currentTarget));
            };
            events['click ' + this.options.item.increase] = function (event) {
                event.stopPropagation();
                self._increaseQty($(event.currentTarget));
                self._updateItemQty($(event.currentTarget));
            };
            events['click ' + this.options.item.reduced] = function (event) {
                event.stopPropagation();
                self._reducedQty($(event.currentTarget));
                self._updateItemQty($(event.currentTarget));
            };
            events['click ' + this.options.item.button] = function (event) {
                event.stopPropagation();
                self._updateItemQty($(event.currentTarget));
            };
            events['focusout ' + this.options.item.qty] = function (event) {
                self._validateQty($(event.currentTarget));
            };

            this._on(this.element, events);
            this._calcHeight();
            this._isOverflowed();
        },

        /**
         * Add 'overflowed' class to minicart items wrapper element
         *
         * @private
         */
        _isOverflowed: function () {
            var list = $(this.options.minicart.list),
                cssOverflowClass = 'overflowed';

            if (this.scrollHeight > list.innerHeight()) {
                list.parent().addClass(cssOverflowClass);
            } else {
                list.parent().removeClass(cssOverflowClass);
            }
        },

        _showItemButton: function (elem) {
            var itemId = elem.data('cart-item'),
                itemQty = elem.data('item-qty');
            if (this._isValidQty(itemQty, elem.val())) {
                $('#update-cart-item-' + itemId).show('fade', 300);
            } else if (elem.val() == 0) {
                this._hideItemButton(elem);
            } else {
                this._hideItemButton(elem);
            }
        },

       _increaseQty: function (elem) {
           var _item = elem.data('cart-item');
           var itemId = $('.details-qty #cart-item-'+_item+'-qty').val(),
           itemQty = elem.data('item-qty');
           $('.details-qty #cart-item-'+_item+'-qty').val( parseInt($('.details-qty #cart-item-'+_item+'-qty').val(), 10) + 1);


       },


        _reducedQty: function (elem) {
            var _item = elem.data('cart-item');
            var itemId = $('.details-qty #cart-item-'+_item+'-qty').val(),
                itemQty = elem.data('item-qty');
                $('.details-qty #cart-item-'+_item+'-qty').val( parseInt($('.details-qty #cart-item-'+_item+'-qty').val(), 10) - 1);
        },
        /**
         * @param origin - origin qty. 'data-item-qty' attribute.
         * @param changed - new qty.
         * @returns {boolean}
         * @private
         */
        _isValidQty: function (origin, changed) {
            return (origin != changed) &&
                (changed.length > 0) &&
                (changed - 0 == changed) &&
                (changed - 0 > 0);
        },

        /**
         * @param {Object} elem
         * @private
         */
        _validateQty: function (elem) {
            var itemQty = elem.data('item-qty');

            if (!this._isValidQty(itemQty, elem.val())) {
                elem.val(itemQty);
            }
        },

        _hideItemButton: function (elem) {
            var itemId = elem.data('cart-item');
            $('#update-cart-item-' + itemId).hide('fade', 300);
        },

        _updateItemQty: function (elem) {
            var itemId = elem.data('cart-item');
            this._ajax(this.options.url.update, {
                item_id: itemId,
                item_qty: $('#cart-item-' + itemId + '-qty').val()
            }, elem, this._updateItemQtyAfter);
        },

        /**
         * Update content after update qty
         *
         * @param elem
         */
        _updateItemQtyAfter: function (elem) {
            this._hideItemButton(elem);
        },

        _removeItem: function (elem) {
            var itemId = elem.data('cart-item');
            this._ajax(this.options.url.remove, {
                item_id: itemId
            }, elem, this._removeItemAfter);
        },

        /**
         * Update content after item remove
         *
         * @param elem
         * @param response
         * @private
         */
        _removeItemAfter: function (elem, response) {
        },

        /**
         * @param {String} url - ajax url
         * @param {Object} data - post data for ajax call
         * @param {Object} elem - element that initiated the event
         * @param {Function} callback - callback method to execute after AJAX success
         */
        _ajax: function (url, data, elem, callback) {
            $.extend(data, {
                'form_key': $.mage.cookies.get('form_key')
            });

            $.ajax({
                url: url,
                data: data,
                type: 'post',
                dataType: 'json',
                context: this,
                beforeSend: function () {
                    elem.attr('disabled', 'disabled');
                },
                complete: function () {
                    elem.attr('disabled', null); 
                }
            })
                .done(function (response) {
                    if (response.success) {
                        callback.call(this, elem, response);
                    } else {
                        var msg = response.error_message;

                        if (msg) {
                            alert({
                                content: $.mage.__(msg)
                            });
                        }
                    }
                })
                .fail(function (error) {
                    console.log(JSON.stringify(error));
                });
        },

        /**
         * Calculate height of minicart list
         *
         * @private
         */
        _calcHeight: function () {
            var self = this,
                height = 0,
                counter = this.options.minicart.maxItemsVisible,
                target = $(this.options.minicart.list),
                outerHeight;

            target.children().each(function () {

                if ($(this).find('.options').length > 0) {
                    $(this).collapsible();
                }
                outerHeight = $(this).outerHeight();

                if (counter-- > 0) {
                    height += outerHeight;
                }
                self.scrollHeight += outerHeight;
            });

            target.height(height);
        }
    });

    return $.mage.sidebar;
});
