'use client'

import React from 'react'
import PropTypes from 'prop-types'

import LoadingText from './loadingtext'

import Message from './message'
import classes from './messagelist.module.css'

const MessageList = React.forwardRef(function MessagePanel({
    items = [],
    loading = false,
}, ref) {
    return (
        <div ref={ref} className={classes.container}>
            {
                items.map((item) => {
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
    )
})

MessageList.propTypes = {
    /**
     * Items list
     */
    items: PropTypes.array,
    /**
     * loading boolean
     */
    loading: PropTypes.bool,
}

export default MessageList