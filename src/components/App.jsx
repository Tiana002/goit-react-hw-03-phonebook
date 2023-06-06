import { Component } from "react";
import { Container } from "./Details/Container.styled";
import { ContactForm } from "./Contacts/ContactForm";
import { GlobalStyle } from "./GlobalStyle";
import { Filter } from "./FilterContact/FilterContact";
import { ContactList } from "./ContactList/ContactList";
import initialContacts from "../contacts.json"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addNewContacts = (newContact) => {
    const { contacts } = this.state;   
    const duplicateName = contacts.map(el => el.name.toLowerCase());
    
    return duplicateName.includes(newContact.name.toLowerCase())
      ? Notify.info(`${newContact.name} is already in contacts.`)
      : this.setState(prevState => {
         
          return {
            contacts: [...prevState.contacts, newContact],
          };          
        });      
  };
    
  onDeleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };
 
  render() {
    const { filter } = this.state;

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSave={this.addNewContacts} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.getVisibleContact()}
          deleteContact={this.onDeleteContacts}
        />
        <GlobalStyle />
      </Container>
    );
  }

}