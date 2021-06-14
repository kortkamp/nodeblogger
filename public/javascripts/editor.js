let currentArticleId;
let postHeaderList;
let tokenExpireTime;

const apiServicePath = 'articles/';
const apiURL = `${document.location.origin}/api/`;

const defaultNewPost = {
  allow_commentary: true,
  status: 0,
  type: 0,
  views: 0,
  likes: 0,
  public: false,
  main_menu: false,

};

$(document).ready(() => {
  getAllItems();
});

// ####################### AJAX REQUESTS #############################

$.ajaxSetup({
  error(err) { console.log(err); },
});

function applyConfigs() {
  $.ajax({
    type: 'POST',
    url: `${document.location.origin}/updateCache/`,
    data: '',
    success(data) {
      console.log(data);
      setStatus(data);
    },
  });
}

function publishArticle() {
  const id = $('input[name="id"]').val();
  if (id) {
    $.ajax({
      type: 'POST',
      url: `${document.location.origin}/publishArticle/${id}`,
      data: '',
      success(data) {
        console.log(data);
        setStatus(data);
      },
    });
  } else {
    setStatus('You must save or select an article to publish');
  }
}
function defineHomepage() {
  const id = $('input[name="id"]').val();
  if (id) {
    const articleTitle = $('input[name="title"]').val();
    const homepage = String(articleTitle).toLowerCase().replace(/ /g, '-');

    // must test if page exists

    $.ajax({
      type: 'PUT',
      url: `${apiURL}configs/1`, // just one config file
      data: {
        homepage,
      },
      success(data) {
        console.log(data);
        setStatus(data);
      },
    });
  } else {
    setStatus('You must save or select an article to set as Homepage');
  }
}

function getAllItems() {
  $.getJSON(apiURL + apiServicePath,
    (data) => {
      // console.log(data)
      itemsList = data;
      const postContainer = $('ol.post-list');
      postContainer.html('');
      for (const item of itemsList) {
        // console.log(post.title)

        // identifier to be shown in items list
        const identifier = item.title || item.username || item.name || (`${item.parent_post} ${item.author}`);
        // let identifier = item.title?item.title:(item.username?item.username: item.parent_post + ' ' + item.author)
        postContainer.append(`<li class="post-item" id="post${item.id}" onclick="selectArticle(${item.id})"><cite>${item.id} <spam>${identifier}</spam></cite></li>`);
      }
    });
}

function getItem(id) {
  $.getJSON(apiURL + apiServicePath + id,
    (data) => {
      u_data = data;
      // console.log(u_data)
      putOnScreen(u_data);
    });
}

function deleteItem(id) {
  $.ajax({
    type: 'DELETE',
    url: apiURL + apiServicePath + id,
    data: '',
    success(data) {
      // console.log(data)
      setStatus(data);
      document.forms['new-article'].reset();
      getAllItems();
    },
  });
}

function createItem() {
  $.ajax({
    type: 'POST',
    url: apiURL + apiServicePath,
    data: $('#article-form').serialize(), // serializes the form's elements.
    success(data, textStatus, request) {
      // alert(request.getResponseHeader('new-token'));
      setStatus(data); //
      getAllItems();
      getItem(data.id);
    },
  });
}

function updateItem(id) {
  console.log('updating item');
  $.ajax({
    type: 'PUT',
    url: apiURL + apiServicePath + id,
    data: $('#article-form').serialize(), // serializes the form's elements.
    success(data, textStatus, request) {
      // alert(request.getResponseHeader('new-token'));
      setStatus(data); //
      getAllItems();
    },
  });
}

// ######################## MAIN MENU #################################

function newPost() {
  $(`#post${currentArticleId}`).removeClass('selected');
  $('input[name="id"]').prop('disabled', true);
  currentArticleId = undefined;
  document.forms['new-article'].reset();
  putOnScreen(defaultNewPost);
  // default fields
}

function savePost() {
  id = $('input[name="id"]').val();
  console.log(`got id to save :${id}`);
  if (id) {
    updateItem(id);
  } else {
    // must validate all mandatory fields
    createItem();
  }
}

function editPost() {
  $('textarea.input-field').show();
  $('.textarea-preview').hide();
  if (currentArticleId) {
    $('input[name="id"]').prop('disabled', false);
    getItem(currentArticleId);
  }
}

function deletePost() {
  // ask for confirmation
  if (currentArticleId) {
    askForConfirmation(() => {
      deleteItem(currentArticleId);
    }, `Confirm Delete Item: ${currentArticleId}`);
  } else { setStatus('Select an item to Delete'); }
}

// ######################## UI #################################

// fill form fields with 'data'
function putOnScreen(data) {
  const keys = Object.keys(data);
  document.forms['new-article'].reset();
  for (key of keys) { document.forms['new-article'][key].value = data[key]; }
}

function selectArticle(id) {
  currentArticleId = id;
  // class selected must highlight post
  $(`#post${id}`).addClass('selected');
  $(`#post${id}`).siblings().removeClass('selected');
}

function previewArticle() {
  $('.textarea-preview').html(marked($('textarea.input-field').val()));
  $('textarea.input-field').hide();
  $('.textarea-preview').show();
}

function setStatus(text) {
  $('label.status').text(text);
}

// ######################## CONFIRMATION #################################

let confirmationCallback;
// we must pass a function to be called when confirm true.
function askForConfirmation(callback, questionText) {
  confirmationCallback = callback;
  if (questionText) {
    $('.confirm-title').text(questionText);
  } else {
    $('.confirm-title').text('Confirm');
  }
  $('.confirm-container').show();
}
// must be called by button click to confirm
function confirmOperation(option) {
  if (option && confirmationCallback) { confirmationCallback(); }

  $('.confirm-container').hide();
  confirmationCallback = undefined;
}

// ############################# REVEW AUTH TOKEN ##############################
function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function setupTokenRenew() {
  const renewInterval = (tokenExpireTime - 5) * 1000;
  updateToken();
  const updateTokenIntervalId = setInterval(updateToken, renewInterval);
}

function updateToken() {
  // console.log('updating token')
  const currentToken = getCookie('x-access-token');

  $.post('/admin/refreshToken', { token: currentToken }, (data, textStatus) => {
    //   console.log(data)
    document.cookie = `x-access-token=${data.token}; path=/`;
  }, 'json');
}

function logoff() {
  document.cookie = 'x-access-token=; Max-Age=-99999999; path=/';
  console.log(document.cookie);
  document.location.href = '/admin';
}
