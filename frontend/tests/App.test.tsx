import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import Layout from '../src/components/Layout';

it('Layout is rendered', () => {
    // Render Layout in the document
    const LayoutElement: Layout = TestUtils.renderIntoDocument(
        <Layout/>
    );

    const LayoutNode = ReactDOM.findDOMNode(LayoutElement);

    // Verify text content
    expect(LayoutNode.textContent).toEqual('Hello World!Foo to the barz');
});
