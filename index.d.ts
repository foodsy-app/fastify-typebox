/// <reference types="node" />
import { Static, TSchema } from "@sinclair/typebox";
import { ContextConfigDefault, FastifyInstance, FastifyLoggerInstance, FastifySchema, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerBase, RawServerDefault, RouteHandlerMethod, RouteShorthandOptions } from "fastify";
interface Schema extends FastifySchema {
    body?: TSchema;
    querystring?: TSchema;
    params?: TSchema;
    headers?: TSchema;
    response?: {
        [code: string]: TSchema;
        [code: number]: TSchema;
    };
}
interface TypeboxRouteShorthandMethod<RawServer extends RawServerBase = RawServerDefault, RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>, RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>> {
    <T extends Schema, RequestGeneric extends {
        Body?: Static<T["body"]>;
        Querystring?: Static<T["querystring"]>;
        Params?: Static<T["params"]>;
        Headers?: Static<T["headers"]>;
    }, ContextConfig = ContextConfigDefault>(path: string, opts: Omit<RouteShorthandOptions<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>, "schema"> & {
        schema?: Partial<T>;
    }, handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>): FastifyInstance<RawServer, RawRequest, RawReply>;
}
interface TypeboxRouteShorthandMethod<RawServer extends RawServerBase = RawServerDefault, RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>, RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>> {
    <T extends Schema, RequestGeneric extends {
        Body?: Static<T["body"]>;
        Querystring?: Static<T["querystring"]>;
        Params?: Static<T["params"]>;
        Headers?: Static<T["headers"]>;
    }, ContextConfig = ContextConfigDefault>(path: string, handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>): FastifyInstance<RawServer, RawRequest, RawReply>;
}
interface TypeboxRouteShorthandMethod<RawServer extends RawServerBase = RawServerDefault, RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>, RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>> {
    <T extends Schema, RequestGeneric extends {
        Body?: Static<T["body"]>;
        Querystring?: Static<T["querystring"]>;
        Params?: Static<T["params"]>;
        Headers?: Static<T["headers"]>;
    }, ContextConfig = ContextConfigDefault>(path: string, opts: Omit<RouteShorthandOptions<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>, "schema"> & {
        schema?: Partial<T>;
    }): FastifyInstance<RawServer, RawRequest, RawReply>;
}
declare module "fastify" {
    interface FastifyInstance<RawServer extends RawServerBase = RawServerDefault, RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>, RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>, Logger = FastifyLoggerInstance> {
        typeboxSchema: typeof createTypeboxSchema;
        get: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
        head: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
        post: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
        put: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
        delete: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
        options: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
        patch: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
        all: TypeboxRouteShorthandMethod<RawServer, RawRequest, RawReply>;
    }
}
declare const createTypeboxSchema: <T extends Schema>(typeboxSchema: T) => T;
declare const _default: import("fastify").FastifyPluginCallback<{}, import("http").Server>;
export default _default;
