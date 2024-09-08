import { createPagesFunctionHandler } from '@cloudflare/next-on-pages'

const handler = createPagesFunctionHandler({
  bypassToken: process.env.BYPASS_TOKEN,
})

export function onRequest(context) {
  return handler(context)
}