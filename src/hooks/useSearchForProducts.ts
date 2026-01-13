import { useEffect, useState } from "react";
import UserData from "../data/userData";
import { NicheEnum } from "../enums/niche-enum";
import { PageRequest } from "../interfaces/pageable/PageRequest";
import { Product, ProductFilter } from "../interfaces/product";
import { levenshteinDistance, normalizeString } from "../utils/utils-functions";
import useAddres from "./useAddres";

export function useSearchProducts(
  initialQuery = "",
  initialFilters: ProductFilter = { proTxNome: "" },
  initialPageRequest: PageRequest = { page: 0, size: 10 }
) {
  const userData = new UserData();

  const { getCurrentLocation } = useAddres();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<ProductFilter>(initialFilters);
  const [pageRequest, setPageRequest] =
    useState<PageRequest>(initialPageRequest);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (
    query: string,
    pageRequest: PageRequest,
    filters: ProductFilter
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedFilters = { ...filters, proTxNome: query };

      const closestNiche = findClosestNiche(query);
      if (closestNiche) {
        updatedFilters.nicTxNome = closestNiche;
      }

      const response = await userData.findProducts(updatedFilters, pageRequest);

      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Erro ao buscar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getAddresss() {
      const address = await getCurrentLocation();
      return address;
    }

    async function fetchData() {
      const address = await getAddresss();
      filters.endNrId = address.endNrId;

      fetchProducts(searchQuery, pageRequest, filters);
    }

    fetchData();
  }, [searchQuery, pageRequest, filters]);

  const changePage = (newPage: number) => {
    setPageRequest((prev) => ({ ...prev, page: newPage }));
  };

  const updateFilters = (newFilters: Partial<ProductFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPageRequest({ ...pageRequest, page: 0 });
  };

  const findClosestNiche = (query: string): NicheEnum | null => {
    if (query.length === 0) return null;

    const niches = Object.values(NicheEnum);
    const normalizedQuery = normalizeString(query);

    const exactMatch = niches.find((niche) =>
      normalizeString(niche).includes(normalizedQuery)
    );
    
    if (exactMatch) {
      return exactMatch;
    }

    let closestNiche: NicheEnum | null = null;
    let minDistance = Infinity;

    niches.forEach((niche) => {
      const distance = levenshteinDistance(
        normalizedQuery,
        niche.toLowerCase()
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestNiche = niche;
      }
    });

    return minDistance <= 5 ? closestNiche : null;
  };

  return {
    searchQuery,
    setSearchQuery,
    setProducts,
    products,
    totalPages,
    loading,
    error,
    changePage,
    updateFilters,
    pageRequest,
  };
}
