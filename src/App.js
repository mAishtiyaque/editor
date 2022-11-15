import './App.css';
import Editor from './components/Editor';
import ListComponent from './components/ListComponent';
import Navbar from './components/Navbar';
import { useState } from 'react';

const initialState = JSON.parse(localStorage.getItem('editorChats')) || [];
function App() {
    const [chats, setChats] = useState(initialState);
    const addNewText = (value) => {
        let tempArr = [...chats];
        tempArr.push({ id: Date.now(), value })
        setChats(tempArr);
        localStorage.setItem('editorChats', JSON.stringify(tempArr));
    }
    const deleteText = (idx) => {
        let tempArr = [...chats];
        tempArr.splice(idx, 1);
        setChats(tempArr);
        localStorage.setItem('editorChats', JSON.stringify(tempArr));
    }

    return (
        <div className="App">
            <Navbar />
            <div className="container">
                <div className='internal_container'>
                    <Editor addNewText={addNewText} />
                    <ListComponent chats={chats} deleteText={deleteText} />
                </div>
            </div>
        </div>
    );
}

export default App;
