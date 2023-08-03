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

    const deleteStatus = useDataStore((state) => state.deleteStatus)
    const clearStatus = useDataStore((state) => state.clearStatus)
    const setDeleteStatus = useDataStore((state) => state.updateDelete)
    const setClearStatus = useDataStore((state) => state.updateClear)

    const characters = useDataStore((state) => state.characters)

    const inputRef = React.useRef(null)
    const messageRef = React.useRef(null)
    const timerRef = React.useRef()

    const [inputText, setInputText] = React.useState('')
    const [characterItems, setCharacterItems] = React.useState([])
    const [messageItems, setMessageItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [dialogMode, setDialogMode] = React.useState(0)
    const [openSetting, setOpenSetting] = React.useState(false)
    const [dialogArg, setDialogArg] = React.useState('')

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

        const groupId = getSimpleId()

        addMessageItem({
            id: getSimpleId(),
            gid: groupId,
            role: 'user',
            content: message,
        })

        setInputText('')

        inputRef.current.blur()
        
        const persona_names = characterItems.map((item) => `${item.name}`).join(',')
        const persona_descriptions = characterItems.map((item) => `${item.name}: ${item.description}.`).join('\n')

        let system = `We will simulate a discussion between different personas in [${persona_names}].\n` +
            `You will respond to the subject of inquiry based on these personas.\n` +
            `Most of the time your responses should be a sentence or two per persona.\n` +
            `The following are the descriptions of each personas:\n` + persona_descriptions
        
        try {
            
            const response = await sendData(message, previous, system)

            setLoading(false)

            const text = response.text.length === 0 ? setCaption('error-unexpected') : response.text

            addMessageItem({
                id: getSimpleId(),
                gid: groupId,
                role: 'assistant',
                content: text,
            })

        } catch(error) {

            setLoading(false)
            
            console.log(error)

        }


    }

    const handleRefreshMessages = () => {
        
        if(clearStatus > 0) {

            setMessageItems([])
            clearData()

        } else {

            setDialogMode(0)
            setOpenDialog(true)

        }

    }

    const handleDialogConfirm = (v) => {

        setOpenDialog(false)

        if(dialogMode === 0) {

            setMessageItems([])
            clearData()

        } else {

            setMessageItems((items) => {
                let msgs = items.slice(0).filter((item) => item.gid !== v)
                return msgs
            })
            
            deleteData(v)

        }

    }

    const handleDialogClose = () => {

        setOpenDialog(false)

    }

    const handleOpenSetting = () => {

        setOpenSetting(true)

    }

    const handleSettingConfirm = (data) => {

        setMessageItems([])
        
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

        if(deleteStatus > 0) {

            setMessageItems((items) => {
                let msgs = items.slice(0).filter((item) => item.gid !== id)
                return msgs
            })
    
            deleteData(id)

        } else {

            setDialogArg(id)
            setDialogMode(1)
            setOpenDialog(true)

        }

    }

    const handleStatus = (n) => {

        if(dialogMode > 0) {

            setDeleteStatus(n)

        } else {

            setClearStatus(n)

        }

    }

    return (
        <div className={classes.container}>
            <Banner 
            disabled={messageItems.length === 0} 
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
                    title={dialogMode > 0 ? setCaption('delete-title') : setCaption('dialog-title')}
                    caption={dialogMode > 0 ? setCaption('delete-caption') : setCaption('dialog-caption')}
                    status={dialogMode > 0 ? deleteStatus : clearStatus}
                    param={dialogArg}
                    onConfirm={handleDialogConfirm}
                    onClose={handleDialogClose}
                    onStatus={handleStatus}
                    />,
                    document.body,
                )
            }
            {
                openSetting && createPortal(
                    <Settings 
                    isMessageExists={messageItems.length > 0}
                    onConfirm={handleSettingConfirm}
                    onClose={handleSettingClose}
                    />,
                    document.body,
                )
            }
        </div>
    )
}