$(document).ready(function() {
  var responseData = {},
    isEdit = false;

  $('#upsert-modal').hide();

  function ajaxSend(ext, type, payload, callback) {
    $.ajax(ext, {
      method: type,
      data: payload,
      error: function(xhr, status, error) {
        ajaxSend('/log/', 'POST', error, null);
      },
      success: function(data, response, e) {
        responseData = data;
        callback()
      }
    })
  }

  function showForm() {
    $(".story-manager-container").fadeOut("slow", function() {
      $(".upsert-form-container").fadeIn("slow", function() {});
    });
  }

  function hideForm() {
    $(".upsert-form-container").fadeOut("slow", function() {
      $(".story-manager-container").fadeIn("slow", function() {});
    });
  }

  function populateForm() {
    $('#type').val(responseData.type);
    $('#id').val(responseData._id);
    $('#content').val(responseData.content);
    showForm();
  }

  $('.delete-segment').on('click', function(e) {
    $(this).closest("tr").fadeOut();
    ajaxSend('/story/' + $(this).data("segment-id"), 'DELETE', null, null);
  });

  $("#form-btn-upsert").on('click', function(e) {
    e.preventDefault();
    var payload = {
      id: ((isEdit) ? $('#id').val() : null),
      content: $('#content').val(),
      type: $('#type').val()
    };
    ajaxSend('/story', 'POST', payload, hideForm);
  });

  $("#add-btn").on('click', function(e) {
    isEdit = false;
    showForm();
  });

  $('.edit-segment').on('click', function(e) {
    e.preventDefault();
    isEdit = true;
    showForm();
    ajaxSend('/story/' + $(this).data("segment-id"), 'GET', null, populateForm);
  });

  $('.upsert-modal-close-btn').on('click', function() {
    hideForm();
  });
});
