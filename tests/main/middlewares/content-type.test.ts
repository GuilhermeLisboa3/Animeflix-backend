import { app } from '@/main/config/app'

import request from 'supertest'

describe('ContentType', () => {
  it('should return default content type as json', async () => {
    app.get('/content_type', (req, res) => { res.send('') })

    await request(app).get('/content_type').expect('content-type', /json/)
  })
})
