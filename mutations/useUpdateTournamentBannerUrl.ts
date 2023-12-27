import { createTournamentFormSchema } from "@/components/Tournaments/CreateTournamentForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

async function updateTournementBannerUrl({
  tournamentId,
  bannerUrl,
}: {
  bannerUrl: string;
  tournamentId: number;
}) {
  await axios.put("/api/tournament/banner_url", { bannerUrl, tournamentId });
}

export default function useUpdateTournamentBannerUrl(
  onSuccess: () => void,
  onError: (error: Error) => void,
) {
  return useMutation({
    mutationFn: updateTournementBannerUrl,
    onSuccess,
    onError,
  });
}
