﻿var Steam = require('../steam_client');

var EMsg = Steam.EMsg;
var schema = Steam.Internal;

var protoMask = 0x80000000;


// Methods

var prototype = Steam.SteamClient.prototype;

prototype.picsRequest = function (changenum, getApps, getPackages) {
    this._send(EMsg.PICSChangesSinceRequest | protoMask,
            schema.CMsgPICSChangesSinceRequest.serialize({
                sinceChangeNumber: changenum,
                sendAppInfoChanges: getApps,
                sendPackageInfoChanges: getPackages
            }));
};

// Handlers

var handlers = prototype._handlers;

handlers[EMsg.PICSChangesSinceResponse] = function (data) {
    var msg = schema.CMsgPICSChangesSinceResponse.parse(data);
    // returns the message object directly
    this.emit.apply(this, ['picsResponse', msg]);
};