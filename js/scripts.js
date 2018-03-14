function get_svg_doc( id ) {
  var embed_svg = document.getElementById( id );
  return embed_svg ? embed_svg.contentDocument : null;
}

function reset_all_trophies_state() {
  var svg_doc = get_svg_doc( 'svg_obj' );

  for ( var i = 0; i < 15; i++ ) {
    // t_id = 'trophy_' + i;
    trophy = svg_doc.getElementById( 'trophy_' + i );
    if ( trophy ) {
      trophy.style.fill = '9B9B9B'; // hide
    }
  }
}

function reset_all_paths_states() {
  var svg_doc = get_svg_doc( 'svg_obj' );
  var line_ext = null;
  var line_int = null;
  
  for ( var i = 0; i < 15 ; ++i ) {
    line_ext = svg_doc.getElementById( 'line_ext_' + i ); 
    line_int = svg_doc.getElementById( 'line_int_' + i );
    if ( line_ext && line_int ) {
      line_ext.style.fill = '9B9B9B';
      line_int.style.fill = 'CBC7CC';
    }
  }
}

/** 
 * Set current trophy as available (blue), others are grey and the path until that 
 * trophy is highlighted.
 */
function set_active_trophy( active_index ) {
  var svg_doc = get_svg_doc( 'svg_obj' );
  var trophy = null;
  var line_ext = null;
  var line_int = null;
  
  for ( var i = 0; i <= active_index; i++ ) {
    trophy = svg_doc.getElementById( 'trophy_' + i );
    line_ext = svg_doc.getElementById( 'line_ext_' + i ); 
    line_int = svg_doc.getElementById( 'line_int_' + i );
    if ( trophy && line_ext && line_int ) {
      trophy.style.fill = 'FBD5A3';
      line_ext.style.fill = 'EE9D34';
      line_int.style.fill = 'FEAD43';
    }
  }
  
  // active one!
  trophy = svg_doc.getElementById( 'trophy_' + active_index );
  if ( !trophy ) { 
    return; // no trophy we move out of here! 
  }
  trophy.style.fill = '3271BF';

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
      reset_all_paths_states();
      set_active_trophy( trophy_range.value );
    };
    
    // default trophy
    set_active_trophy( trophy_range.value );
    
    // add trophies click event -> show price description panel
    add_click_event();
  }
}
