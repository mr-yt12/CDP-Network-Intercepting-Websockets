const version = '1.3';

function onAttach(debuggeeId) {
  chrome.debugger.sendCommand(debuggeeId, 'Network.enable');
}

function allEventHandler(debuggeeId, message, params) {
  if (message == 'Network.webSocketFrameSent') {
    readSockets('sent', params, debuggeeId);
  } else if (message == 'Network.webSocketFrameReceived') {
    readSockets('received', params, debuggeeId);
  }
}

function readSockets(direction, params, debuggeeId) {
  console.log(direction, params, params.response.payloadData);
}

chrome.action.onClicked.addListener(function (tab) {
  var tabId = tab.id;
  var debuggeeId = { tabId: tabId };
  chrome.debugger.attach(debuggeeId, version, onAttach.bind(null, debuggeeId));
});

chrome.debugger.onEvent.addListener(allEventHandler);
