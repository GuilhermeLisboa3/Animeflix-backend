import { app } from '@/main/config/app'

import request from 'supertest'

describe('BodyParser', () => {
  it('should parse body as json', async () => {
    const name = 'any_name'
    app.post('/body_parser', (req, res) => { res.send(req.body) })

    await request(app).post('/body_parser').send({ name }).expect({ name })
  })
})
