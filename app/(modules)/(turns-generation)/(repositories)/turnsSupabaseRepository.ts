import supabase from "@/app/(utils)/supabase"

interface Turn {
    id: string;
    name: string;
}

interface TurnSupabase extends Turn {
    createdAt: string
}

const saveTurn = async (turn: Turn) => {
    return await supabase.from("Turns").insert(turn);
}

export default {
    saveTurn,
}