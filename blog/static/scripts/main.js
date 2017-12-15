$(function() {
  
  load_articles()

  // load all articles on page load
  function load_articles() {
    //console.log("loaded posts")
    $.ajax({
      url: "api/v1/articles/",
      type: "GET",
      success: function(json) {
        for (var i=0; i<json.length; i++) {
          $("#talk").prepend("<li id='post-"+json[i].id+"'><strong>"+json[i].title+"</strong><p>"+json[i].content+"</p><a href='' id='delete-"+json[i].id+"'>delete</a></li>");
        }
      },
      error: function(xhr, errmsg, err) {
        $('#results').html("<div class='alert-box alert radius' data-alert>We have encountered en error: "+errmsg+" <a href='#' class='close'>&times;</a></div>");
        console.log(xhr.status + ": " + xhr.responseText);
      }

  });
  };


  $('#article-form').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!");
    create_article();
  });

  $("#talk").on('click', 'a[id^=delete-]', function() {
    var article_pk = $(this).attr('id').split('-')[1];
    console.log(article_pk);
    delete_article(article_pk);
  });


  function create_article() {
    console.log("create post is working!")
    $.ajax({
      url: "api/v1/articles/",
      type: "POST",
      data: { title: $('#id_title').val(), content: $('#id_content').val()},
      success: function(json) {
        $('#id_title').val('');
        $('#id_content').val('');
        console.log(json);
        $("#talk").prepend("<li id='post-"+json.id+"'><strong>"+json.title+"</strong><p>"+json.content+"</p><a href='' id='delete-"+json.id+"'>delete</a></li>");
      },
      error: function(xhr, errmsg, err){
        $('#results').html("<div class='alert-box alert radius' data-alert>We have encountered en error: "+errmsg+" <a href='#' class='close'>&times;</a></div>");
        console.log(xhr.status + ": " + xhr.responseText);
      }
    });
  };

  function delete_article(article_pk) {
    if (confirm('Are you sure to remove this article?')==true) {
      console.log("inside delete article")
      $.ajax({
        url: "api/v1/articles/"+article_pk,
        type: "DELETE",
        data: { pk: article_pk },
        dataType: "json",
        success: function(json) {
          $('#post-'+article_pk).hide();
          console.log("deletion successful");
        },
        error: function(xhr, errmsg, err){
          $('#results').html("<div class='alert-box alert radius' data-alert>We have encountered en error: "+errmsg+" <a href='#' class='close'>&times;</a></div>");
          console.log(xhr.status + ": " + xhr.responseText);
        },
        done: function() {
          console.log("done in delete")
        },

      })
    } else {
      return false;
    }
  };

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i=0; i<cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

  function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTION|TRACE)$/.test(method));
  }

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });

});
