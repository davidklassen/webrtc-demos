var pc = new RTCPeerConnection();

// Signalling related API
pc.createOffer(function (offer) { /* process offer */ });
pc.createAnswer(function (answer) { /* process answer */ });
pc.setLocalDescription(description, successCallback, errorCallback);
pc.setRemoteDescription(description, successCallback, errorCallback);
pc.onicecandidate = function (event) { /* process candidate */ };

// Media API
pc.addStream(stream);
pc.onaddstream = function (stream) { /* process stream */ };
