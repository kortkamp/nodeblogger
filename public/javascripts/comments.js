function validateSubmit() {
  commentValidate = validateComment(document.forms['new-comment'].comment.value);
  emailValidation = validateEmail(document.forms['new-comment'].email.value);
  nameValidation = validateName(document.forms['new-comment'].author.value);

  result = commentValidate && emailValidation && nameValidation;
  return (result);
}

function validateComment(comment) {
  // console.log(comment)
  if (comment) { return true; }
  $('.comment-textarea').css('border', '1px solid red');
  return false;
}

function validateName(name) {
  if (name) { return true; }
  $('.comment-form-name').css('border', '1px solid red');
  return false;
}
function validateEmail(email) {
  if (email) {
    if (email.split('@')) {
      if (email.split('@').length == 2) {
        if (email.split('@')[1].split('.')) {
          if (email.split('@')[1].split('.').length > 1) {
            return (true);
          }
        }
      }
    }
  }
  $('.comment-form-email').css('border', '1px solid red');
  return false;
}

function formatDateTime(dateTime) {
  formatedDateTime = dateTime;
  return (formatedDateTime);
}
