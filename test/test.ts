import { Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import fastifyTypebox from "../index";

const plugin: FastifyPluginAsync = async function (fastify, opts) {
  fastify.register(fastifyTypebox)

  // longhand (opts)
  fastify.route({
    method: "GET",
    url: "/secret-route/:id",
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      querystring: Type.Object({
        optionalFilter: Type.Optional(Type.String())
      }),
      body: Type.Object({
        user: Type.Object({
          name: Type.String(),
          age: Type.Number({ minimum: 18 }),
        }),
      }),
      response: {
        200: Type.Object({
          result: Type.Boolean()
        }),
        400: Type.Object({
          error: Type.String()
        })
      }
    },
    async handler(request, reply): Promise<{ result: boolean } | { error: string }> {
      const id: string = request.params.id
      const filter: string | undefined = request.query.optionalFilter
      const user: { name: string, age: number } = request.body.user
      return {
        result: true
      }
    }
  })

  // shorthand (path, opts, handler)
  fastify.get(
    "/secret-route/:id",
    {
      schema: {
        params: Type.Object({
          id: Type.String(),
        }),
        querystring: Type.Object({
          optionalFilter: Type.Optional(Type.String())
        }),
        body: Type.Object({
          user: Type.Object({
            name: Type.String(),
            age: Type.Number({ minimum: 18 }),
          }),
        }),
        response: {
          // void (HTTP 204)
        }
      },
    },
    async (request, reply): Promise<void> => {
      const id: string = request.params.id
      const filter: string | undefined = request.query.optionalFilter
      const user: { name: string, age: number } = request.body.user
    }
  );

  // shorthand (path, handler) -- no schema!
  fastify.get(
    "/secret-route/:id",
    async (request, reply) => {
      const p: never = request.params
    }
  );

  // shorthand (path, opts+handler)
  fastify.get(
    "/secret-route/:id",
    {
      schema: {
        // You can also type querystring, headers and response
        params: Type.Object({
          id: Type.String(),
        }),
        querystring: Type.Object({
          optionalFilter: Type.Optional(Type.String())
        }),
        body: Type.Object({
          user: Type.Object({
            name: Type.String(),
            age: Type.Number({ minimum: 18 }),
          }),
        }),
        response: {
          200: Type.String()
        }
      },
      async handler(request, reply): Promise<string> {
        const id: string = request.params?.id
        const filter: string | undefined = request.query.optionalFilter
        const user: { name: string, age: number } = request.body?.user
        return ''
      }
    }
  );
};

export default plugin;
