import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { options } from "../utils/dropdownOptions";
import { useCallback } from "react";
import debounce from "../utils/debounceFunc";
import { fetchResult } from "../utils/searchService";

export const useSearchQuery = () => {
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState(options[0].label);
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchText(value);
    }, 500),
    []
  );

  useEffect(() => {
    queryClient.invalidateQueries(["search", searchText, searchFilter]);
  }, [searchFilter, queryClient]);

  const {
    data: result,
    error,
    isError
  } = useQuery({
    queryKey: ["search", searchText, searchFilter],
    queryFn: () => fetchResult(searchText, searchFilter, token),
    enabled: !!searchText && !!searchFilter
  });

  return {
    searchText,
    setSearchText,
    searchFilter,
    setSearchFilter,
    result,
    error,
    isError,
    debouncedSearch
  };
};
