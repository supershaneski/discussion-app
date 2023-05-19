'use client'

import React from 'react'

import PropTypes from 'prop-types'

import Avatar from '@mui/material/Avatar'

import CustomTheme from './customtheme'

import useDataStore from '../stores/datastore'

import classes from './message.module.css'

export default function Message({ 
    role, 
    content 
}) {

    const characters = useDataStore((state) => state.characters)

    const setDescription = (name) => {

        if(characters.length === 0) return ''

        const character = characters.find((item) => item.name.toLowerCase() === name.toLowerCase())

        if(!character) return ''

        return character.description
    }

    if(role === 'user') {
        return (
            <div className={classes.container}>
                <div className={classes.userContent}>
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
            if(i > 0) {
                msgs[index].items.push(items[i])
            } else {
                index++
                msgs[index] = {
                    name: 'AI',
                    items: [items[i]],
                }
            }
        }
    }

    return (
        <div className={classes.container}>
        {
            msgs.map((m, j) => {
                return (
                    <div key={ j } className={classes.characterContent}>
                        <div className={classes.icon}>
                            <CustomTheme>
                                <Avatar alt={ m.name } />
                            </CustomTheme>
                            <div className={classes.profile}>
                                <div className={classes.name}>{ m.name }</div>
                                <div className={classes.description}>{ setDescription(m.name) }</div>
                            </div>
                        </div>
                        <div className={classes.message}>
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