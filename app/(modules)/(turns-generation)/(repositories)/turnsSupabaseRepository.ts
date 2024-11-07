import supabase from "@/app/(utils)/supabase"
import { Turn } from "@/app/(models)/(turns)/interfaces"
import { TurnSupabase } from "@/app/(models)/(turns)/interfaces/supabase"

const getAllTurns = async (): Promise<TurnSupabase[]> => {
    const { data, error } = await supabase.from('Turns')
        .select()

    if (error) {
        console.log({ error })
    }

    return data as Turn[]
}

const saveTurn = async (turn: Turn): Promise<TurnSupabase> => {
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