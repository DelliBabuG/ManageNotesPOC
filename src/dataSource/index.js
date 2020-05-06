
/* Package JSON Import will be here */
import React, { Component } from 'react';
/* Package JSON Import will be here */

export default class DataSource extends Component
{

    static saveOrUpdateNotes(notesList)
    {
        return fetch("https://api.myjson.com/bins/mrbwj",{
            headers: {
                'Content-Type': 'application/json'
                },
            method: "PUT",
            body: JSON.stringify(notesList)
            }).then( (responseJson) => {
                return true;
        }).catch(error => {
            return false;
        });
    };

    static getNotes()
    {
        return fetch("https://api.myjson.com/bins/mrbwj").then( (response) => {
                return response.json();
            }).catch(error => {
                return [];
            });
    };
}