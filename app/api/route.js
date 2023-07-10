import { chatCompletion } from "../../services/openai"
import { trim_array } from "../../lib/utils"

export async function POST(request) {
    
    const { inquiry, previous, system } = await request.json()
    
    if (!system) {
        return new Response('No system', {
            status: 403,
        })
    }

    if (!inquiry) {
        return new Response('Bad question', {
            status: 401,
        })
    }

    if (!Array.isArray(previous)) {
        return new Response('Bad chunks', {
            status: 402,
        })
    }

    let prev_data = trim_array(previous, 20)
    let text = ''
    
    try {
        
        let system_prompt = system

        let messages = []
        messages.push({ role: 'system', content: system_prompt })
        messages = messages.concat(prev_data)
        messages.push({ role: 'user', content: inquiry })

        text = await chatCompletion({
            messages,
            temperature: 0.7,
        })

    } catch(error) {
        console.log(error)
    }
    
    return new Response(JSON.stringify({
        text,
    }), {
        status: 200,
    })

}