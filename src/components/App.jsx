import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            contacts: [
                {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
                {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
                {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
                {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
            ],
            filter: '',
        }
    }

    nameInputId = () => {
        return nanoid();
    }

    handleAddName = event => {
        event.preventDefault();

        const { id, value: name } = event.target.elements.name;
        const { value: number } = event.target.elements.number;

        if (this.state.contacts.map(user => user.name).includes(name)) {
            alert(`${name} is already in contacts`);
            return;
        }

        this.setState(previousState => ({ contacts: [ ...previousState.contacts, { id, name, number }] }) );
    }

    handleFindName = (event) => {
        this.setState({ filter: event.target.value.toLowerCase()});
    }

    handleDeleteName = (id) => {
        this.setState(previousState => ({ contacts: previousState.contacts.filter(user => user.id !== id) } ));
    }

    render() {
        return (
            <div className="data">

                <h1>Phonebook</h1>

                <ContactForm addName={this.handleAddName} nameInputId={this.nameInputId} />

                <h2>Contacts</h2>

                <Filter findName={this.handleFindName} />

                <ContactList data={this.state} deleteName={this.handleDeleteName} />

            </div>
        )
    }
};
