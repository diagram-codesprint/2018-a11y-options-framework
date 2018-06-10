( function() {
  'use strict';

  chrome.storage.sync.get( [ 'primaryUser' ], function( data1 ) {
    let primaryUser = data1.primaryUser;
    chrome.storage.sync.get( [ primaryUser ], function( data2 ) {
      let preferenceStore = data2[ primaryUser ];
      cssEnactor.enact( preferenceStore, 'page' );
    } );
  } );

} )();