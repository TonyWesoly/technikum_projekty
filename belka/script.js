window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").style.height = "50px";
    document.getElementById("header").style.lineHeight = "50px";
    document.getElementById("1").style.marginTop = "15px";
    document.getElementById("2").style.marginTop = "15px";
  } else {
    document.getElementById("header").style.height = "150px";
    document.getElementById("header").style.lineHeight = "150px";
    document.getElementById("1").style.marginTop = "60px";
    document.getElementById("2").style.marginTop = "60px";

  }
}

function click(a)
{
	document.getElementById("l" + a).click;
}