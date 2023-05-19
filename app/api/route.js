import { chatCompletion } from "../../services/openai"
import { isEven } from "../../lib/utils"

/**
 * API has 4096 max tokens but we are going to set out limit
 * to much lower. You can change this if you want.
 */
const MAX_TOKENS = 3072 // 1024 x 3

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

    let prev_data = previous
    let text = ''

    /**
     * check token count
     */
    let total_token_count = Math.ceil((inquiry.length + system.length) / 4)
    if(previous.length > 0) {
        total_token_count += Math.ceil((JSON.stringify(previous)).length / 4)
    }

    if(total_token_count > MAX_TOKENS) {

        /**
         * We will delete old entries from previous data.
         * This is just a very simple and crude way to ensure that we do not hit the maximum.
         */
        //let cutoff = parseInt(previous.length / 2)
        let cutoff = previous.length > 40 ? Math.ceil(previous.length - 20) : parseInt(previous.length / 2)

        cutoff = isEven(cutoff) ? cutoff : cutoff + 1

        prev_data = previous.slice(cutoff)

    }

    try {
        
        //let system_prompt = `We will simulate a discussion between different personas in ['Capitalist', 'Socialist','Communist','Pragmatist'].\n` +
        //let system_prompt = `We will simulate a discussion between different personas in ['Capitalist', 'Socialist','Progressive'].\n` +
        //    `You will respond to the subject of inquiry based on these personas.`
        let system_prompt = system

        let messages = [
            { role: 'system', content: system_prompt },
        ]

        //messages = messages.concat(previous)
        messages = messages.concat(prev_data)
        messages.push({ role: 'user', content: inquiry })

        text = await chatCompletion({
            messages,
            temperature: 0.7,
        })

    } catch(error) {
        console.log(error)
    }

    //text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

    return new Response(JSON.stringify({
        text,
    }), {
        status: 200,
    })

}