'use client'

import React from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import SettingsIcon from '@mui/icons-material/Settings'
import RefreshIcon from '@mui/icons-material/Refresh'

import CustomTheme from './customtheme'

import classes from './header.module.css'

export default function Header({ 
    title = 'Untitled',
    disabled = false,
    onRefresh = undefined,
    onSettings = undefined,
}) {
    return (
        <div className={classes.container}>
            <CustomTheme>
                <Typography 
                sx={{ fontWeight: 400, fontSize: '1rem', ml: 1 }} 
                variant="h1" 
                //gutterBottom
                >{title}</Typography>
            </CustomTheme>
            <div className={classes.icons}>
                <CustomTheme>
                    <IconButton 
                    disabled={disabled}
                    onClick={onRefresh} sx={{ mr: 1 }}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton 
                    //disabled={disabled}
                    onClick={onSettings}>
                        <SettingsIcon />
                    </IconButton>
                </CustomTheme>
            </div>
        </div>
    )
}