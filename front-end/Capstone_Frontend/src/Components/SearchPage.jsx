import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import DropdownButton from "./DropdownButton";
import { options } from "../utils/dropdownOptions";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import SearchResult from "./SearchResult";
import SearchInput from "./SearchInput";

const SearchPage = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const {
    searchText,
    setSearchText,
    result,
    debouncedSearch,
    searchFilter,
    setSearchFilter
  } = useSearchQuery();

  const { hashtag: hashtagParam } = useParams();

  useEffect(() => {
    setSearchText(hashtagParam);
    if (hashtagParam) setSearchFilter("Hashtags");
  }, []);

  const handleReset = () => {
    setSearchText("");
  };

  const handleSearch = (value) => {
    debouncedSearch(value);
  };

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container`}>
        <Sidebar />
        <div className="w-full h-screen overflow-y-auto">
          <div className="max-w-[65rem] w-full mx-auto py-9 px-5 space-y-10">
            <div className="flex justify-center gap-3 items-stretch">
              <SearchInput
                searchText={searchText}
                handleSearch={handleSearch}
                handleReset={handleReset}
                defaultValue={hashtagParam ?? ""}
              />
              <DropdownButton
                defaultOption={hashtagParam ? options[1] : options[0]}
                options={options}
                onSelect={(option) => {
                  setSearchFilter(option.label);
                }}
              />
            </div>
            <div
              className={searchFilter === "Profiles" ? "max-w-md mx-auto" : ""}
            >
              {searchFilter !== "Profiles" && result?.content && (
                <span
                  className={`font-bold underline decoration-2 dark:text-slate-200 opacity-50 ${
                    result?.content?.length === 0
                      ? "decoration-red-500"
                      : "decoration-indigo-500"
                  }`}
                >
                  Risultati: {result?.totalElements}
                </span>
              )}
              <SearchResult searchFilter={searchFilter} result={result} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
