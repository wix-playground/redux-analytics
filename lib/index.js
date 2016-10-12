"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fluxStandardAction = require('flux-standard-action');

exports["default"] = function (track) {
  var select = arguments.length <= 1 || arguments[1] === undefined ? function (_ref) {
    var meta = _ref.meta;
    return meta.analytics;
  } : arguments[1];
  return function (store) {
    return function (next) {
      return function (action) {
        var returnValue = next(action);

        if (!action || !action.meta) {
          return returnValue;
        }

        var eventOrEvents = select(action);

        var events = !Array.isArray(eventOrEvents) ? [eventOrEvents] : eventOrEvents;
        events = events.filter(function (event) {
          return Boolean(event);
        });

        if (!events.length) {
          return returnValue;
        }

        events.filter(Boolean).forEach(function (event) {
          if (!(0, _fluxStandardAction.isFSA)(event)) {
            var message = "The following event wasn't tracked because it isn't a Flux Standard Action (https://github.com/acdlite/flux-standard-action)";
            console.error(message, event);
            return;
          }

          track(event, store.getState());
        });

        return returnValue;
      };
    };
  };
};

module.exports = exports["default"];