function get_svg_doc( id ) {
  var embed_svg = document.getElementById( id );
  return embed_svg ? embed_svg.contentDocument : null;
}

function reset_all_trophies_state() {
  var svg_doc = get_svg_doc( 'svg_obj' );
  var trophy = null;

  for ( var i = 0; i < 16; i++ ) {
    trophy = svg_doc.getElementById( 'trophy_' + i );
    if ( trophy ) {
      trophy.setAttribute( 'fill', '#9B9B9B' );
    }
  }
}

function reset_all_paths_states() {
  var svg_doc = get_svg_doc( 'svg_obj' );
  var line_ext = null;
  var line_int = null;
  
  for ( var i = 0; i < 16 ; ++i ) {
    line_ext = svg_doc.getElementById( 'line_ext_' + i ); 
    line_int = svg_doc.getElementById( 'line_int_' + i );
    if ( line_ext && line_int ) {
      // line_ext.setAttribute( 'fill', '#9B9B9B' );
      line_ext.setAttribute( 'fill', '#CBC7CC' );
      line_int.setAttribute( 'fill', '#CBC7CC' );
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
      // for FF & IE
      trophy.setAttribute( 'fill', '#FBD5A3' );
      // line_ext.setAttribute( 'fill', '#EE9D34' );
      line_ext.setAttribute( 'fill', '#FEAD43' );
      line_int.setAttribute( 'fill', '#FEAD43' );
    }
  }
  
  // active one!
  trophy = svg_doc.getElementById( 'trophy_' + active_index );
  if ( !trophy ) { 
    return; // no trophy we move out of here! 
  }
  
  trophy.setAttribute( 'fill', '#3271BF' );
}

function hide_all_panels() {
  var trophy = null;
  for ( var i = 0; i < 16; i++ ) {
    trophy = document.getElementById( 'trophy_' + i );
    if ( trophy ) {
      trophy.style.display = 'none'; // hide
    }
  }
}

function add_click_event() {
  var trophy = null;
  var svg_doc = get_svg_doc( 'svg_obj' );

  if ( svg_doc ) {
    for ( var i = 0; i < 16; i++ ) {
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

    anime( {
      targets: [ 
                'g#trophy_0', 
                'g#trophy_1', 
                'g#trophy_2', 
                'g#trophy_3', 
                'g#trophy_4', 
                'g#trophy_5', 
                'g#trophy_6', 
                'g#trophy_7', 
                'g#trophy_8', 
                'g#trophy_9', 
                'g#trophy_10', 
                'g#trophy_11', 
                'g#trophy_12', 
                'g#trophy_13', 
                'g#trophy_14', 
                'g#trophy_15',
                'h1' 
               ],
      translateX: [
        { value: 100, duration: 1200 },
        { value: 0, duration: 800 }
      ],
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 2000,
      loop: false
    } );
    
    
    // add trophies click event -> show price description panel
    add_click_event();
  }
}
