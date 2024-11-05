import supabase from "@/app/(utils)/supabase"

interface Turn {
    id: string;
    name: string;
}

interface TurnSupabase extends Turn {
    createdAt: string
}

const getAllTurns = async (): Promise<Turn[]> => {
    const { data, error } = await supabase.from('Turns')
        .select()

    if (error) {
        console.log({ error })
    }

    return data as Turn[]
}

const saveTurn = async (turn: Turn) => {
    return await supabase.from("Turns").insert(turn);
}

export default {
    getAllTurns,
    saveTurn,
}