/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { TokenWithExpirationDTO } from './tokenWithExpirationDTO';
import type { OwnUserDTO } from './ownUserDTO';

export interface SuccessSignInDTO {
  jwtToken?: TokenWithExpirationDTO;
  user?: OwnUserDTO;
}
