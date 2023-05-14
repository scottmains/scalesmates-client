import { useEffect } from "react";
import { getGoogleFitData } from "../services/calorieBurnService";

export const useGoogleFitData = (token: string, accessToken: string | null) => {
  useEffect(() => {
    if (accessToken) {
      getGoogleFitData(token, accessToken);
    }
  }, [accessToken, token]);
};