import { useMemo } from "react";
import useSWR from "swr";
import { AdminSearchProductsRequestDTO } from "./customDTOs";
import { PageDTOProductForAdminDTO } from "./dtos";
import { useStoreService } from "./useStoreService";

export function useSearchProducts(req: AdminSearchProductsRequestDTO) {
  const service = useStoreService();
  const url = useMemo(() => service.searchProductsUrl(req), [req, service]);
  return useSWR(url, service.swrFetcher<PageDTOProductForAdminDTO>());
}
