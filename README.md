## bun run export

Change Context Type to any before generating declarations file

```ts
t = initTRPC.context<TRPCHonoContext>().create();
```

```ts
t = initTRPC.context<any>().create();
```