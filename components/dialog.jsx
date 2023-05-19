'use client'

import React from 'react'

import PropTypes from 'prop-types'

import Button from '@mui/material/Button'

import classes from './dialog.module.css'
import CustomTheme from './customtheme'
import { Typography } from '@mui/material'

import captions from '../assets/captions.json'
import useCaption from '../lib/usecaption'

export default function Dialog({ 
    title = '',
    caption = '',
    onConfirm = undefined,
    onClose = undefined,
}) {

    const setCaption = useCaption(captions)

    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                {
                    title &&
                    <div className={classes.header}>
                        <CustomTheme>
                            <Typography variant='h4' component='h4' sx={{fontSize: '1.1rem', fontWeight: '500', }}>{ title }</Typography>
                        </CustomTheme>
                    </div>
                }
                <div className={classes.caption}>
                    <CustomTheme>
                        <Typography>{ caption }</Typography>
                    </CustomTheme>
                </div>
                <div className={classes.action}>
                    <CustomTheme>
                        <Button onClick={onConfirm} variant="outlined" sx={{mr: 1, width: 100, }}>{setCaption('yes')}</Button>
                        <Button onClick={onClose} variant="outlined" sx={{width: 100, }}>{setCaption('no')}</Button>
                    </CustomTheme>
                </div>
            </div>
        </div>
    )
}

Dialog.propTypes = {
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