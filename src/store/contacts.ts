import { createDynamicReducer } from "../utils/createDynamicReducer";
import { Contact } from "../utils/contact";
import { batch, useSelector } from "react-redux";
import { store } from "./index";

const initData = {
  byKey: {
    "lCUTs2": {
      id: "lCUTs2",
      firstname: "Lillie-Mai",
      lastname: "Allen",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Lillie-Mai Allen",
      note: ""
    },
    "TXdL0c": {
      id: "TXdL0c",
      firstname: "Emmanuel",
      lastname: "Goldstein",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Emmanuel Goldstein",
      note: ""
    },
    "psg2PM": {
      id: "psg2PM",
      firstname: "Winston",
      lastname: "Smith",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Winston Smith",
      note: ""
    },
    "1psg2PMewv": {
      id: "1psg2PMewv",
      firstname: "Abc",
      lastname: "Smith",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Abc Smith",
      note: ""
    },
    "2psg2PMe": {
      id: "2psg2PMe",
      firstname: "Xyz",
      lastname: "Smith",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Xyz Smith",
      note: ""
    },
    "3psg2PMjyj": {
      id: "3psg2PMjyj",
      firstname: "Sky",
      lastname: "Smith",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Sky Smith",
      note: ""
    },
    "Sky2": {
      id: "Sky2",
      firstname: "Sky",
      lastname: "Smith Sky",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Sky Smith Sky",
      note: ""
    },
    "Sky3": {
      id: "Sky3",
      firstname: "Sky3 ",
      lastname: "Smith Sky",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
      birthday: "",
      company: "Base.vn",
      value: "Sky Sky3 ",
      note: ""
    }
  },
  query: {
    all: ["lCUTs2", "TXdL0c", "psg2PM", "1psg2PMewv", "2psg2PMe", "3psg2PMjyj", "Sky2", "Sky3"]
  }
};

export const {
  reducer,
  useByKey,
  useKeysByQuery,
  getByKey,
  getKeysByQuery,
  setStore,
  sync, setQueries, reset
} = createDynamicReducer<Contact>("contacts", "id", initData);

export const useContact = useByKey;
export const syncContacts = sync;
export const setContactQueries = setQueries;
export const useListId = useKeysByQuery;
export const setContactStore = setStore;

export const useContactsByKeyValue = () => {
  return useSelector((state: any) => {
      return state.contacts.query["all"].map((key: string | number) => ({
        key,
        value: state.contacts.byKey[key].firstname.trim() + " " + state.contacts.byKey[key].lastname.trim()
      }));
    }
  );
};

export const syncDataContacts = (
  contacts: Contact[],
  ids: string[]
) => {
  let newIds: string[] = [];

  for (let contact of contacts) {
    let id = contact.id.toString();
    if (!ids.includes(id))
      newIds.push(id);
  }

  batch(() => {
    syncContacts(contacts);
    setContactQueries({
      all: [...ids, ...newIds]
    });
  });
};

export const removeContact = (id: string) => {
  const contactIds = store.getState()?.contacts?.query["all"] || [];
  let _listId: string[] = contactIds.filter(_id => _id !== id);

  batch(() => {
    setContactQueries({
      all: _listId
    });
  });
};

export const syncToMyCompany = (contactIds: string[]) => {
  const oldCompany = getKeysByQuery('company') || []
  setContactQueries({
    company: [...new Set([...oldCompany,...contactIds])]
  })
}

export const useMyCompany = () => {
  return useKeysByQuery('company') || []
}
