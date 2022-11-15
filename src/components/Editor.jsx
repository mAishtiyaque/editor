import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { createEditor } from 'slate';
import { Transforms } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from 'slate-react';
import Toolbar from './ToolBar/Toolbar'
import { sizeMap, fontFamilyMap } from './utils/SlateUtilityFunctions.js'
import withLinks from './plugins/withLinks.js'
import withTables from './plugins/withTable.js'
import withEmbeds from './plugins/withEmbeds.js'
import './Editor.css'
import Icon from "./common/Icon";

import Leaf from './common/Leaf';
import Element from './common/Element';

const SlateEditor = ({ addNewText }) => {
    const editor = useMemo(() => withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))), []);

    const [value, setValue] = useState([
        {
            type: 'paragaph',
            children: [{ text: '' }],
        },
    ]);

    const renderElement = useCallback(props => <Element {...props} />, [])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])
    const handleAddNewEditor = () => {
        addNewText(value);
    }

    return (
        <Slate editor={editor} value={value} onChange={newValue => { setValue(newValue) }} >
            <div className="toolbar">
                <Toolbar editor={editor} />
                <span className='toolbar-grp'>
                    <button className="addNewText" onClick={handleAddNewEditor}>
                        <Icon icon={"add"} />
                    </button>
                </span>
            </div>
            <div className="editor-wrapper" style={{ border: '1px solid #f3f3f3', padding: '0 10px' }}>
                <Editable
                    placeholder='Write your Notes___'
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            </div>
        </Slate>

    )
}

export default SlateEditor