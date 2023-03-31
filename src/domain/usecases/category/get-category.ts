type Output = { id: string, position: number, name: string } | undefined
export type LoadCategory = (input: { id: string }) => Promise<Output>
