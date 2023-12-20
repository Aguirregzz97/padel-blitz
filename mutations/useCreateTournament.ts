import { createTournamentFormSchema } from "@/components/Tournaments/CreateTournamentForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

async function postTournament(
  tournament: z.infer<typeof createTournamentFormSchema>,
) {
  await axios.post("/api/tournament", tournament);
}

export default function useCreateTourment(
  onSuccess: () => void,
  onError: (error: Error) => void,
) {
  return useMutation({ mutationFn: postTournament, onSuccess, onError });
}
