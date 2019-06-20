import React, { Component } from "react";
import PropTypes from 'prop-types';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.content !== this.props.centent) {
            return true  
        } else {
            return false 
        }
    }

    render() {
        const {content} = this.props 
        return (
            <li
                key={content}
                onClick={this.handleClick}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    }

    handleClick() {
        const { deleteItem, index } = this.props 
        deleteItem(index)
    }
}

TodoItem.propTypes = {
    content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    deleteItem: PropTypes.func,
    index: PropTypes.number,
};

export default TodoItem;
