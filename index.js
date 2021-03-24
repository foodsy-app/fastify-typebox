"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeboxSchema = void 0;
var fastify_plugin_1 = __importDefault(require("fastify-plugin"));
var createTypeboxSchema = function (typeboxSchema) { return typeboxSchema; };
exports.createTypeboxSchema = createTypeboxSchema;
var plugin = function (fastify, _options, done) {
    fastify.decorate("typeboxSchema", createTypeboxSchema);
    done();
};
exports.default = fastify_plugin_1.default(plugin, { fastify: ">=3.x", name: "@foodsy-app/fastify-typebox" });
