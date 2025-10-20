import { SetMetadata } from '@nestjs/common';

export const PublicApiKey = () => SetMetadata('isPublicApiKey', true);