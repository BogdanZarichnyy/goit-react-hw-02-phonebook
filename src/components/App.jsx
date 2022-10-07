import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from './PhoneBook/ContactForm';
import { Filter } from './PhoneBook/Filter';
import { ContactList } from './PhoneBook/ContactList';

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

    addName = event => {
        event.preventDefault();

        const { id, value: name } = event.target.elements.name;
        const { value: number } = event.target.elements.number;

        if (this.state.contacts.map(user => user.name).includes(name)) {
            alert(`${name} is already in contacts`);
            return;
        }

        this.setState(previousState => ({ contacts: [ ...previousState.contacts, { id, name, number }] }) );
    }

    findName = (event) => {
        this.setState({ filter: event.target.value.toLowerCase()});
    }

    deleteName = (id) => {
        this.setState(previousState => ({ contacts: previousState.contacts.filter(user => user.id !== id) } ));
    }

    render() {
        return (
            <div className="data">

                <h1>Phonebook</h1>

                <ContactForm addName={this.addName} nameInputId={this.nameInputId} />

                <h2>Contacts</h2>

                <Filter findName={this.findName} />

                <ContactList data={this.state} deleteName={this.deleteName} />

            </div>
        )
    }
};
