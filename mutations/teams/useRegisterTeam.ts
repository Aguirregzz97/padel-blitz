import { createTournamentFormSchema } from "@/components/Tournaments/CreateTournamentForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

async function registerTeam(team: {
  playerId1: string;
  playerId2: string;
  categoryTournamentId: string;
}) {
  await axios.post("/api/teams", team);
}

export default function useRegisterTeam(
  onSuccess: () => void,
  onError: (error: Error) => void,
) {
  return useMutation({ mutationFn: registerTeam, onSuccess, onError });
}
