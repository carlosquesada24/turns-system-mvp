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
    const result = await supabase.from("Turns").upsert(turn).select()

    if (result.error) {
        console.log(result.error)
    }

    const isResultValid = result.data && Array.isArray(result.data)

    const turnInserted = isResultValid ? result.data[0] : {}

    return turnInserted
}

export default {
    getAllTurns,
    saveTurn,
}