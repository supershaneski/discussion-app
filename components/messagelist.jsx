'use client'

import React from 'react'
import PropTypes from 'prop-types'

import LoadingText from './loadingtext'

import Message from './message'
import classes from './messagelist.module.css'

const MessageList = React.forwardRef(function MessagePanel({
    items = [],
    loading = false,
    onDelete = undefined,
}, ref) {
    return (
        <div ref={ref} className={classes.container}>
            {
                items.map((item) => {
                    return (
                        <Message key={item.id} {...item} onDelete={onDelete} />
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
    /**
     * onDelete handler
     */
    onDelete: PropTypes.func,
}

export default MessageList