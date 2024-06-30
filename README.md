## npm run export

Change Context Type to any before generating definitions

```ts
t = initTRPC.context<TRPCHonoContext>().create();
```

```ts
t = initTRPC.context<any>().create();
```