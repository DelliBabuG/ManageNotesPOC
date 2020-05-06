/* Package JSON Import will be here */
import React, { Component } from 'react';
/* Package JSON Import will be here */

/* Project Import will be here */
import Modal from 'react-modal'
import './home.css';
import NotesList from '../notesList';
import dataSource from '../dataSource';
/* Project Import will be here */

const customStyles = {
    content : {
      top                   : '30%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Home extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            notesList: [],
            isTakeNotesModal: false,
            notesTitle: "",
            notesContent: "",
            isNotesPined: false,
            editedNotesIndex: ""
        };
    }
    componentWillMount() {
            this.getNotesList();
    }

    getNotesList()
    {
        dataSource.getNotes().then((responseNotesList) => {
            if(responseNotesList.length > 0)
            {
                this.setState({
                    notesList: responseNotesList
                })
            }
        });
    }

    createNewNotes = () =>
    {
        this.setState({
            isTakeNotesModal: true
        });
    }

    saveOrUpdateNotes = () =>
    {
        if(this.state.notesTitle != "" && this.state.notesContent != "")
        {
            let notesDetails = "";
            if(this.state.editedNotesIndex === "" )
            {
                notesDetails = {
                    "title": this.state.notesTitle,
                    "notes": this.state.notesContent,
                    "isPined": this.state.isNotesPined
                };
                this.state.notesList.push(notesDetails);
            }
            else
            {
                let contentToEdit = this.state.notesList[this.state.editedNotesIndex];
                contentToEdit.title = this.state.notesTitle;
                contentToEdit.notes = this.state.notesContent;
                contentToEdit.isPined = this.state.isNotesPined;

            }
            this.saveUpdateDeleteNotes();
           
        }
        else
            alert("Make sure title and content could not empty")
    }

    saveUpdateDeleteNotes = () =>
    {
        dataSource.saveOrUpdateNotes(this.state.notesList).then((responseNotesList) => {
        this.getNotesList();
        this.cancelNotes();
        });
    }

    viewOrEditNotes = (notesIndex) =>
    {
        let selectedNotes = this.state.notesList[notesIndex];
        this.setState({
            notesTitle: selectedNotes.title,
            notesContent: selectedNotes.notes,
            isNotesPined: selectedNotes.isPined,
            editedNotesIndex: notesIndex,
            isTakeNotesModal: true
        });

    }
    cancelNotes = () =>
    {
        this.setState({
            notesTitle: "",
            notesContent: "",
            isNotesPined: false,
            isTakeNotesModal: false,
            editedNotesIndex: ""
        });
    }

    deleteNotes = () =>
    {
        this.state.notesList.splice(this.state.editedNotesIndex, 1);
        this.saveUpdateDeleteNotes();
    }

    render(){
        return(
            <div>
                <header className="header text-center">
                    <h1>Kross Keep</h1>
                </header>
                <div className="text-center">
                        <button onClick={ this.createNewNotes.bind(this) }> Take Notes </button>            
                </div>

                <div className="left-content pointer">
                    <NotesList totalNotesList={this.state.notesList} viewNotesContent={this.viewOrEditNotes} />
                </div>
                <div className="right-content">
                    <div>
                        <h4>Pinned Notes</h4>
                        {this.state.notesList.length > 0 && this.state.notesList.map((data, index) => 
                                data.isPined &&
                                <div className="notes-box"  onClick={this.viewOrEditNotes.bind(this, index)}>
                                    <div className="font-size-25 break-word">{data.title}</div>
                                    <p className="break-word">{data.notes}</p>
                                 </div>
                            )}
                    </div>
                    <div>
                        <h4>Other Notes</h4>
                            {this.state.notesList.length > 0 && this.state.notesList.map((data, index) => 
                                    !data.isPined &&
                                    <div className="notes-box" onClick={this.viewOrEditNotes.bind(this, index)}>
                                    <div className="font-size-25 break-word">{data.title}</div>
                                    <p className="break-word">{data.notes}</p>
                                 </div>
                            )}
                    </div>
                </div>


                <Modal
                    isOpen={this.state.isTakeNotesModal}
                    style={customStyles}>
                <div>
                    <h4>{this.state.editedNotesIndex === "" ? "Create Notes" : "Edit Notes"}</h4>
                    <input type="text" placeholder="Notes Title" value={this.state.notesTitle} onChange={ (event) => {
                        this.setState({notesTitle: event.target.value});}} />                
                    <textarea placeholder="Notes Content" value={this.state.notesContent} onChange={ (event) => {
                        this.setState({notesContent: event.target.value});}}/>

                    <input name="Make Notes Pined" type="checkbox" checked={this.state.isNotesPined} onChange={ () => { 
                        this.setState({ isNotesPined: !this.state.isNotesPined }) }} />

                    <button onClick={ this.saveOrUpdateNotes.bind(this) }> Save </button>
                    <button onClick={ this.cancelNotes.bind(this) }> Cancel </button>
                    {
                        this.state.editedNotesIndex !== "" &&
                        <button onClick={ this.deleteNotes.bind(this) }> Delete </button>
                    }
                </div>
                </Modal>
            </div>
           
        )
    }
}

export default Home;