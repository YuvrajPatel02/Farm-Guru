import React, { useEffect, useState, useRef } from "react";

interface MandiPrice {
  commodity: string;
  variety: string;
  grade: string;
  market: string;
  district: string;
  state: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

interface MandiLiveProps {
  apiKey?: string;
  refreshInterval?: number;
}

const translations = {
  en: {
    title: "📊 Live Mandi Prices",
    searchPlaceholder: "Search crops, markets...",
    fetching: "Fetching...",
    error: "Error",
    itemsInfo: (shown: number, total: number) => `${shown} of ${total} items`,
    filters: {
      state: "State",
      district: "District",
      market: "Market",
      commodity: "Commodity",
      variety: "Variety",
      grade: "Grade",
      filterPlaceholder: (field: string) => `Filter by ${field.toLowerCase()}`,
    },
    pagination: {
      show: "Show",
      records: "records",
      previous: "Previous",
      next: "Next",
      pageInfo: (current: number, total: number) => `Page ${current} of ${total}`,
    },
    noData: "No price data available. Try adjusting your filters.",
    failedLoad: "Failed to load prices:",
    tableHeaders: {
      commodity: "Commodity",
      variety: "Variety",
      grade: "Grade",
      price: "Price (₹/quintal)",
      market: "Market",
      district: "District",
      state: "State",
      arrivalDate: "Arrival Date",
    },
    dataSource: "Data sourced from Government of India",
    sortAsc: "ascending",
    sortDesc: "descending",
  },
  ml: {
    title: "📊 ലൈവ് മണ്ടി വിലകൾ",
    searchPlaceholder: "പച്ചക്കറികൾ, മാർക്കറ്റുകൾ തിരയുക...",
    fetching: "ഡാറ്റ എടുക്കുന്നു...",
    error: "പിശക്",
    itemsInfo: (shown: number, total: number) => `${total} ലെ ${shown} ഇനം`,
    filters: {
      state: "സംസ്ഥാനം",
      district: "ജില്ല",
      market: "മാർക്കറ്റ്",
      commodity: "വസ്തു",
      variety: "വിവിധതരം",
      grade: "ഗ്രേഡ്",
      filterPlaceholder: (field: string) => `${field} പ്രകാരം ഫിൽട്ടർ ചെയ്യുക`,
    },
    pagination: {
      show: "കാണിക്കുക",
      records: "റെക്കോർഡുകൾ",
      previous: "മുമ്പത്തെ",
      next: "അടുത്തത്",
      pageInfo: (current: number, total: number) => `പേജ് ${current} / ${total}`,
    },
    noData: "വില ഡാറ്റ ലഭ്യമല്ല. ദയവായി ഫിൽട്ടറുകൾ മാറ്റി നോക്കുക.",
    failedLoad: "വിലകൾ ലോഡ് ചെയ്യാൻ പരാജയപ്പെട്ടു:",
    tableHeaders: {
      commodity: "വസ്തു",
      variety: "വിവിധതരം",
      grade: "ഗ്രേഡ്",
      price: "വില (₹/ക്വിന്റൽ)",
      market: "മാർക്കറ്റ്",
      district: "ജില്ല",
      state: "സംസ്ഥാനം",
      arrivalDate: "വരവിന്റെ തീയതി",
    },
    dataSource: "ഡാറ്റ ഇന്ത്യ സർക്കാർ നൽകുന്നു",
    sortAsc: "ഏറുന്ന ക്രമത്തിൽ",
    sortDesc: "കുറയുന്ന ക്രമത്തിൽ",
  },
};

export default function MandiLive({
  apiKey = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b",
  refreshInterval = 5 * 60 * 1000,
}: MandiLiveProps) {
  const [lang, setLang] = useState<"en" | "ml">("en");
  const t = translations[lang];

  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    market: "",
    commodity: "",
    variety: "",
    grade: "",
  });
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Sorting function
  const sortedPrices = React.useMemo(() => {
    let sortableItems = [...prices];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key.includes("price")) {
          const aPrice = parseInt(a[sortConfig.key as keyof MandiPrice] as string || "0");
          const bPrice = parseInt(b[sortConfig.key as keyof MandiPrice] as string || "0");

          if (aPrice < bPrice) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aPrice > bPrice) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        } else {
          const aValue = (a[sortConfig.key as keyof MandiPrice] as string || "").toLowerCase();
          const bValue = (b[sortConfig.key as keyof MandiPrice] as string || "").toLowerCase();

          if (aValue < bValue) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableItems;
  }, [prices, sortConfig]);

  // Filter by search term
  const filteredPrices = sortedPrices.filter(
    (item) =>
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        "api-key": apiKey,
        format: "json",
        limit: limit.toString(),
        offset: offset.toString(),
      });

      if (filters.state) params.append("filters[state.keyword]", filters.state);
      if (filters.district) params.append("filters[district]", filters.district);
      if (filters.market) params.append("filters[market]", filters.market);
      if (filters.commodity) params.append("filters[commodity]", filters.commodity);
      if (filters.variety) params.append("filters[variety]", filters.variety);
      if (filters.grade) params.append("filters[grade]", filters.grade);

      const res = await fetch(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params}`
      );
      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }
      const data = await res.json();

      const records = data.records || [];
      setTotalRecords(data.total || records.length);

      if (mountedRef.current) {
        setPrices(records);
        setLoading(false);
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("Error fetching mandi prices:", err);
        setError(err instanceof Error ? err.message : "Failed to load prices");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    fetchPrices();
    timerId = setInterval(fetchPrices, refreshInterval);

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [apiKey, refreshInterval, limit, offset, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOffset(0);
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handleNextPage = () => {
    if (offset + limit < totalRecords) {
      setOffset(offset + limit);
    }
  };

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalRecords / limit);

  return (
    <div className="max-w-7xl mx-auto p-4">
        
      {/* Language Switcher */}
      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded ${
            lang === "en" ? "bg-green-700 text-white" : "bg-white text-green-700"
          }`}
          aria-pressed={lang === "en"}
        >
          English
        </button>
        <button
          onClick={() => setLang("ml")}
          className={`px-3 py-1 rounded ${
            lang === "ml" ? "bg-green-700 text-white" : "bg-white text-green-700"
          }`}
          aria-pressed={lang === "ml"}
        >
          മലയാളം
        </button>
      </div>

      <div className="p-6 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4 md:mb-0">{t.title}</h2>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label={t.searchPlaceholder}
              />
              <span className="absolute left-3 top-2.5 text-gray-400" aria-hidden="true">
                🔍
              </span>
            </div>

            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg" aria-live="polite">
              {loading
                ? t.fetching
                : error
                ? t.error
                : t.itemsInfo(filteredPrices.length, totalRecords)}
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {(Object.keys(filters) as (keyof typeof filters)[]).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`filter-${key}`}>
                {t.filters[key]}
              </label>
              <input
                id={`filter-${key}`}
                type="text"
                className="w-full p-2 border rounded-md"
                value={filters[key]}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                placeholder={t.filters.filterPlaceholder(t.filters[key])}
                aria-label={`${t.filters[key]} filter`}
              />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="limit-select" className="text-sm text-gray-600">
              {t.pagination.show}
            </label>
            <select
              id="limit-select"
              className="border rounded-md p-1"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              aria-label="Select number of records per page"
            >
              {[10, 25, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">{t.pagination.records}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={offset === 0}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              aria-disabled={offset === 0}
              aria-label={t.pagination.previous}
            >
              {t.pagination.previous}
            </button>
            <span className="text-sm" aria-live="polite">
              {t.pagination.pageInfo(currentPage, totalPages)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={offset + limit >= totalRecords}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              aria-disabled={offset + limit >= totalRecords}
              aria-label={t.pagination.next}
            >
              {t.pagination.next}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40" role="status" aria-live="polite">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <span className="sr-only">{t.fetching}</span>
          </div>
        )}

        {error && (
          <div
            className="text-sm text-red-600 mb-4 p-4 bg-red-50 rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            {t.failedLoad} {error}
          </div>
        )}

        {!loading && !error && prices.length === 0 && (
          <div className="text-center p-8 text-gray-600 bg-gray-50 rounded-lg" role="status" aria-live="polite">
            {t.noData}
          </div>
        )}

        {!loading && !error && prices.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow" role="region" aria-label={t.title}>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-green-600 text-white">
                  {(
                    [
                      { key: "commodity", label: t.tableHeaders.commodity },
                      { key: "variety", label: t.tableHeaders.variety },
                      { key: "grade", label: t.tableHeaders.grade },
                      { key: "modal_price", label: t.tableHeaders.price },
                      { key: "market", label: t.tableHeaders.market },
                      { key: "district", label: t.tableHeaders.district },
                      { key: "state", label: t.tableHeaders.state },
                    ] as { key: string; label: string }[]
                  ).map(({ key, label }) => (
                    <th
                      key={key}
                      className="p-3 text-left text-sm font-medium cursor-pointer hover:bg-green-700 select-none"
                      onClick={() => requestSort(key)}
                      scope="col"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          requestSort(key);
                        }
                      }}
                      aria-sort={
                        sortConfig?.key === key
                          ? sortConfig.direction === "ascending"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      aria-label={`${label} column, sortable`}
                    >
                      {label}{" "}
                      {sortConfig?.key === key ? (
                        sortConfig.direction === "ascending" ? (
                          <span aria-hidden="true">↑</span>
                        ) : (
                          <span aria-hidden="true">↓</span>
                        )
                      ) : null}
                    </th>
                  ))}
                  <th className="p-3 text-left text-sm font-medium">{t.tableHeaders.arrivalDate}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-green-50"}>
                    <td className="p-3 text-sm font-medium">{item.commodity}</td>
                    <td className="p-3 text-sm">{item.variety || "—"}</td>
                    <td className="p-3 text-sm">{item.grade || "—"}</td>
                    <td className="p-3 text-sm font-bold text-green-700">₹{item.modal_price}/quintal</td>
                    <td className="p-3 text-sm">{item.market}</td>
                    <td className="p-3 text-sm">{item.district}</td>
                    <td className="p-3 text-sm">{item.state}</td>
                    <td className="p-3 text-sm text-gray-600">{item.arrival_date || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">{t.dataSource}</div>
      </div>
      
    </div>
  );
}