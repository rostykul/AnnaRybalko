var UnderLineCurId = "#a";
var PageId = 1;

var today = new Date();
var datepicker = new tui.DatePicker("#wrapper", {
  date: new Date(),
  input: {
    element: "#datepicker-input",
    format: "yyyy-MM-dd HH:mm A",
  },
  timePicker: {
    layoutType: "tab",
    inputType: "spinbox",
    initialHour: 12,
    initialMinute: 00,
  },
  selectableRanges: [
    [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
    ],
  ],
  autoClose: false,
});

var MoveUnderline = (id) => {
  UnderLineCurId = id;
  var position = $(UnderLineCurId).position();
  $(".UnderLine").css("left", position.left + "px");
  $(".UnderLine").css("width", $(UnderLineCurId).width() + "px");
};

$(function () {
  $("#a").click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#Home").offset().top - 80,
      },
      30
    );
  });
  $("#b").click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#About").offset().top - 80,
      },
      30
    );
  });
  $("#c").click(function () {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#Contact").offset().top - 80,
      },
      30
    );
  });
  $(".Logo").click(function () {
    $("#a").trigger("click");
  });
  $(window).resize(function () {
    var position = $(UnderLineCurId).position();
    $(".UnderLine").css("left", position.left + "px");
  });
  $(document).ready(function () {
    MoveUnderline("#a");
    $(this).scrollTop(0);
  });
  $(window).scroll(function () {
    var window_top = $(window).scrollTop();
    var difference = Math.abs($("#Home").offset().top - window_top);
    if (difference < 150) {
      MoveUnderline("#a");
      return;
    }
    difference = Math.abs($("#About").offset().top - window_top);
    if (difference < 150) {
      MoveUnderline("#b");
      return;
    }
    difference = Math.abs($("#Contact").offset().top - window_top);
    if (difference < 150) {
      MoveUnderline("#c");
      return;
    }
  });
  $("#Request").click(function () {
    console.log($("#email").val());
    console.log(datepicker.getDate());
    // $.ajax({
    //   url: "https://formspree.io/xknqeoql",
    //   method: "POST",
    //   data: { message: "hello!" },
    //   dataType: "json",
    // }).done(function (response) {
    //   console.log(response); // if you're into that sorta thing
    // });
    $("#Notif").css("display", "flex");
  });
  $("#Notif-no").click(function () {
    $("#Notif").css("display", "none");
  });
  $("#Notif-yes").click(function () {
    $("#Notif").css("display", "none");
  });
  $("#datepicker-input").click(function () {
    $("#datepicker-input").blur();
  });
});
