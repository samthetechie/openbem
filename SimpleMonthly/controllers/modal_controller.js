
  // Action controllers for element modal
  
  // Edit: this will launch the edit/add dialog 
  $("#elements").on("click",".icon-pencil",function(){
    var id = $(this).attr('eid');

    // Set the element type
    var element = inputdata.elements[id].lib;
    var type = element_library[element].type;
    $("#element-type").val(type);
    
    if (type=='Window') {
      $("#window_options").show();
      $("#window_orientation").val(inputdata.elements[id].orientation);
      $("#window_overshading").val(inputdata.elements[id].overshading);
    } else {
      $("#window_options").hide();
    }
    
    // Populate and set the element
    var out = "";
    for (z in element_library)
    {
      if (element_library[z].type==type) {
      
        if (element == z) { 
          out += "<option value='"+z+"' selected>"+element_library[z].description+"</option>";
        } else {
          out += "<option value='"+z+"'>"+element_library[z].description+"</option>";
        }
      }
    }
    $("#element-selector").html(out);
   
    // Set name and area
    $("#element-name").val(inputdata.elements[id].name);
    $("#element-area").val(inputdata.elements[id].area);    
    
    $("#myModal").attr('eid',id);
    
    $("#myModalLabel").html("Edit building element");
    $("#element-add").hide();
    $("#element-edit").show();
    $("#myModal").modal('show');
  });

  $("#element-type").click(function()
  {
    var type = $(this).val();

    if (type=='Window') {
      $("#window_options").show();
    } else {
      $("#window_options").hide();
    }

    var out = "";
    for (z in element_library)
    {
      if (element_library[z].type==type) out += "<option value='"+z+"'>"+element_library[z].description+"</option>";
    }
    $("#element-selector").html(out);
  });

  $("#element-add").click(function()
  {
    var element_id = $("#element-selector").val();
    var name = $("#element-name").val();
    var area = parseFloat($("#element-area").val()*1);
    
    var type = element_library[element_id].type;
    
    if (!element_id)
    { 
      alert("Please select an element using the drop down element selector");
    } 
    else if (!name) 
    {
      alert("Please enter a name for the element such as 'South wall'");
    } 
    else if (area<=0 && area!=NaN)
    {
      alert("Please give an area greater than 0");
    } 
    else
    {
    
      if (type=='Window') {
        var orient = parseInt($("#window_orientation").val());
        var shade = parseInt($("#window_overshading").val());
        inputdata.elements.push({name: name, lib: element_id, area: area, orientation: orient,overshading: shade});
      } else {
        inputdata.elements.push({name: name, lib: element_id, area: area});
      }
    
      model.set_inputdata(inputdata);
      result = model.calc();
      view();
      openbem.save(building,inputdata);
      $("#myModal").modal('hide');
    }
  });
  
  $("#element-edit").click(function()
  {
    var id = $("#myModal").attr('eid');
    var element_id = $("#element-selector").val();
    var name = $("#element-name").val();
    var area = parseFloat($("#element-area").val()*1);
    var type = element_library[element_id].type;
    
    if (!element_id)
    { 
      alert("Please select an element using the drop down element selector");
    } 
    else if (!name) 
    {
      alert("Please enter a name for the element such as 'South wall'");
    } 
    else if (area<=0 && area!=NaN)
    {
      alert("Please give an area greater than 0");
    } 
    else
    {

      if (type=='Window') {
        var orient = parseInt($("#window_orientation").val());
        var shade = parseInt($("#window_overshading").val());
        inputdata.elements[id] = {name: name, lib: element_id, area: area, orientation: orient,overshading: shade};
      
      } else {
        inputdata.elements[id] = {name: name, lib: element_id, area: area};
      }
      
      model.set_inputdata(inputdata);
      result = model.calc();
      view();
      openbem.save(building,inputdata); 
      $("#element-add").show();
      $("#element-edit").hide();    
      $("#myModalLabel").html("Add building element");
      $("#myModal").modal('hide');
    }
  });
