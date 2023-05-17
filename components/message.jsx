'use client'

import React from 'react'


import Avatar from '@mui/material/Avatar'

import PersonIcon from '@mui/icons-material/Person'

import FaceIcon from '@mui/icons-material/Face'
import Face5Icon from '@mui/icons-material/Face5'
import Face6Icon from '@mui/icons-material/Face6'

import CustomTheme from './customtheme'

import classes from './message.module.css'

export default function Message({ role, content }) {

    if(role === 'user') {
        return (
            <div className={classes.messageItem}>
                <div className={[classes.texts, classes.user].join(' ')}>
                    { content }
                </div>
            </div>
        )
    }

    const items = content.split('\n').filter((s) => s.length > 0)
    
    //console.log(content)

    return (
        <div className={classes.messageItem}>
            {
                items.map((item, index) => {
                    
                    let user = ''
                    let txt = item
                    
                    const n = item.toLowerCase().indexOf(': ')
                    if(n >= 0) {
                        user = item.substr(0, n).toLowerCase()
                        txt = item.substr(n + 2)
                    }

                    return (
                        <div key={index} className={classes.textDiv}>
                            <div className={classes.icon}>
                                <CustomTheme>
                                    <Avatar alt={user}>
                                        {
                                            user === 'capitalist' && <FaceIcon />
                                        }
                                        {
                                            user === 'socialist' && <Face5Icon />
                                        }
                                        {
                                            user === 'progressive' && <Face6Icon />
                                        }
                                    </Avatar>
                                </CustomTheme>
                                <div className={classes.name}>{ user }</div>
                            </div>
                            <div className={[classes.texts, classes.assistant].join(' ')}>
                                { txt }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}