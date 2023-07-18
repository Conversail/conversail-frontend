export enum EventsToServer {
  startPairing = "startPairing",
  cancelChatting = "cancelChatting",
  sendMessage = "sendMessage",
  startedTyping = "startedTyping",
  stoppedTyping = "stoppedTyping",
  reportMate = "reportMate",
  updateChatPreferences = "updateChatPreferences"
}

export enum EventsFromServer{
  paired = "paired",
  chatEnded = "chatEnded",
  incomingMessage = "incomingMessage",
  startedTyping = "startedTyping",
  stoppedTyping = "stoppedTyping",
  updatedChatPreferences = "updatedChatPreferences"
}
