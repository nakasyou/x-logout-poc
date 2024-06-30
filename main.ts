import { Hono } from '@hono/hono'

const app = new Hono()

app.get('/', async (c) => {
  const res = await fetch('https://x.com/nakasyou0', {
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'ja',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
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
