( function() {


  window.persistence = {};

  persistence.controlIds = {
    filename: "persistence-filename",
    save: "persistence-save",
    load: "persistence-load"
  };

  persistence.controlMarkup =
    `
<fieldset>
    <legend>
        Persistence
    </legend>
    <label for="${persistence.controlIds.filename}">File Name</label>
    <input id="${persistence.controlIds.filename}" name="fileName" />
    <button id="${persistence.controlIds.save}" name="save">Save</button>
    <button id="${persistence.controlIds.load}" name="load">Load</button>
</fieldset>
`;

  persistence.appendControlMarkup = function( controlAreaSelector ) {
    let controlArea = document.querySelector( controlAreaSelector );
    controlArea.innerHTML = persistence.controlMarkup;
    persistence.bindControls();
  };

  persistence.bindControls = function() {
    let saveButton = document.querySelector( "#" + persistence.controlIds.save );
    let loadButton = document.querySelector( "#" + persistence.controlIds.load );

    saveButton.onclick = persistence.save;
    loadButton.onclick = persistence.load;
  };

  // {boolean} we are running in the chrome extension, so provide different safe load logic
  let inChromeExtension = window.location.search.indexOf( 'extension' ) >= 0;

  persistence.save = function() {
    console.log( "persistence.save" );

    let filename = document.querySelector( "#" + persistence.controlIds.filename ).value;


    if ( !inChromeExtension ) {
      let req = new XMLHttpRequest();
      req.open( "POST", "/preferences" );
      req.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );


      let saveDetails = {
        filename: filename,
        preferences: preferenceStore
      };

      let saveDetailsAsJSON = JSON.stringify( saveDetails );

      console.log( "saveDetails as JSON", saveDetailsAsJSON );

      req.addEventListener( "load", function( evt ) {
        console.log( "save call completed", evt );
      } );

      req.addEventListener( "error", function( evt ) {
        console.log( "load call error", evt );
      } );

      req.send( saveDetailsAsJSON );
    }
    else {
      console.log( 'in extension save' );


      let saveDetails = {};
      saveDetails[ filename ] = preferenceStore;
      chrome.storage.sync.set( saveDetails );
    }
  };

  persistence.load = function() {
    console.log( "persistence.load" );

    let filename = document.querySelector( "#" + persistence.controlIds.filename ).value;


    if ( !inChromeExtension ) {
      let req = new XMLHttpRequest();

      let loadDetails = {
        filename: filename
      };

      req.addEventListener( "load", function( evt ) {
        console.log( "load call completed", evt );

        preferenceStore = JSON.parse( evt.currentTarget.response ).preferences;
        cssEnactor.enact( preferenceStore, 'preview' );
      } );

      req.addEventListener( "error", function( evt ) {
        console.log( "load call error", evt );
      } );

      req.open( "GET", "/preferences/" + filename );

      req.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );

      req.send( JSON.stringify( loadDetails ) );

    }
    else {

      console.log( 'in extension load' );

      console.log( filename);
      chrome.storage.sync.get([ filename], function( data ) {
        preferenceStore = data[filename];
        cssEnactor.enact( preferenceStore, 'preview' ); // TODO: copied from the load event above

      } );
    }
  };

} )();
