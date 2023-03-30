import './config/module-alias'
import { connect } from '@/infra/database/postgres/helpers'
import env from '@/main/config/env'

connect().authenticate().then(async () => {
  const { app } = await import('./config/app')
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}).catch(console.error)
