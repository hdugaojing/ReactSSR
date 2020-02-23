import React from 'react';
import {connect} from 'react-redux'
import {getTranslationList} from './store/actions'
import {Redirect} from 'react-router-dom'

class Translation extends React.Component {
    componentDidMount(){
        if(!this.props.list.length){
            this.props.getTranslationList()
        }
    }
    getList(){
        const {list} = this.props
        return list.map((item) => 
            <div key={item.id}>{item.title}</div>
        )
    }
    render(){
        return this.props.login ? (
            <div>
                {this.getList()}
            </div>
        ): <Redirect to='/'/>
    }
}
const mapStateToProps = state => ({
    list: state.translation.translationList,
    login:state.header.login
})

const mapDispatchToProps = {
    getTranslationList
}

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(Translation)
ExportTranslation.loadData = (store) => {
    return store.dispatch(getTranslationList())
}
export default ExportTranslation