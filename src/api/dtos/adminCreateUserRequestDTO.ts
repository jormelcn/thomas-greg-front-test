/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { ScopedRoleDTO } from './scopedRoleDTO';

export interface AdminCreateUserRequestDTO {
  email: string;
  /**
   * @minLength 8
   * @maxLength 15
   */
  password: string;
  roles: ScopedRoleDTO[];
}
