'use client'

import React from 'react'

import PropTypes from 'prop-types'

import Button from '@mui/material/Button'

import classes from './dialog.module.css'
import CustomTheme from './customtheme'
import { Typography } from '@mui/material'

export default function Dialog({ 
    caption = 'Lorem ipsum dolor amet',
    onConfirm = undefined,
    onClose = undefined,
}) {
    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                <div className={classes.caption}>
                    <CustomTheme>
                        <Typography>{ caption }</Typography>
                    </CustomTheme>
                </div>
                <div className={classes.action}>
                    <CustomTheme>
                        <Button onClick={onConfirm} variant="outlined" sx={{mr: 1, width: 100, }}>OK</Button>
                        <Button onClick={onClose} variant="outlined" sx={{width: 100, }}>Cancel</Button>
                    </CustomTheme>
                </div>
            </div>
        </div>
    )
}

Dialog.propTypes = {
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