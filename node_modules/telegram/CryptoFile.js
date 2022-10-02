"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_1 = require("./platform");
const crypto = require(platform_1.isNode ? "crypto" : "./crypto/crypto");
exports.default = crypto;
