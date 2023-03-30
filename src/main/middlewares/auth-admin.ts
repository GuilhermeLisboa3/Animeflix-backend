import { expressMiddlewareAdapter as adapt } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/application/middleware'

export const authAdmin = adapt(makeAuthenticationMiddleware('admin'))
