( function() {
  document.addEventListener( 'DOMContentLoaded', function() {

    persistence.appendControlMarkup( "#persistence-controls" );
    lexGenerator.preferenceStoreInit( preferenceSchema.textSpacing );
    lexGenerator.preferenceStoreInit( preferenceSchema.font );
    lexGenerator.controls( preferenceSchema.textSpacing, "#text-spacing" );
    lexGenerator.controls( preferenceSchema.font, "#font" );
    cssEnactor.enact( preferenceStore, "page" );
  } );
} )();
