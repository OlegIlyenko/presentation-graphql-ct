$(function() {
  //var graphiqlUrl = "http://localhost:9000/graphiql"
  // var graphiqlUrl = "http://try.sangria-graphql.org/graphiql"
  var graphiqlUrl = "https://sangria-playground-1.herokuapp.com/graphiql" // because of the https
  var graphiqlZoom = 140

  var showHideCredits = function (currentSlide) {
    var section = $(currentSlide)

    var credit = section.data("credit")
    var link = section.data("image-link")

    var creditDiv = $("#credit")

    if (link) {
      creditDiv.empty()

      creditDiv.append($("<span class='credit-phote'>Photo:&nbsp;</span>"))

      if (credit) {
        creditDiv.append($("<span class='credit-credit'>" + credit + "&nbsp;</span>"))
      }

      if (link) {
        creditDiv.append($("<a href='" + link + "' target='_blank' class='credit-link'>" + link + "</span>"))
      }

      creditDiv.fadeIn(500)
    } else {
      creditDiv.fadeOut(500)
    }
  }

  Reveal.addEventListener( 'slidechanged', function( event ) {
    showHideCredits(event.currentSlide)
  });

  Reveal.addEventListener( 'ready', function( event ) {
    showHideCredits(event.currentSlide)
  });

  var initGraphiQL = function (selector) {
    selector.map(function (idx, elem) {
      var replaceElem = $(elem).parent().get(0)
      var vars = $(elem).data("vars")
      var varsParam = vars ? "variables=" +encodeURIComponent(vars) : "hideVariables=true"

      var query = null
      var resp = null

      if ($(elem).text().trim() != "") {
        var queryAndResp = $(elem).text().trim().split("// Response")
        query = queryAndResp[0].trim()
        resp = queryAndResp[1].trim()
      }


      $('<iframe src="' + graphiqlUrl +
        '?zoom=' + graphiqlZoom +
        '&query=' + (query ? encodeURIComponent(query) : '') +
        '&response=' + (resp ? encodeURIComponent(resp) : '') +
        '&' + varsParam + '" class="graphiql">').insertAfter(replaceElem)

      replaceElem.remove()
    })
  }              

  // var showGQLE = function (event) {
  //   if(event.currentSlide.className.indexOf("graphql-europe-slide") > -1) {
  //     $('#graphql-europe').fadeIn(1000);
  //   } else {
  //     $('#graphql-europe').fadeOut(300);
  //   }
  //
  //   if(event.currentSlide.className.indexOf("diversity-slide") > -1) {
  //     $('#diversity').fadeIn(1000);
  //   } else {
  //     $('#diversity').fadeOut(300);
  //   }
  // }

  // Reveal.addEventListener('slidechanged', showGQLE)
  // Reveal.addEventListener('ready', showGQLE)

  initGraphiQL($("pre code.graphiql"))
})