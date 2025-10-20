import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto-js';
import { createHash } from 'crypto';

@Injectable()
export class EncryptionService  {
  private readonly secretKey = 'HFJFENJKNJKENRNKNREGIONERIG-32948782394KNFRJE84FNDFNKFNKNF3832NFFDVFDGSDFG435435ERGFSDG';
  encrypt(data: any): string {
    const encryptedData = crypto.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    return encryptedData;
  }

  decrypt(data: string): any {
    const bytes = crypto.AES.decrypt(data, this.secretKey);
    const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return decryptedData;
  }
  generateUniqueKey(): string {
    const hash = createHash('sha256');
    hash.update(Math.random().toString());
    return hash.digest('hex');
  }
}