import {
  jwtTokenExpirationStorageKey,
  jwtTokenStorageKey,
} from "src/config/auth";
import ApiClient from "./ApiClient/ApiClient";
import { GenericApiResponse } from "./ApiClient/GenericApiResponse";
import { SuccessSignInDTO, UserSignInRequestDTO } from "./dtos";

export class StoreService {
  private client = new ApiClient({
    baseUrl: "http://localhost:8080",
    authProvider() {
      const token = localStorage.getItem(jwtTokenStorageKey);
      const authorization = token ? `Bearer ${token}` : null;
      return authorization;
    },
  });

  isLoginActive(): boolean {
    const token = localStorage.getItem(jwtTokenStorageKey);
    const tokenExpiration = localStorage.getItem(jwtTokenExpirationStorageKey);
    if (!token || !tokenExpiration) return false;
    try {
      const expirationDateTime = new Date(tokenExpiration).getTime();
      const nowTime = new Date().getTime();
      if (expirationDateTime <= nowTime) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(jwtTokenStorageKey);
    localStorage.removeItem(jwtTokenExpirationStorageKey);
  }

  async login(
    req: UserSignInRequestDTO
  ): Promise<GenericApiResponse<SuccessSignInDTO>> {
    const result = await this.client.request<SuccessSignInDTO>({
      method: "POST",
      route: "auth/signin",
      body: req,
    });
    if (result.isSuccess) {
      localStorage.setItem(jwtTokenStorageKey, result.body.jwtToken!.value!);
      localStorage.setItem(
        jwtTokenExpirationStorageKey,
        result.body.jwtToken!.expirationDate
      );
    }
    return result;
  }
}
