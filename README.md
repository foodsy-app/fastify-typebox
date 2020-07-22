# @foodsy-app/fastify-typebox

Plugin for Fastify to prevent having to write duplicate type definitions for schemas.

`@foodsy-app/fastify-typebox` uses [typebox](https://github.com/sinclairzx81/typebox), to compose JSON schemas.

## Important note before using this plugin!

This plugin requires [patch-package](https://www.npmjs.com/package/patch-package) to comment existing type declarations for request methods in `node_modules/fastify/types/instance.d.ts` since TypeScript does not allow to overwrite declarations.

Create a `fastify+3.1.1.patch` file (edit the version based on the Fastify version you have installed) and paste the block below inside:

```diff
diff --git a/node_modules/fastify/types/instance.d.ts b/node_modules/fastify/types/instance.d.ts
index 06380bd..558338d 100644
--- a/node_modules/fastify/types/instance.d.ts
+++ b/node_modules/fastify/types/instance.d.ts
@@ -66,14 +66,14 @@ export interface FastifyInstance<
     ContextConfig = ContextConfigDefault
   >(opts: RouteOptions<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig>): FastifyInstance<RawServer, RawRequest, RawReply, Logger>;

-  get: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
-  head: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
-  post: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
-  put: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
-  delete: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
-  options: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
-  patch: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
-  all: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // get: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // head: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // post: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // put: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // delete: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // options: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // patch: RouteShorthandMethod<RawServer, RawRequest, RawReply>;
+  // all: RouteShorthandMethod<RawServer, RawRequest, RawReply>;

   // addHook: overloads


```

After this, run the following command:

```bash
npx patch-package --patch-dir .
```

Run the same command using the `--reverse` flag if you notice any problems.

## Tip

Add the patch file to your source control and add the script below to the scripts section in your `package.json` so that people who install your project do not have to manually apply the patch:

```json
"scripts": {
  "postinstall": "npx patch-package --patch-dir ."
}
```

## Install

```bash
npm i @foodsy-app/fastify-typebox @sinclair/typebox
# Or if you are using Yarn
yarn add @foodsy-app/fastify-typebox @sinclair/typebox
```

## Usage

Add it to your project using `register` and you are done!

```typescript
import fastify from "fastify";

fastify.register(require("@foodsy-app/fastify-typebox"));
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
