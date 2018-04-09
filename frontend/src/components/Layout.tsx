import * as React from "react";
import * as css from './Layout.scss';

export default class Layout extends React.Component {
    render() {
        return (
            <div className={ 'app' }>
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
            </div>
        );
    }
}
