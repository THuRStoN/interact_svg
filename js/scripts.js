function get_svg_doc( id ) {
  var embed_svg = document.getElementById( id );
  return embed_svg ? embed_svg.contentDocument : null;
}

function reset_all_trophies_state() {
  var svg_doc = get_svg_doc( 'svg_obj' );

  for ( var i = 0; i < 15; i++ ) {
    t_id = 'trophy_' + i;
    trophy = svg_doc.getElementById( 'trophy_' + i );
    if ( trophy ) {
      trophy.style.fill = '9B9B9B'; // hide
    }
  }
}

/** 
 * Set current trophy as available (blue), others are grey and the path until that 
 * trophy is highlighted.
 */
function set_active_trophy( active_index ) {
  var svg_doc = get_svg_doc( 'svg_obj' );
  var trophy = svg_doc.getElementById( 'trophy_' + active_index );
  var line = null;

  if ( !trophy ) { 
    return; // no trophy we move out of here! 
  }
  trophy.style.fill = '3271BF';

  for ( var i = 0; i <= active_index; i++ ) {
    line = svg_doc.getElementById( 'line_' + i ); 
    if ( line ) {
      // line.style.fill
    }
  }
}

function hide_all_panels() {
  for ( var i = 0; i < 15; i++ ) {
    t_id = 'trophy_' + i;
    trophy = document.getElementById( 'trophy_' + i );
    if ( trophy ) {
      trophy.style.display = 'none'; // hide
    }
  }
}

function add_click_event() {
  var trophy = null;
  // var t_id = null;
  var svg_doc = get_svg_doc( 'svg_obj' );

  if ( svg_doc ) {
    for ( var i = 0; i < 15; i++ ) {
      // t_id = 'trophy_' + i;
      trophy = svg_doc.getElementById( 'trophy_' + i );
      if ( trophy ) {
        trophy.addEventListener( 'click', handle_click );
      }
    }
  }
}

function handle_click(e) {
  var node = e.currentTarget.id;
  
  hide_all_panels();
  // alert( node + ' was clicked' );
  document.getElementById( node ).style.display = 'block'; // show

}

/** execution entry point */
document.onreadystatechange = function () {
  var trophy_range = null;
  if ( document.readyState === 'complete' ) {
    trophy_range = document.getElementById( 'active_trophy_selector' );
    trophy_range.onchange = function () {
      console.log( trophy_range.value ); // value change
      reset_all_trophies_state();
      set_active_trophy( trophy_range.value );
    };
    add_click_event();
  }
}
