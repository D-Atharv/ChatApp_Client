import { Reducer } from 'react';
import { Group, User,ProfileCardsState } from '../../../../../types/allTypes';

export type ProfileCardsAction =
  | { type: 'SET_GROUPS'; payload: Group[] }
  | { type: 'SET_FILTERED_GROUPS'; payload: Group[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_DROPDOWN' }
  | { type: 'SET_UPDATE_MODAL'; payload: { isOpen: boolean; selectedUser: User | null } }
  | { type: 'SET_ADD_USER_MODAL'; payload: boolean }
  | { type: 'TOGGLE_FLIP' }
  | { type: 'SET_IMAGE_MODAL'; payload: { isOpen: boolean; imageUrl: string | null; initials: string } }
  | { type: 'SET_SEARCH'; payload: { isActive: boolean; query: string } }
  | { type: 'SET_SELECTED_GROUP'; payload: string | null }
  | { type: 'CLOSE_MODALS' };


// Initial State
export const initialProfileCardsState: ProfileCardsState = {
  groups: [],
  filteredGroups: [],
  loading: true,
  error: null,
  dropdownOpen: false,
  isUpdateModalOpen: false,
  isAddUserModalOpen: false,
  selectedUser: null,
  flip: true,
  isImageModalOpen: false,
  modalImageUrl: null,
  modalInitials: '',
  isSearchActive: false,
  searchQuery: '',
  selectedGroupId: null,
};

export const profileCardsReducer: Reducer<ProfileCardsState, ProfileCardsAction> = (state, action) => {
  switch (action.type) {
    case 'SET_GROUPS':
      return {
        ...state,
        groups: action.payload,
        filteredGroups: action.payload,
      };
    case 'SET_FILTERED_GROUPS':
      return {
        ...state,
        filteredGroups: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'TOGGLE_DROPDOWN':
      return {
        ...state,
        dropdownOpen: !state.dropdownOpen,
      };
    case 'SET_UPDATE_MODAL':
      return {
        ...state,
        isUpdateModalOpen: action.payload.isOpen,
        selectedUser: action.payload.selectedUser,
        dropdownOpen: false,
      };
    case 'SET_ADD_USER_MODAL':
      return {
        ...state,
        isAddUserModalOpen: action.payload,
        dropdownOpen: false,
      };
    case 'TOGGLE_FLIP':
      return {
        ...state,
        flip: !state.flip,
      };
    case 'SET_IMAGE_MODAL':
      return {
        ...state,
        isImageModalOpen: action.payload.isOpen,
        modalImageUrl: action.payload.imageUrl,
        modalInitials: action.payload.initials,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        isSearchActive: action.payload.isActive,
        searchQuery: action.payload.query,
      };
    case 'SET_SELECTED_GROUP':
      return {
        ...state,
        selectedGroupId: action.payload,
        isSearchActive: false,
        searchQuery: '',
      };
    case 'CLOSE_MODALS':
      return {
        ...state,
        isUpdateModalOpen: false,
        isAddUserModalOpen: false,
        selectedUser: null,
      };
    default:
      return state;
  }
};

export const profileCardsActions = {
  setGroups: (groups: Group[]) => ({
    type: 'SET_GROUPS' as const,
    payload: groups,
  }),
  
  setFilteredGroups: (groups: Group[]) => ({
    type: 'SET_FILTERED_GROUPS' as const,
    payload: groups,
  }),
  
  setLoading: (loading: boolean) => ({
    type: 'SET_LOADING' as const,
    payload: loading,
  }),
  
  setError: (error: string | null) => ({
    type: 'SET_ERROR' as const,
    payload: error,
  }),
  
  toggleDropdown: () => ({
    type: 'TOGGLE_DROPDOWN' as const,
  }),
  
  setUpdateModal: (isOpen: boolean, selectedUser: User | null) => ({
    type: 'SET_UPDATE_MODAL' as const,
    payload: { isOpen, selectedUser },
  }),
  
  setAddUserModal: (isOpen: boolean) => ({
    type: 'SET_ADD_USER_MODAL' as const,
    payload: isOpen,
  }),
  
  toggleFlip: () => ({
    type: 'TOGGLE_FLIP' as const,
  }),
  
  setImageModal: (isOpen: boolean, imageUrl: string | null, initials: string) => ({
    type: 'SET_IMAGE_MODAL' as const,
    payload: { isOpen, imageUrl, initials },
  }),
  
  setSearch: (isActive: boolean, query: string) => ({
    type: 'SET_SEARCH' as const,
    payload: { isActive, query },
  }),
  
  setSelectedGroup: (groupId: string | null) => ({
    type: 'SET_SELECTED_GROUP' as const,
    payload: groupId,
  }),
  
  closeModals: () => ({
    type: 'CLOSE_MODALS' as const,
  }),
};

import { useReducer, useCallback } from 'react';

export const useProfileCardsReducer = () => {
  const [state, dispatch] = useReducer(profileCardsReducer, initialProfileCardsState);

  const actions = {
    setGroups: useCallback((groups: Group[]) => 
      dispatch(profileCardsActions.setGroups(groups)), []),
      
    setFilteredGroups: useCallback((groups: Group[]) => 
      dispatch(profileCardsActions.setFilteredGroups(groups)), []),
      
    setLoading: useCallback((loading: boolean) => 
      dispatch(profileCardsActions.setLoading(loading)), []),
      
    setError: useCallback((error: string | null) => 
      dispatch(profileCardsActions.setError(error)), []),
      
    toggleDropdown: useCallback(() => 
      dispatch(profileCardsActions.toggleDropdown()), []),
      
    setUpdateModal: useCallback((isOpen: boolean, selectedUser: User | null) => 
      dispatch(profileCardsActions.setUpdateModal(isOpen, selectedUser)), []),
      
    setAddUserModal: useCallback((isOpen: boolean) => 
      dispatch(profileCardsActions.setAddUserModal(isOpen)), []),
      
    toggleFlip: useCallback(() => 
      dispatch(profileCardsActions.toggleFlip()), []),
      
    setImageModal: useCallback((isOpen: boolean, imageUrl: string | null, initials: string) => 
      dispatch(profileCardsActions.setImageModal(isOpen, imageUrl, initials)), []),
      
    setSearch: useCallback((isActive: boolean, query: string) => 
      dispatch(profileCardsActions.setSearch(isActive, query)), []),
      
    setSelectedGroup: useCallback((groupId: string | null) => 
      dispatch(profileCardsActions.setSelectedGroup(groupId)), []),
      
    closeModals: useCallback(() => 
      dispatch(profileCardsActions.closeModals()), []),
  };

  return { state, actions };
};