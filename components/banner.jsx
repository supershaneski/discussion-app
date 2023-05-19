'use client'

import React from 'react'

import PropTypes from 'prop-types'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import RefreshIcon from '@mui/icons-material/Refresh'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import CopyIcon from '@mui/icons-material/ContentCopy'

import CustomTheme from './customtheme'

import classes from './banner.module.css'

export default function Banner({ 
    title = '',
    disabled = false,
    onCopy = undefined,
    onRefresh = undefined,
    onSettings = undefined,
}) {
    return (
        <div className={classes.container}>
            <div className={classes.banner}>
                <CustomTheme>
                    <QuestionAnswerIcon />
                    <Typography 
                    sx={{ fontWeight: 400, fontSize: '1rem', ml: 1 }} 
                    variant="h1" 
                    //gutterBottom
                    >{title}</Typography>
                </CustomTheme>
            </div>
            <div className={classes.icons}>
                <CustomTheme>
                    <IconButton 
                    disabled={disabled}
                    onClick={onCopy} 
                    sx={{ mr: 1 }}>
                        <CopyIcon />
                    </IconButton>
                    <IconButton 
                    disabled={disabled}
                    onClick={onRefresh} 
                    sx={{ mr: 1 }}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton 
                    disabled={!disabled}
                    onClick={onSettings}>
                        <SettingsIcon />
                    </IconButton>
                </CustomTheme>
            </div>
        </div>
    )
}

Banner.propTypes = {
    /**
     * Title string
     */
    title: PropTypes.string,
    /**
     * Disabled property
     */
    disabled: PropTypes.bool,
    /**
     * onCopy event
     */
    onCopy: PropTypes.func,
    /**
     * onRefresh event
     */
    onRefresh: PropTypes.func,
    /**
     * onSettings event
     */
    onSettings: PropTypes.func,
}