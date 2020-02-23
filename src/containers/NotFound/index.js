import React from 'react';

class NotFound extends React.Component {
    componentWillMount(){
        const {
            staticContext
        } = this.props
        staticContext && (staticContext.NOT_FOUND = true)
    }
    render(){
        return (
            <div>404, page not found</div>
        )
    }
}

export default NotFound