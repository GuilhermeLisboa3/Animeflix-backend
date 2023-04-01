import { Validator } from '@/application/validation/validator'
import { InvalidMimeTypeError } from '@/application/errors'

export type Extension = 'png' | 'jpg' | 'mp4'

export class AllowedMimeTypeValidation implements Validator {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimeType: string
  ) {}

  validate (): Error | undefined {
    if (!this.isPng() && !this.isJpg() && !this.isMp4()) return new InvalidMimeTypeError(this.allowed)
  }

  private isPng (): boolean {
    return this.allowed.includes('png') && this.mimeType === 'image/png'
  }

  private isJpg (): boolean {
    return this.allowed.includes('jpg') && /image\/jpe?g/.test(this.mimeType)
  }

  private isMp4 (): boolean {
    return this.allowed.includes('mp4') && this.mimeType === 'video/mp4'
  }
}
