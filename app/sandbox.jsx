'use client'

import React from 'react'
import { createPortal } from 'react-dom'

import MessageList from '../components/messagelist'
import Banner from '../components/banner'
import Dialog from '../components/dialog'
import Settings from '../components/settings'
import InputMessage from '../components/inputmessage'

import useDataStore from '../stores/datastore'
import useDarkMode from '../lib/usedarkmode'
import useCaption from '../lib/usecaption'
import { getSimpleId } from '../lib/utils'
import captions from '../assets/captions.json'

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

    const setCaption = useCaption(captions)

    const data = useDataStore((state) => state.data)
    const addData = useDataStore((state) => state.add)
    const deleteData = useDataStore((state) => state.delete)
    const clearData = useDataStore((state) => state.clear)
    const characters = useDataStore((state) => state.characters)

    const inputRef = React.useRef(null)
    const messageRef = React.useRef(null)
    const timerRef = React.useRef()

    const [inputText, setInputText] = React.useState('')
    const [characterItems, setCharacterItems] = React.useState([])
    const [messageItems, setMessageItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openSetting, setOpenSetting] = React.useState(false)

    React.useEffect(() => {

        setMessageItems(data)

        setCharacterItems(characters)

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

        let system = `We will simulate a discussion between different personas in ['${characterItems[0].name}', '${characterItems[1].name}','${characterItems[2].name}'].\n` +
            `You will respond to the subject of inquiry based on these personas.\n` +
            `The following are the descriptions of each personas:\n` +
            `${characterItems[0].name}: ${characterItems[0].description}.\n` +
            `${characterItems[1].name}: ${characterItems[1].description}.\n` +
            `${characterItems[2].name}: ${characterItems[2].description}.`
        
        
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

    const handleOpenSetting = () => {

        setOpenSetting(true)

    }

    const handleSettingConfirm = (data) => {
        
        setCharacterItems(data)
        
        setOpenSetting(false)

    }

    const handleSettingClose = () => {
        
        setOpenSetting(false)

    }

    const handleCopy = () => {

        // Prepare text data
        const data = messageItems.reduce((s, cur) => {
            return s + cur.content + '\n\n'
        }, '')

        // Copy to clipboard
        try {
            
            const clipboardItem = new ClipboardItem({
                'text/plain': new Blob([data], { type: 'text/plain' }),
            })
            
            navigator.clipboard.write([clipboardItem]).then(() => {
                console.log('copy to clipboard success')
            }, () => {
                console.log('copy to clipboard failed')
            })

        } catch(error) {
            
            console.log(error)

        }

    }

    const handleDelete = (id) => {
        
        setMessageItems((items) => {
            let msgs = items.slice(0).filter((item) => item.id !== id)
            return msgs
        })

        deleteData(id)

    }

    return (
        <div className={classes.container}>
            <Banner 
            disabled={messageItems.length === 0} 
            //title={process.env.siteTitle} 
            title={setCaption('app-title')}
            onCopy={handleCopy}
            onRefresh={handleRefreshMessages}
            onSettings={handleOpenSetting}
            />
            <MessageList 
            ref={messageRef} 
            loading={loading} 
            items={messageItems}
            onDelete={handleDelete}
            />
            <InputMessage
            ref={inputRef}
            hasStarted={messageItems.length > 0}
            loading={loading}
            inputText={inputText}
            setInputText={setInputText}
            onSubmit={handleSubmit}
            />
            {
                openDialog && createPortal(
                    <Dialog 
                    //title='New Topic'
                    //caption={`Do you want to start a new topic?`}
                    title={setCaption('dialog-title')}
                    caption={setCaption('dialog-caption')}
                    onConfirm={handleDialogConfirm}
                    onClose={handleDialogClose}
                    />,
                    document.body,
                )
            }
            {
                openSetting && createPortal(
                    <Settings 
                    onConfirm={handleSettingConfirm}
                    onClose={handleSettingClose}
                    />,
                    document.body,
                )
            }
        </div>
    )
}