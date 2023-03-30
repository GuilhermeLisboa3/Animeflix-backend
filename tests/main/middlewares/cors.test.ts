import { app } from '@/main/config/app'

import request from 'supertest'

describe('cors Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/cors', (req, res) => { res.send() })

    await request(app).get('/cors').expect('Access-control-Allow-origin', '*')
  })
})
