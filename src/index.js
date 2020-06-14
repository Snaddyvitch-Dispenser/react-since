/*
 * React Since (MIT)
 * Tom Smith (https://github.com/tsmith123)
 * Modified by Snaddyvitch-Dispenser (https://github.com/Snaddyvitch-Dispenser)
 */

import React from 'react'
import PropTypes from 'prop-types'

class Since extends React.Component {
    state = {
        timeoutId: null,
        since: null
    };

    tick = () => {
        const newState = { ...this.state };
        const { live, date, seconds } = this.props;

        newState.since = this.getSince(date);

        if (live) {
            newState.timeoutId = setTimeout(this.tick, 1000 * seconds)
        }

        this.setState(newState)
    };

    componentDidMount () {
        const { date } = this.props;
        if (!date) return;

        this.tick()
    }

    componentDidUpdate (prevProps) {
        const { date } = this.props;
        if (!date) return;

        if (prevProps.date !== date) {
            this.tick()
        }
    }

    componentWillUnmount () {
        const { timeoutId } = this.state;

        if (timeoutId) {
            clearTimeout(timeoutId)
        }
    }

    // the logic - needs cleaning up
    getSince = date => {
        // convert date to milliseconds
        const then = Date.parse(date);
        const now = Date.now();
        if (then <= now) {

            // get difference in seconds between two dates
            const seconds = Math.round(Math.abs(now - then) / 1000);

            const minutes = Math.round(seconds / 60);
            if (minutes < 5) {
                return 'just now'
            }

            // round to nearest 5 minutes
            if (minutes < 45) {
                return (Math.round(minutes / 5) * 5) + ' minutes ago'
            }

            if (minutes < 90) {
                return 'an hour ago'
            }

            const hours = Math.round(minutes / 60);
            if (hours < 5) {
                return 'a few hours ago'
            }

            if (hours < 12) {
                return hours + ' hours ago'
            }

            const days = Math.round(hours / 24);
            if (days === 1) {
                return 'yesterday'
            }

            if (days < 7) {
                return days + ' days ago'
            }

            const weeks = Math.round(days / 7);
            if (weeks === 1) {
                return 'a week ago'
            }
            if (weeks < 4) {
                return weeks + ' weeks ago'
            }

            const months = Math.round(weeks / 4);
            if (months === 1) {
                return 'a month ago'
            }
            if (months < 12) {
                return months + ' months ago'
            }

            const years = Math.round(months / 12);
            if (years === 1) {
                return 'a year ago'
            }

            return years + ' years ago'
        } else {
            // get difference in seconds between two dates
            const seconds = Math.round(Math.abs(now - then) / 1000);

            const minutes = Math.round(seconds / 60);
            if (minutes < 5) {
                return 'just now'
            }

            // round to nearest 5 minutes
            if (minutes < 45) {
                return (Math.round(minutes / 5) * 5) + ' minutes ago'
            }

            if (minutes < 90) {
                return 'in a hour'
            }

            const hours = Math.round(minutes / 60);
            if (hours < 5) {
                return 'in a few hours'
            }

            if (hours < 12) {
                return 'in ' + hours + ' hours'
            }

            const days = Math.round(hours / 24);
            if (days === 1) {
                return 'tomorrow'
            }

            if (days < 7) {
                return 'in ' + days + ' days'
            }

            const weeks = Math.round(days / 7);
            if (weeks === 1) {
                return 'in a week'
            }
            if (weeks < 4) {
                return 'in ' + weeks + ' weeks'
            }

            const months = Math.round(weeks / 4);
            if (months === 1) {
                return 'in a month'
            }
            if (months < 12) {
                return 'in ' + months + ' months'
            }

            const years = Math.round(months / 12);
            if (years === 1) {
                return 'in a year'
            }

            return 'in ' + years + ' years'
        }
    };

    render () {
        const { since } = this.state;

        return <span>{since}</span>
    }
}

Since.propTypes = {
    live: PropTypes.bool,
    date: PropTypes.string,
    seconds: PropTypes.number
};

Since.defaultProps = {
    live: true,
    seconds: 60
};

export default Since
