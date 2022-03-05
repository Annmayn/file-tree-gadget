import React, { useState } from 'react';
import './App.css'

function App() {
  return <div>
    <Folder key="null" name="/" />
  </div>
}

const Folder = (props) => {
  const [state, setState] = useState({
    data: [],
    isOpen: true,
    name: '',
  })

  const handleExpandClick = () => {
    setState(prevState => ({ ...prevState, isOpen: !state.isOpen }));
  }

  const handleInput = (e) => {
    setState(prevState => ({ ...prevState, "name": e }))
  }

  const handleClickAddFolder = () => {
    const new_section = { type: "folder", name: state.name }
    setState(prevState => ({ ...prevState, data: [...prevState.data, new_section], num: prevState.num++ }))
    handleInput('')
  }

  const handleClickAddFile = () => {
    let new_section = { type: "file", name: state.name }
    setState(prevState => ({ ...prevState, data: [...prevState.data, new_section] }))
    handleInput('')
  }


  return <div>
    <span className='folder-info' onClick={handleExpandClick}>
      <i className={state.isOpen ? 'blue folder open outline icon' : 'blue folder icon'}></i>
      <i className={state.isOpen ? 'angle down icon' : 'angle right icon'}></i>
      {props.name}
    </span>
    <input value={state.name} onChange={(e) => handleInput(e.target.value)} type="text" />
    <span className='folder-add' title='Create new file' onClick={handleClickAddFile}>
      <i className='file icon' />
    </span>
    <span className='folder-add' title="Create new folder" onClick={handleClickAddFolder}>
      <i className='folder icon' />
    </span>
    {
      state.isOpen &&
      state.data.map((datum, index) => {
        return <div key={index} className='folder-child'>
          {datum.type == "folder" ? <Folder name={datum.name} /> : <File name={datum.name} />}
        </div>
      }
      )
    }
  </div>

}

const File = (props) => {
  const iconMap = {
    png: 'file image outline icon',
    jpg: 'file image outline icon',
    jpeg: 'file image outline icon',
    mp3: 'headphones icon',
    mp4: 'video icon',
    default: 'file icon'
  }
  const extension = props.name ? props.name.split('.').pop() : 'default'
  return <h4><i className={iconMap[extension]}></i>{props.name}</h4>
}

export default App;
