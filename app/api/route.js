import { chatCompletion } from "../../services/openai"

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

    console.log('submit inquiry', (new Date()).toLocaleTimeString())

    let text = ''

    try {
        
        //let system_prompt = `We will simulate a discussion between different personas in ['Capitalist', 'Socialist','Communist','Pragmatist'].\n` +
        //let system_prompt = `We will simulate a discussion between different personas in ['Capitalist', 'Socialist','Progressive'].\n` +
        //    `You will respond to the subject of inquiry based on these personas.`
        let system_prompt = system

        let messages = [
            { role: 'system', content: system_prompt },
        ]

        messages = messages.concat(previous)
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