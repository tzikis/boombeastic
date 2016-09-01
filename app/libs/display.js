#!/bin/env node

(function() {
    'use strict';
    const rpio = require('rpio');
    const matrix = require('8x8matrix');
    const randomIntArray = require('random-int-array');

    let display = function() {
        if (!(this instanceof display)) return new display();

        this.presets = {
            "splash": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "offline": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "stop": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 1, 1, 1, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "download": [
                0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
                1, 1, 0, 1, 1, 0, 1, 1,
                0, 1, 1, 1, 1, 1, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 0, 0, 1, 1, 0, 0, 0,
            ],

            "fwd": [
                0, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 1, 1, 0,
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 1, 1, 0,
                0, 0, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 1, 0, 0, 0,
            ],

            "busy": [
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 0, 1, 1, 0, 1, 1,
                1, 1, 0, 1, 1, 0, 1, 1,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
            ],

            "sad": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1,
                1, 0, 1, 0, 0, 1, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ],

            "smile": [
                0, 0, 1, 1, 1, 1, 0, 0,
                0, 1, 0, 0, 0, 0, 1, 0,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 1, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1,
                0, 1, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 1, 0, 0,
            ]
        };

        this.randomImage = [];

    };

    display.prototype.init = function(callback) {
        let self = this;
        matrix.init(rpio);
        callback();
    };
    display.prototype.image = function(img) {
        let self = this;
        let reversedImage = img.reverse();
        matrix.writeArray(reversedImage);
    };
    display.prototype.random = function() {
        let self = this;
        self.randomImage = randomIntArray({
            count: 64,
            max: 2
        });
        self.image(self.randomImage);
    };

    module.exports = display();

})();
