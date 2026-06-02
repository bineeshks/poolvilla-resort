import crypto from 'crypto';

// The key must be exactly 32 bytes (64 hex characters). 
// In production, load this from process.env.PMS_SECRETS_ENCRYPTION_KEY
const DEFAULT_KEY = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
const ENCRYPTION_KEY = process.env.PMS_SECRETS_ENCRYPTION_KEY || DEFAULT_KEY;
const IV_LENGTH = 12; // GCM standard IV length is 12 bytes

export function encryptKey(text: string): string {
  if (!text) return '';
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      'aes-256-gcm', 
      Buffer.from(ENCRYPTION_KEY, 'hex'), 
      iv
    );
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    // Format: iv:encrypted_content:auth_tag
    return `${iv.toString('hex')}:${encrypted}:${authTag}`;
  } catch (error) {
    console.error('[Encryption] Failed to encrypt key:', error);
    throw new Error('Encryption error');
  }
}

export function decryptKey(encryptedText: string): string {
  if (!encryptedText) return '';
  // Check if it's already decrypted or plain text (useful for transition or fallback)
  if (!encryptedText.includes(':')) {
    return encryptedText;
  }
  
  try {
    const [ivHex, encrypted, tagHex] = encryptedText.split(':');
    if (!ivHex || !encrypted || !tagHex) {
      throw new Error('Invalid encrypted text format');
    }
    
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      Buffer.from(ivHex, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('[Encryption] Failed to decrypt key:', error);
    throw new Error('Decryption error');
  }
}
