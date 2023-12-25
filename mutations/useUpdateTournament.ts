import { createTournamentFormSchema } from "@/components/Tournaments/CreateTournamentForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

async function updateTournement(
  tournament: z.infer<typeof createTournamentFormSchema> & {
    tournamentId: number;
  },
) {
  await axios.put("/api/tournament", tournament);
}

export default function useUpdateTournament(
  onSuccess: () => void,
  onError: (error: Error) => void,
) {
  return useMutation({
    mutationFn: updateTournement,
    onSuccess,
    onError,
  });
}
