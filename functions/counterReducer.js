import {createSlice} from '@reduxjs/toolkit';
import DBquery from './DBquery';

let storage = new DBquery();
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: '',
    getQuestList: '',
    questValue: '',
    questName: '',
    questTypeList: '',
    deleteState: false,
    questoes: [],
    materia: [],
  },
  reducers: {
    changeQuestList: (state, actions) => {
      state.getQuestList = actions.payload;
    },

    //Criar um novo tipo de quest
    createQuest: state => {
      state.questName.trim() !== ''
        ? storage.createNewQuestType(undefined, state.questName)
        : alert('Add a new name');
    },

    //Criar um novo objeto
    setQuestObject: (state, actions) => {
      state.questName = actions.payload;
    },
    //Para resgatar a lista dos tipos dos quests

    getQuestObjects: (state, actions) => {
      state.questTypeList = actions.payload;
    },
    //Para atualizar o tipo de quest
    updateQuest: (state, actions) => {
      storage.createNewQuestType(actions.payload, state.questName);
    },

    deleteQuestState: (state, actions) => {
      actions.payload != undefined
        ? (state.deleteState = actions.payload)
        : (state.deleteState = !state.deleteState);
    },

    updateQuestoes: (state, actions) => {
      state.questoes = storage.getQuests('questoes');
    },
    updateMateria: state => {
      state.materia = state.questoes.map(({id, value}) => ({id, value}));
    },
  },
});

export const {
  changeQuestList,
  createQuest,
  setQuestObject,
  getQuestObjects,
  updateQuest,
  deleteQuestState,
  updateMateria,
  updateQuestoes,
} = counterSlice.actions;

export default counterSlice.reducer;
