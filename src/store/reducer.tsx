import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import _ from 'lodash'
import { Contact } from "./contact";

type ContactState<T> = {
  byKey: Record<string, T>;
  query: Record<string, string[]>;
};

export const createReducers = <T extends {[x: string]: any}>(
  name: string,
  type: string,
  initialState: ContactState<T> = {byKey: {}, query: {}},
) => {
  const {actions, reducer} = createSlice({
    name,
    initialState: initialState,
    reducers: {
      syncData(state, action: PayloadAction<T[]>): ContactState<T> {
        console.log(action.payload, 'XX payload sync');
        return {
          ...state,
          byKey: {
            ...state.byKey,
            ..._.fromPairs(action.payload.map(item => [item[type], item]))
          },
        };
      },

      setQueries(state, action: PayloadAction<Record<string, string[]>>): ContactState<T> {
        console.log(action.payload, 'XX payload setQueries');
        return {
          ...state,
          query: {
            ...action.payload,
          },
        } as ContactState<T>;
      },

      reset(): ContactState<T> {
        return {
          ...initialState,
        } as ContactState<T>;
      },
    },
  });

  //tra ve contact co key la key
  const useContact  = (key?: string): T | undefined => {
    return useSelector((state: any) => state[name].byKey[key]);
  };

  const emptyArray: string[] = [];

  //tra ve array id cua contacts
  const useListId = (query: string = 'default'): string[] => {
    return useSelector((state: any) => state[name].query[query]) || emptyArray;
  };

  let _store: Store | undefined;
  const setContactStore = (store: Store) => {
    _store = store;
  };

  const _getStore = (): Store => {
    if (!_store) {
      throw new Error(
        'no setStore',
      );
    }
    return _store;
  };

  const syncContact = (items: T[]) => {
    return _getStore().dispatch(actions.syncData(items));
  };

  const setContactQueries = (queries: Record<string, string[]>) => {
    return _getStore().dispatch(actions.setQueries(queries));
  };

  const reset = () => {
    return _getStore().dispatch(actions.reset());
  };

  return { name, actions, reducer,
    syncContact, reset,
    useContact, useListId,
    setContactStore, setContactQueries,
  };
};

const initData = {
  byKey: {
    "lCUTs2": {
      id: "lCUTs2",
      firstname: "Lillie-Mai",
      lastname: "Allen",
      phone: ["0123456789", "0238761549"],
      email: ["@base.vn"],
      addr: ["Ha Noi, Viet Nam"],
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
    all: ["lCUTs2", "TXdL0c", "psg2PM", "1psg2PMewv","2psg2PMe","3psg2PMjyj", "Sky2", "Sky3"]
  }
};

export const {setContactStore, reducer, syncContact, useContact, useListId, setContactQueries} =
  createReducers<Contact>('contacts', 'id', initData);

