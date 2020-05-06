/* Package JSON Import will be here */
import React, { Component } from 'react';
/* Package JSON Import will be here */

class NotesList extends Component {

    constructor(props){
        super(props);
        this.state = {
            notesList: this.props.totalNotesList
        }
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            notesList: nextProps.totalNotesList
        });
    }

    render(){
        return(
            <div className="pointer">
                <h4>Notes List</h4>
                        {this.state.notesList.length > 0 && this.state.notesList.map((data, index) =>                    
                            <div onClick={ () => this.props.viewNotesContent(index) }>{data.title}</div>
                        )}
            </div>
        );
    }

}

export default NotesList