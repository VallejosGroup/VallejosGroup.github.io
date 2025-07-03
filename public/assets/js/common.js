$(document).ready(function () {
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.secret").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".bibtex.secret").toggleClass("open");
  });
  $(".navbar-nav").find("a").removeClass("waves-effect waves-light");
});
