( function() {
  document.addEventListener( 'DOMContentLoaded', function() {

    persistence.appendControlMarkup( "#persistence-controls" );
    lexGenerator.preferenceStoreInit( preferenceSchema.textSpacing );
    lexGenerator.preferenceStoreInit( preferenceSchema.font );
    lexGenerator.preferenceStoreInit( preferenceSchema.colors );
    lexGenerator.controls( preferenceSchema.textSpacing, "#text-spacing" );
    lexGenerator.controls( preferenceSchema.font, "#font" );
    lexGenerator.controls( preferenceSchema.colors, "#colors" );
    cssEnactor.enact( preferenceStore, "page" );
  } );
} )();
