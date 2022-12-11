import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { getCurrencyList, ICurrencyList } from "../api/requests";
import useLocalStorage from "./useLocalStorage";

export const useDataGrid = () => {
  const [rows, setRows] = useState<ICurrencyList | null>(null);
  const [localData, setLocalData] = useLocalStorage<ICurrencyList | null>(
    "currency-list",
    null
  );
  const [timeStamp, setTimestamp] = useLocalStorage<number>("time-stamp", 0);

  const $currencyList = useQuery({
    queryKey: ["currency-list"],
    queryFn: getCurrencyList,
    retry: false, // no refetch if request failed
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    ...(localStorage.getItem("time-stamp") &&
      localStorage.getItem("currency-list") && {
        enabled: timeStamp < Date.now(),
      }),
    cacheTime: 3.6e6,
    refetchInterval: 3.6e6, // Refetch every 1 hour if no actions
    onSuccess: () => setTimestamp(Date.now() + 3.6e6),
  });

  const { data, isLoading, isFetching, refetch } = $currencyList;

  const { restart } = useTimer({
    expiryTimestamp: new Date(timeStamp),
    onExpire: refetch,
    autoStart: true,
  });

  useEffect(() => {
    if (data) {
      if ("errorDescription" in data) {
        console.log("API response: ", data.errorDescription);
        setRows(localData);
        return;
      }
      setRows(data);
      setLocalData(data);
      return;
    }
    if (!data && localData) {
      setRows(localData);
    }
  }, [data, localData, setLocalData]);

  return {
    rows,
    isLoading,
    isFetching,
    timeStamp,
    setTimestamp,
    restart,
    refetch,
  };
};
