import React, { useState } from 'react';
import './App.css'

// TODO: add functionality to add/remove files/folders
function App() {
  return <div>
    {/* <Folder name="Desktop">
      <Folder name="C">
        <File name="dog.jpg" />
      </Folder>
      <Folder name="D">
        <File name="eel.png" />
        <File name="fish.png" />
        <File name="horse_sound.mp3" />
        <File name="cat.mp4" />
      </Folder>
    </Folder>
    <Folder name="Applications" />
    <File name="cat.jpg" /> */}
    <Folder name="/" />
  </div>
}

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpen: true,
      add_new: '',
      num: 1
    }
  }


  render() {
    // let [isOpen, setIsOpen] = useState(false);
    let { name, children } = this.props;
    let child = this.state.data;

    const handleExpandClick = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }

    const handleInput = (e) => {
      this.setState({ 'add_new': e })
    }

    const handleAddClickFolder = () => {
      var data = this.state.data
      var new_section = <Folder name={this.state.add_new} />
      data.push(new_section)
      this.setState({ 'data': data })
      handleInput('')
    }

    const handleAddClickFile = () => {
      var data = this.state.data
      var new_section = <File name={this.state.add_new} />
      data.push(new_section)
      this.setState({ 'data': data })
      handleInput('')
    }

    return <div>
      <span className='folder-info' onClick={handleExpandClick}>
        <i className={this.state.isOpen ? 'blue folder open outline icon' : 'blue folder icon'}></i>
        <i className={this.state.isOpen ? 'angle down icon' : 'angle right icon'}></i>
        {name}
      </span>
      <input value={this.state.add_new} onChange={(e) => handleInput(e.target.value)} type="text" />
      <span className='folder-add' title='Create new file' onClick={handleAddClickFile}>
        <i className='file icon' />
      </span>
      <span className='folder-add' title="Create new folder" onClick={handleAddClickFolder}>
        <i className='folder icon' />
      </span>
      {this.state.isOpen && child.map((it) => { return <div key={this.state.num++} className='folder-child'> {it} </div> })}
    </div>
  }
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
