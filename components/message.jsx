'use client'

import React from 'react'

import PropTypes from 'prop-types'

import Avatar from '@mui/material/Avatar'

import CustomTheme from './customtheme'

import classes from './message.module.css'

export default function Message({ 
    role, 
    content 
}) {

    if(role === 'user') {
        return (
            <div className={classes.messageItem}>
                <div className={[classes.messageDiv, classes.user].join(' ')}>
                    { content }
                </div>
            </div>
        )
    }

    const items = content.split('\n').filter((s) => s.length > 0)

    let msgs = []
    let index = -1
    for(let i = 0; i < items.length; i++) {
        const n = items[i].toLowerCase().indexOf(':')
        if(n > 0) {
            index++
            let name = items[i].substr(0, n).toLowerCase()
            let str = items[i].substr(n + 2)
            let k = name.indexOf(' (')
            name = k > 0 ? name.substr(0, k) : name
            msgs[index] = {
                name,
                items: [str],
            }
        } else {
            msgs[index].items.push(items[i])
        }
    }

    return (
        <div className={classes.messageItem}>
        {
            msgs.map((m) => {
                return (
                    <div key={ m.name } className={classes.textDiv}>
                        <div className={classes.icon}>
                            <CustomTheme>
                                <Avatar alt={ m.name } />
                            </CustomTheme>
                            <div className={classes.name}>{ m.name }</div>
                        </div>
                        <div className={classes.divMsg}>
                            <div className={[classes.texts, classes.assistant].join(' ')}>
                            {
                                m.items.map((n, i) => {
                                    return (
                                        <div key={i} className={classes.paratext}>
                                            { n }
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}

Message.propTypes = {
    /**
     * Role string
     */
    role: PropTypes.string,
    /**
     * Content string
     */
    content: PropTypes.string,
}