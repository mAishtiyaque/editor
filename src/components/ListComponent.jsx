import { Editable, Slate, withReact } from 'slate-react';
import { useCallback, useState, useMemo, useEffect,useRef } from 'react';
import Element from './common/Element';
import Leaf from './common/Leaf';
import Toolbar from './ToolBar/Toolbar';
import withLinks from './plugins/withLinks.js'
import withTables from './plugins/withTable.js'
import withEmbeds from './plugins/withEmbeds.js'
import { withHistory } from "slate-history";
import { createEditor, Transforms } from 'slate';
import Icon from "./common/Icon";

function ListComponent({ chats,deleteText}) {

    return (

        <div>
            <div className='speakers'>
                {chats.map((val, idx) => {
                    return (<BoxList key={val.id} val={val} idx={idx} chats={chats} deleteText={deleteText} />
                    )
                })
                }

            </div>
        </div>
    )
}

function BoxList({ val,idx,chats,deleteText }) {
    const [value, setValue] = useState(val.value);
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])
    const handleSetValue = (newVal) => {
        setValue(newVal)
        let tempArr=[...chats];
        tempArr[idx].value=newVal;
        //console.log(newVal)
        localStorage.setItem('editorChats', JSON.stringify(tempArr));
    }
    const editor = useMemo(() => withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))), []);
    const refSpeakerBox = useRef('');
    const [toolPitText,setToolPitText] =useState('');
    const handleSelection = () => {
        const text =  document.getSelection();
        if (text) {
            const textRect=text.getRangeAt(0).getBoundingClientRect();
            const speakerBoxRect=refSpeakerBox.current.getBoundingClientRect();
            //console.log(speakerBoxRect)
            if(speakerBoxRect.top<textRect.top && textRect.bottom<speakerBoxRect.bottom && textRect.width>2)
            setToolPitText(text.toString());
        }
    }
    useEffect(() => {
        document.addEventListener('selectionchange', handleSelection);
        return () => {
         document.removeEventListener('selectionchange', handleSelection);
        };
    },[]);
    const handleDeleteEditor = () => {
        deleteText(idx);
    }
    return (
        <div className="speaker_box"
        ref={refSpeakerBox}
        >
            <Slate 
                editor={editor}
                value={value}
                onChange={newValue => { handleSetValue(newValue) }}
            >
                <div className="toolbar speaker_toolbar">
                    <Toolbar editor={editor} className="speaker_toolbar" />
                    <span className='toolbar-grp'>
                    <button className="addNewText" onClick={handleDeleteEditor}>
                        <Icon icon={"delete"} />
                    </button>
                </span>
                </div>
                {toolPitText!=='' && <div className="tool_pit" style={{backgroundColor:`#11f${((idx+4)%9+1)}`}}>{toolPitText}</div>}
                <div 
                    className="editor-wrapper speaker_editor"
                    style={{ border: '1px solid #f3f3f3', padding: '0 10px' }}
                >
                    <div className='speaker_user'>@Speaker{idx+1}</div>
                    <Editable
                        placeholder='Write your Notes___'
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                    />
                
                </div>
                
            </Slate>
        </div>
    )
}

export default ListComponent;