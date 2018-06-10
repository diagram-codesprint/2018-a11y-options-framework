
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

  persistence.save = function() {
    console.log( "persistence.save" );
    let req = new XMLHttpRequest();
    req.open( "POST", "/preferences" );
    req.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );

    let filename = document.querySelector( "#" + persistence.controlIds.filename ).value;

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
  };

  persistence.load = function() {
    console.log( "persistence.load" );
    let req = new XMLHttpRequest();

    req.addEventListener( "load", function( evt ) {
      console.log( "load call completed", evt );

      preferenceStore = JSON.parse( evt.currentTarget.response ).preferences;
      cssEnactor.enact( preferenceStore, 'preview' );
    } );

    req.addEventListener( "error", function( evt ) {
      console.log( "load call error", evt );
    } );

    let filename = document.querySelector( "#" + persistence.controlIds.filename ).value;

    let loadDetails = {
      filename: filename
    };
    req.open( "GET", "/preferences/" + filename );

    req.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );

    req.send( JSON.stringify( loadDetails ) );
  };

} )();
