import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import Layout from "./components/Layout";

const rootEl = document.getElementById("root");

render(
    <AppContainer>
        <Layout/>
    </AppContainer>,
    rootEl
);

declare let module: { hot: any };

if (module.hot) {
    module.hot.accept("./components/Layout", () => {
        const LayoutDefault = require("./components/Layout").default;
        render(
            <AppContainer>
                <LayoutDefault/>
            </AppContainer>,
            rootEl
        );
    });
}
