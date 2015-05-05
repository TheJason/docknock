
    var chatRef = new Firebase('https://scorching-torch-7528.firebaseio.com'),
        target = document.getElementById("firechat-container"),
        authModal = $('#auth-modal').modal({ show: false }),
        chat = new FirechatUI(chatRef, target);
    chat.on('auth-required', function() {
      authModal.modal('show');
      return false;
    });
    chatRef.onAuth(function(authData) {
      if (authData) {
        var userId = authData.uid,
            username = authData[authData.provider].displayName;
        chat.setUser(userId, username);
        $('#user-name').text(username);
        $('#user-info').show();
        setTimeout(function() {
          chat._chat.enterRoom('-Iy1N3xs4kN8iALHV0QA')
        }, 500);
      } else {
        $('#user-info').hide();
        chat._chat.enterRoom('-Iy1N3xs4kN8iALHV0QA')
      }
    });
    function login(provider) {
      authModal.modal('hide');
      chatRef.authWithOAuthPopup('twitter' /* or 'facebook', 'github, 'persona', 'password' */, function(error, authData) {
  if (error) {
    console.log(error);
  }
});
    }
    function logout() {
      chatRef.unauth();
      location.reload();
    }
