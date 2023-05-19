'use client'

import React from 'react'

import PropTypes from 'prop-types'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputBase from '@mui/material/InputBase'

import SettingsIcon from '@mui/icons-material/Settings'

import useDataStore from '../stores/datastore'

import classes from './settings.module.css'
import CustomTheme from './customtheme'

import useCaption from '../lib/usecaption'
import captions from '../assets/captions.json'

import useAppStore from '../stores/appstore'

export default function Settings({ 
    //title = '',
    //caption = '',
    onConfirm = undefined,
    onClose = undefined,
}) {

    const setCaption = useCaption(captions)

    const isDarkMode = useAppStore((state) => state.darkMode)

    const characters = useDataStore((state) => state.characters)
    const updateCharacters = useDataStore((state) => state.update)

    const [characterItems, setCharacterItems] = React.useState([])

    React.useEffect(() => {
        setCharacterItems(characters)
    }, [])

    const handleName = (id, name) => {

        setCharacterItems((prev) => {
            let prevs = prev.slice(0).map((item) => {
                return {
                    ...item,
                    name: item.id === id ? name : item.name
                }
            })
            return prevs
        })

    }

    const handleDescription = (id, description) => {
        
        setCharacterItems((prev) => {
            let prevs = prev.slice(0).map((item) => {
                return {
                    ...item,
                    description: item.id === id ? description : item.description
                }
            })
            return prevs
        })

    }

    const handleConfirm = () => {

        updateCharacters(characterItems)

        onConfirm(characterItems)

    }

    const disableddState = React.useCallback(() => {

        let flag = characterItems.some((item) => item.name.trim().length === 0)

        return flag

    }, [characterItems])

    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                <div className={classes.header}>
                    <CustomTheme>
                        <SettingsIcon sx={{ mr: 1 }} />
                        <Typography variant='h4' component='h4' sx={{fontSize: '1.1rem', fontWeight: '500', }}>
                            {setCaption('character-list')}
                        </Typography>
                    </CustomTheme>
                </div>
                <div className={classes.panel}>
                    <div className={classes.panelRow}>
                        <div className={classes.panelName}>
                            <CustomTheme>
                                <Typography>{setCaption('name')}</Typography>
                            </CustomTheme>
                        </div>
                        <div className={classes.panelItem}>
                            <CustomTheme>
                                <Typography>{setCaption('description')}</Typography>
                            </CustomTheme>
                        </div>
                    </div>
                    {
                        characterItems.map((item) => {
                            return (
                                <div key={item.id} className={classes.panelRow}>
                                    <div className={classes.panelName}>
                                        <CustomTheme>
                                            <InputBase 
                                            value={item.name}
                                            onChange={(e) => handleName(item.id, e.target.value)}
                                            fullWidth 
                                            size='small' 
                                            //placeholder='Write name' 
                                            placeholder={setCaption('placeholder-name')}
                                            sx={{
                                                border: isDarkMode ? '1px solid rgba(128, 128, 128, 0.125)' : '1px solid rgba(0, 0, 0, 0.125)', 
                                                borderRadius: '3px', padding: '5px' }} />
                                        </CustomTheme>
                                    </div>
                                    <div className={classes.panelItem}>
                                        <CustomTheme>
                                            <InputBase 
                                            value={item.description}
                                            onChange={(e) => handleDescription(item.id, e.target.value)}
                                            fullWidth 
                                            size='small' 
                                            //placeholder='Write description' 
                                            placeholder={setCaption('placeholder-description')}
                                            sx={{
                                                border: isDarkMode ? '1px solid rgba(128, 128, 128, 0.125)' : '1px solid rgba(0, 0, 0, 0.125)', 
                                                borderRadius: '3px', padding: '5px' }} />
                                        </CustomTheme>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={classes.action}>
                    <CustomTheme>
                        <Button disabled={disableddState()} onClick={handleConfirm} variant="outlined" sx={{mr: 1, width: 100, }}>{setCaption('save')}</Button>
                        <Button onClick={onClose} variant="outlined" sx={{width: 100, }}>{setCaption('close')}</Button>
                    </CustomTheme>
                </div>
            </div>
        </div>
    )
}

Settings.propTypes = {
    /**
     * Title string
     */
    title: PropTypes.string,
    /**
     * Dialog's caption String
     */
    caption: PropTypes.string,
    /**
     * onConfirm event
     */
    onConfirm: PropTypes.func,
    /**
     * onClose event
     */
    onClose: PropTypes.func,
}