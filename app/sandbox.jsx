'use client'

import React from 'react'
import { createPortal } from 'react-dom'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'

import CustomTheme from '../components/customtheme'
import LoadingText from '../components/loadingtext'
import Message from '../components/message'
import Header from '../components/header'
import Dialog from '../components/dialog'

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

        let system = `We will simulate a discussion between different personas in ['Person1', 'Person2','Person3'].\n` +
            `You will respond to the subject of inquiry based on these personas.\n` +
            `The following are the descriptions of each personas:\n` +
            `Persona1: a writer, vegan and self-described socialist.\n` +
            `Persona2: a small-business owner, conservative and card carrying republican.\n` +
            `Persona3: a farmer, gun rights activist and libertarian.`
        
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
        
        //setMessageItems([])
        //clearData()

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

    return (
        <div className={classes.container}>
            <Header 
            disabled={messageItems.length === 0} 
            title={process.env.siteTitle} 
            onRefresh={handleRefreshMessages}
            />
            <div className={classes.messages}>
                {
                    messageItems.map((item) => {
                        
                        //const classItem = item.role === 'user' ? [classes.texts, classes.user].join(' ') : [classes.texts, classes.assistant].join(' ')

                        //const texts = item.content.split('\n').filter((s) => s.length > 0)

                        /*return (
                            <div key={item.id} className={classes.messageItem}>
                                {
                                    texts.map((t, i) => {
                                        return (
                                            <div key={i} className={classItem}>
                                                { t }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )*/

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
            </div>
            <div className={classes.input}>
                <div className={classes.text}>
                    <CustomTheme>
                        <Box 
                        component="form" 
                        onSubmit={handleSubmit}
                        noValidate>
                            <TextField 
                            disabled={loading}
                            fullWidth
                            multiline
                            maxRows={6}
                            inputRef={inputRef}
                            value={inputText}
                            //placeholder={setCaption('write-message')}
                            onChange={(e) => setInputText(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <>
                                        <IconButton
                                        disabled={inputText.length === 0}
                                        onClick={() => setInputText('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                        <IconButton
                                        disabled={inputText.length === 0}
                                        onClick={handleSubmit}
                                        >
                                            <SendIcon />
                                        </IconButton>
                                        </>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </Box>
                    </CustomTheme>
                </div>
            </div>
            {
                openDialog && createPortal(
                    <Dialog 
                    //caption='Do you really want to clear the messages?'
                    caption='Do you want to start a new topic?'
                    onConfirm={handleDialogConfirm}
                    onClose={handleDialogClose}
                    />,
                    document.body,
                )
            }
        </div>
    )
}