import React, { Fragment, Component } from 'react'
import { Input, Button, List } from 'antd'
import './todolist.css'
import { getChangeInputAction, getAddItemAction, getDeleteItemAction } from './store/actionCreator'
import store from './store'


class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleState = this.handleState.bind(this)

        store.subscribe(this.handleState)
    }

    render() {
        const {list, inputValue} = this.state 
        const headerTip = !list || list.length === 0 ? '' : 'Just to do it'
        const footerTip = list && list.length >= 5 ? `你还有5个todo没完成，不要好高骛远` : ''

        return (
            <Fragment>
                <div className="inputWrap">
                    <Input className="input" value={inputValue} placeholder="What are you doing" onChange={this.handleChangeInput}/>
                    <Button className="button" type="primary" onClick={this.handleAddItem}>Add</Button>
                </div>

                <List
                    header={headerTip}
                    footer={footerTip}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => (
                        <List.Item onClick={this.handleDeleteItem.bind(this, index)} data-index={index} key={index}>
                            {item}
                        </List.Item>
                    )}
                />
            </Fragment>
        )
    }

    handleState() {
        let newState = store.getState()
        this.setState(newState)
    }
 
    handleDeleteItem(index) {
        store.dispatch(getDeleteItemAction(index))
    }

    handleChangeInput(e) {
        store.dispatch(getChangeInputAction(e.target.value))
    }

    handleAddItem(e){
        store.dispatch(getAddItemAction())
    }
}

export default TodoList