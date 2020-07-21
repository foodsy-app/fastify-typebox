# @foodsy/fastify-typebox

Plugin for Fastify to prevent having to write duplicate type definitions for schemas.

`@foodsy/fastify-typebox` uses [typebox](https://github.com/sinclairzx81/typebox), to compose JSON schemas.

**Important!**

This plugin uses [patch-package](https://www.npmjs.com/package/patch-package) to comment existing type declarations for request methods in `node_modules/fastify/types/instance.d.ts` since TypeScript does not allow to overwrite declarations. If you notice any problems, please post a issue.

## Install

```bash
npm i @foodsy/fastify-typebox @sinclair/typebox
```

## Usage

Add it to your project using `register` and you are done!

```typescript
import fastify from "fastify";

fastify.register(require("@foodsy/fastify-typebox"));
```

## Examples

This plugin exposes a new method on the `FastifyInstance` called `typeboxSchema`

### Basic usage

**Notice**: Please refer to the [typebox repository](https://github.com/sinclairzx81/typebox) for a overview of the typebox API.

```typescript
import { Type } from "@sinclair/typebox";

// Available request methods are
// .get, .head, .post, .put, .delete, .options, .patch and .all
server.get(
  "/secret-route/:id",
  {
    schema: server.typeboxSchema({
      // You can also type querystring, headers and response
      params: Type.Object({
        id: Type.String(),
      }),
      body: Type.Object({
        user: Type.Object({
          name: Type.String(),
          age: Type.Number({ minimum: 18 }),
        }),
      }),
    }),
  },
  (request, reply) => {
    // `id` is inferred as string | undefined
    const id = request.params?.id;

    // `user` is inferred as the object we described!
    const user = request.body?.user;
  }
);
```
