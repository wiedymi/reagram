import { createHook, createActionHook } from '../core'
import * as getters from '../getters'
import * as actions from '../actions'

export const getListOfChats = createHook(getters.getListOfChats)
export const getContacts = createHook(getters.getContacts)
export const getAvatar = createHook(getters.getFile)
export const getMe = createHook(getters.getMe)
export const getChatMessages = createHook(getters.getChatMessages)
export const sendTextMessage = createActionHook(actions.sendTextMessage)
export const playAudio = createActionHook(getters.getFile, 'updateFile')
export const createChannel = createActionHook(actions.createChannel)
export const createGroup = createActionHook(actions.createGroup)
