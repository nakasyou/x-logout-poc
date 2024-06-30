import { Hono } from '@hono/hono'

const app = new Hono()

app.get('/', async (c) => {
  const res = await fetch('https://x.com/nakasyou0', {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-encoding': c.req.header('accept-encoding') ?? '',
      'accept-language': c.req.header('accept-language') ?? 'ja',
      'user-agent': c.req.header('User-Agent') ?? ''
    },
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
