import { batch, useSelector } from "react-redux";
import { store } from "./store";
import { Contact } from "./contact";
import { setContactQueries, syncContact, useContact } from "./reducer";

export const useContactsByKeyValue = () => {
  return useSelector((state: any) => {
    return state.contacts.query['all'].map((key: string | number) => ({
      key,
      value: state.contacts.byKey[key].firstname.trim() + ' ' + state.contacts.byKey[key].lastname.trim()
    }))
    }
  );
};

export const SyncDataContacts = (
  contacts: Contact[],
  ids: string[]
) => {
  let newIds: string[] = [];

  for (let contact of contacts) {
    let id = contact.id.toString();
    if(!ids.includes(id))
      newIds.push(id);
  }

  batch(() => {
    syncContact(contacts);
    setContactQueries({
      all: [...ids, ...newIds],
    });
  });
};

export const removeContact = (id: string) => {
  const contactIds = store.getState()?.contacts?.query['all'] || [];
  let _listId: string[] = contactIds.filter(_id => _id !== id);

  batch(() => {
    setContactQueries({
      all: _listId,
    });
  });
};

