function addLike(articleId) {
  // console.log(articleId)
  $.ajax({
    type: 'POST',
    url: `${document.location.origin}/likeArticle`,
    data: { id: articleId },
    success(data) {
      // console.log(data)

    },
  });

  const currentLikes = $('.like-counter').text();

  $('.like-counter').text(Number(currentLikes) + 1);
  // disable new clicks
  $('.like-ico').prop('onclick', null).off('click');
  $('.like-ico').addClass('stat-liked');
}
