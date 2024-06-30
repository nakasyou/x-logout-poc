import { Hono } from '@hono/hono'

const app = new Hono()

app.get('/', async (c) => {
  const res = await fetch('https://x.com/nakasyou0', {
    headers: c.req.header(),
  })
  const matched = (await res.text()).match(/https:\/\/twitter\.com\/x\/migrate\?tok=[0-9a-f]+/)
  if (!matched) {
    return c.text('Error\nエラーが発生しました。')
  }
  const url = matched[0]
  return c.redirect(url)
})

Deno.serve({
  port: 8081,
}, app.fetch)
