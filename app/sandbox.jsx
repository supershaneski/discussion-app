'use client'

import React from 'react'
import { createPortal } from 'react-dom'

import MessageList from '../components/messagelist'
import Banner from '../components/banner'
import Dialog from '../components/dialog'
import InputMessage from '../components/inputmessage'

import useDataStore from '../stores/datastore'
import useDarkMode from '../lib/usedarkmode'
import { getSimpleId } from '../lib/utils'

import classes from './sandbox.module.css'

async function sendData(inquiry, previous, system) {

    const response = await fetch('/api/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            inquiry,
            previous,
            system,
        })
    })

    if(!response.ok) {
        console.log('Oops, an error occurred', response.status)
    }

    return response.json()

}

export default function Sandbox() {

    useDarkMode()

    const data = useDataStore((state) => state.data)
    const addData = useDataStore((state) => state.add)
    const clearData = useDataStore((state) => state.clear)

    const inputRef = React.useRef(null)
    const messageRef = React.useRef(null)
    const timerRef = React.useRef()

    const [inputText, setInputText] = React.useState('')
    const [messageItems, setMessageItems] = React.useState([])

    const [loading, setLoading] = React.useState(false)

    const [openDialog, setOpenDialog] = React.useState(false)

    React.useEffect(() => {

        setMessageItems(data)

    }, [])

    const addMessageItem = (s) => {

        addData(s)
        setMessageItems((prev) => [...prev, ...[s]])

        scrollToTop()

    }

    const scrollToTop = () => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }, 100)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if(!inputText.trim()) {
            return
        }

        setLoading(true)

        const message = inputText

        const previous = messageItems.map((item) => {
            return {
                role: item.role,
                content: item.content,
            }
        })

        addMessageItem({
            id: getSimpleId(),
            role: 'user',
            content: message,
        })

        setInputText('')

        inputRef.current.blur()

        //let system = `We will simulate a discussion between different personas in ['Capitalist', 'Socialist','Progressive'].\n` +
        //    `You will respond to the subject of inquiry based on these personas.`

        /*
        let system = `We will simulate a discussion between different personas in ['Person1', 'Person2','Person3'].\n` +
            `You will respond to the subject of inquiry based on these personas.\n` +
            `The following are the descriptions of each personas:\n` +
            `Persona1: a writer, vegan and self-described socialist.\n` +
            `Persona2: a small-business owner, conservative and card carrying republican.\n` +
            `Persona3: a farmer, gun rights activist and libertarian.`
        */
        
        let system = `We will simulate a discussion between different personas in ['Capitalist', 'Socialist','Libertarian'].\n` +
            `You will respond to the subject of inquiry based on these personas.`
            //`The following are the descriptions of each personas:\n` +
            //`John: Capitalist.\n` +
            //`Robert: socialist.\n` +
            //`Hubert: libertarian.`
            //`John: a liberal arts student, left leaning activist.\n` +
            //`Robert: an engineering student from middle-income family, no political affiliations.\n` +
            //`Hubert: a college basketball varsity player, conservative.`
        
        

        try {
            
            const response = await sendData(message, previous, system)

            setLoading(false)

            addMessageItem({
                id: getSimpleId(),
                role: 'assistant',
                content: response.text,
            })

        } catch(error) {

            setLoading(false)
            
            console.log(error)

        }

    }

    const handleRefreshMessages = () => {
        
        setOpenDialog(true)

    }

    const handleDialogConfirm = () => {

        setOpenDialog(false)

        setMessageItems([])
        clearData()

    }

    const handleDialogClose = () => {

        setOpenDialog(false)

    }

    /*
    <div ref={messageRef} className={classes.messages}>
                {
                    messageItems.map((item) => {
                        return (
                            <Message key={item.id} {...item} />
                        )
                    })
                }
                {
                    loading &&
                    <div className={classes.loader}>
                        <LoadingText />
                    </div>
                }
            </div>*/
    
    return (
        <div className={classes.container}>
            <Banner 
            disabled={messageItems.length === 0} 
            title={process.env.siteTitle} 
            onRefresh={handleRefreshMessages}
            />
            <MessageList 
            ref={messageRef} 
            loading={loading} 
            items={messageItems}
            />
            <InputMessage
            ref={inputRef}
            loading={loading}
            inputText={inputText}
            setInputText={setInputText}
            onSubmit={handleSubmit}
            />
            {
                openDialog && createPortal(
                    <Dialog 
                    title='New Topic'
                    caption={`Do you want to start a new topic?`}
                    onConfirm={handleDialogConfirm}
                    onClose={handleDialogClose}
                    />,
                    document.body,
                )
            }
        </div>
    )
}