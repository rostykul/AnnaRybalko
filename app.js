var UnderLineCurId = "#a";
var lastDateRequested = localStorage.getItem("lastDateRequested");
var today = new Date();
const idToLetter = {
  Home: "#a",
  About: "#b",
  Contact: "#c",
};
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

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function AffirmRequest(date) {
  if (
    !lastDateRequested ||
    new Date().getTime() - parseInt(lastDateRequested) > 86400000
  ) {
    $("#Notif-question").text(
      `Are you sure you want to request an appointment on\n\n${date.toDateString()} @${formatAMPM(
        date
      )}?`
    );
    $("#Notif-yes").css("display", "flex");
    $("#Notif-no").css("display", "flex");
    $("#Notif-no").text("No");
  } else {
    $("#Notif-question").text(
      `You already sent a request within the past 24 hours.`
    );
    $("#Notif-yes").css("display", "none");
    $("#Notif-no").css("display", "flex");
    $("#Notif-no").text("OK");
  }
  $("#Notif").css("display", "flex");
}
function AffirmYes() {
  $("#Notif-question").text("Sending...");
  $("#Notif-yes").css("display", "none");
  $("#Notif-no").css("display", "none");
  setTimeout(() => {
    $("#Notif-question").text("Your request was sent!");
    $("#Notif-no").css("display", "flex");
    $("#Notif-no").text("OK");
    var newDate = new Date();
    localStorage.setItem("lastDateRequested", newDate.getTime());
    lastDateRequested = newDate.getTime() + "";
  }, 2000);
}
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idName = entry.target.id;
        MoveUnderline(idToLetter[idName]);
        console.log(idName);
      }
    });
  },
  { threshold: 0.7 }
);
observer.observe(document.querySelector("#Home"));
observer.observe(document.querySelector("#About"));
observer.observe(document.querySelector("#Contact"));
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
  $("#Request").click(function () {
    var email = $("#email").val(),
      date = datepicker.getDate();
    var invalid_email = !validateEmail(email),
      invalid_date = !date;
    // console.log(date.toDateString());
    $("#invalid-email").css("display", "none");
    $("#invalid-date").css("display", "none");
    if (invalid_email) {
      $("#invalid-email").css("display", "inline");
    }
    if (invalid_date) {
      $("#invalid-date").css("display", "inline");
    }
    if (!invalid_email && !invalid_date) {
      AffirmRequest(date);
    } else {
      $("#Request").css("animation", "shake 0.2s linear");
      setTimeout(() => $("#Request").css("animation", ""), 300);
    }
    // $.ajax({
    //   url: "https://formspree.io/xknqeoql",
    //   method: "POST",
    //   data: { message: "hello!" },
    //   dataType: "json",
    // }).done(function (response) {
    //   console.log(response); // if you're into that sorta thing
    // });
  });
  $("#Notif-no").click(function () {
    $("#Notif").css("display", "none");
  });
  $("#Notif-yes").click(function () {
    AffirmYes();
  });
  $("#datepicker-input").click(function () {
    $("#datepicker-input").blur();
  });
  $("#home-left").click(function () {
    $("#home-child").css("margin-left", "0%");

    $("#home-right").css("opacity", "1");
    $("#home-right").css("transform", "translateY(0px)");
    $("#home-right").css("cursor", "pointer");
    $("#home-left").css("opacity", "0.3");
    $("#home-left").css("transform", "translateY(10px)");
    $("#home-left").css("cursor", "auto");
  });
  $("#home-right").click(function () {
    $("#home-child").css("margin-left", "-100%");

    $("#home-left").css("opacity", "1");
    $("#home-left").css("transform", "translateY(0px)");
    $("#home-left").css("cursor", "pointer");
    $("#home-right").css("opacity", "0.3");
    $("#home-right").css("transform", "translateY(10px)");
    $("#home-right").css("cursor", "auto");
  });

  $("#about-left").click(function () {
    $("#about-child").css("margin-left", "0%");

    $("#about-right").css("opacity", "1");
    $("#about-right").css("transform", "translateY(0px)");
    $("#about-right").css("cursor", "pointer");
    $("#about-left").css("opacity", "0.25");
    $("#about-left").css("transform", "translateY(10px)");
    $("#about-left").css("cursor", "auto");
  });
  $("#about-right").click(function () {
    $("#about-child").css("margin-left", "-100%");

    $("#about-left").css("opacity", "1");
    $("#about-left").css("transform", "translateY(0px)");
    $("#about-left").css("cursor", "pointer");
    $("#about-right").css("opacity", "0.25");
    $("#about-right").css("transform", "translateY(10px)");
    $("#about-right").css("cursor", "auto");
  });
});
