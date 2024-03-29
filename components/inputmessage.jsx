'use client'

import React from 'react'

import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'

import useCaption from '../lib/usecaption'
import captions from '../assets/captions.json'

import CustomTheme from './customtheme'

import classes from './inputmessage.module.css'

const InputMessage = React.forwardRef(function InputMessageDiv({
    hasStarted = false,
    loading = false,
    inputText = '',
    setInputText = undefined,
    onSubmit = undefined,
}, ref) {

    const setCaption = useCaption(captions)

    return (
        <div className={classes.input}>
            <div className={classes.text}>
                <CustomTheme>
                    <Box 
                    component="form" 
                    onSubmit={onSubmit}
                    noValidate>
                        <TextField 
                        placeholder={hasStarted ? setCaption('placeholder-message-2') : setCaption('placeholder-message-1')}
                        disabled={loading}
                        fullWidth
                        inputRef={ref}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <>
                                    <IconButton
                                    disabled={loading || inputText.length === 0}
                                    onClick={() => setInputText('')}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                    <IconButton
                                    disabled={loading || inputText.length === 0}
                                    onClick={onSubmit}
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
    )
})

InputMessage.propTypes = {
    /**
     * hasStarted bool
     */
    hasStarted: PropTypes.bool,
    /**
     * loading bool
     */
    loading: PropTypes.bool,
    /**
     * inputText string
     */
    inputText: PropTypes.string,
    /**
     * setInputText func
     */
    setInputText: PropTypes.func,
    /**
     * onSubmit handler
     */
    onSubmit: PropTypes.func,
}

export default InputMessage