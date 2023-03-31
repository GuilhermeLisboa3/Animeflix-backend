
type Output = { firstName: string, lastName: string, phone: string, birth: Date, email: string, password: string, role: string, createdAt?: Date, updatedAt?: Date } | undefined
export type GetAccountData = (input: { id: string }) => Promise<Output>
