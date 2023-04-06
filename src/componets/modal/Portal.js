import React from 'react';
import * as ReactDOM from 'react-dom';



const portalRoot = document.getElementById('portal');

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        portalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        portalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}