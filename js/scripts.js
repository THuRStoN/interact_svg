function add_click_event() {
  var trophy = null;
  var t_id = null;
  
  var embed_svg = document.getElementById( 'svg_obj' );
  var svg_doc = null;

  if ( embed_svg ) {
    svg_doc = embed_svg.contentDocument;

    for (var i = 0; i < 15; i++ ) {
      t_id = 'trophy_' + i;
      trophy = svg_doc.getElementById( 'trophy_' + i );
      if ( trophy ) {
        trophy.addEventListener( 'click', handle_click );
      }
    }
  }
}

function handle_click(e) {
  // this should be the element
  alert( e.currentTarget.id + ' was clicked' );

}
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    add_click_event();
  }
}
