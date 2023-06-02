$(document).ready(function(){
    $(".content").slice(0, 3).show();
    $("#loadMore").on("click", function(e){
      e.preventDefault();
      $(".content:hidden").slice(0, 2).slideDown();
      if($(".content:hidden").length == 0) {
        $("#loadMore").text("The End").addClass("noContent");
      }
    });
  })


  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  