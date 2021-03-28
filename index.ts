import { Static, TSchema } from "@sinclair/typebox";
import {
  ContextConfigDefault,
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyPlugin,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
  RouteHandlerMethod,
  RouteOptions,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler
} from "fastify";
import fp from "fastify-plugin";

interface Schema extends FastifySchema {
  body?: TSchema;
  querystring?: TSchema;
  params?: TSchema;
  headers?: TSchema;
  response?: Record<number, TSchema>;
}

type StaticResponse<T> = T extends Record<string | number, infer U> ? Static<U> : never;

export interface InferredRouteInterface<T extends Schema> {
  Body: Static<T["body"]>;
  Querystring: Static<T["querystring"]>;
  Params: Static<T["params"]>;
  Headers: Static<T["headers"]>;
  Reply: StaticResponse<T["response"]>;
}

interface TypeboxRouteShorthandMethod<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>
> {
  <
    T extends Schema,
    RequestGeneric extends InferredRouteInterface<T>,
    ContextConfig = ContextConfigDefault
  >(
    path: string,
    opts: RouteShorthandOptions<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig> & {
      schema?: T;
    },
    handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>
  ): FastifyInstance<RawServer, RawRequest, RawReply>;
}

interface TypeboxRouteShorthandMethod<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>
> {
  <
    RequestGeneric extends InferredRouteInterface<never>,
    ContextConfig = ContextConfigDefault
  >(
    path: string,
    handler: RouteHandlerMethod<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig>
  ): FastifyInstance<RawServer, RawRequest, RawReply>;
}

interface TypeboxRouteShorthandMethod<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>
> {
  <
    T extends Schema,
    RequestGeneric extends InferredRouteInterface<T>,
    ContextConfig = ContextConfigDefault
  >(
    path: string,
    opts: RouteShorthandOptionsWithHandler<RawServer, RawRequest, RawReply, RequestGeneric, ContextConfig> & {
      schema?: T;
    }
  ): FastifyInstance<RawServer, RawRequest, RawReply>;
}

declare module "fastify" {
  interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    Logger = FastifyLoggerInstance
  > {
    typeboxSchema: typeof createTypeboxSchema;

    route<
      T extends Schema,
      RouteGeneric extends InferredRouteInterface<T>,
      ContextConfig = ContextConfigDefault
    >(
      opts: RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig> & {
        schema?: T;
      }
    ): FastifyInstance<RawServer, RawRequest, RawReply, Logger>;

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

const createTypeboxSchema = <T extends Schema>(typeboxSchema: T) => typeboxSchema;

const plugin: FastifyPlugin = (fastify, _options, done) => {
  fastify.decorate("typeboxSchema", createTypeboxSchema);

  done();
};

export default fp(plugin, { fastify: ">=3.x", name: "@foodsy-app/fastify-typebox" });
export { createTypeboxSchema };
