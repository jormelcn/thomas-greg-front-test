import { StoreService } from "./StoreService";

const storeService = new StoreService();

export function useStoreService() {
  return storeService;
}
