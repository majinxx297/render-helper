﻿#target photoshop
app.bringToFront();  //Necessary if you want to show this script in File/script

// create clipping maks
// Code generated by ScriptListener
function clipMask() {
	var idGrpL = charIDToTypeID( "GrpL" );
    var desc11 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref8 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref8.putEnumerated( idLyr, idOrdn, idTrgt );
    desc11.putReference( idnull, ref8 );
	executeAction( idGrpL, desc11, DialogModes.NO );
}

// Adjust the active layer mask
// Code generated by ScriptListener
function adjustMask(){
	var idDlt = charIDToTypeID( "Dlt " );
	    var desc82 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var ref74 = new ActionReference();
	        var idChnl = charIDToTypeID( "Chnl" );
	        var idChnl = charIDToTypeID( "Chnl" );
	        var idMsk = charIDToTypeID( "Msk " );
	        ref74.putEnumerated( idChnl, idChnl, idMsk );
	    desc82.putReference( idnull, ref74 );
	    var idAply = charIDToTypeID( "Aply" );
	    desc82.putBoolean( idAply, true );
	executeAction( idDlt, desc82, DialogModes.NO );
}

// Merge layer src to layer dst
function mergeLayer(src, dst) {
	var s = src.duplicate();
	s.move(dst, ElementPlacement.PLACEBEFORE);
	app.activeDocument.activeLayer = s;
	clipMask();
	s.merge();
}

// UI
var curr = app.activeDocument.activeLayer.name;

var dlg = new Window("dialog", "Render Helper");
dlg.orientation = "column";

var main = dlg.add("group");
main.orientation = "row";

var groupf = main.add("group");
var textf = groupf.add("statictext", undefined, "From:");
var src = groupf.add("edittext", undefined, curr);
src.characters = 10;
src.active = true;

var groupt = main.add("group");
var textt = groupt.add("statictext", undefined, "To:");
var dst = groupt.add("edittext", undefined, curr);
dst.characters = 10;
dst.active = true;

var btn = dlg.add("group");
btn.orientation = "row";
var exec = btn.add("button", undefined, "Exec");
btn.add("button", undefined, "Cancel"); 
exec.onClick = function (){
    var j;
	var i;
    var gsrc;
    var gdst;
    try{
        gdst = app.activeDocument.layerSets.getByName(dst.text).layers;
        }catch(e){
            dlg.close();
            return 1;
            }
    try{        
        gsrc = app.activeDocument.layerSets.getByName(src.text).layers;
        }catch(e){
            try{
                var s = app.activeDocument.artLayers.getByName (src.text);
                }catch(e){
                    dlg.close();
                    return 1;
                    }
            for(i = 0; i < gdst.length; i++){
                mergeLayer (s, gdst[i]);
                }
            s.visible = false;
            dlg.close();  
            return 0;
        }
	for (i = gsrc.length-1; i >= 0; i--){
		var s = gsrc[i];
		for (j = 0; j < gdst.length; j++){
			mergeLayer(s, gdst[j]);
		}
	}
    gsrc = app.activeDocument.layerSets.getByName(src.text);    // hide group
    gsrc.visible = false;
    dlg.close();
    return 0;
} ;

dlg.show();