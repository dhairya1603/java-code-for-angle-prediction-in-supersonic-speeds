<!--Oblique Shock Wave calculations

function ResetForm() {
   document.forms[0].M1.value = "1.0";  <!-- for normal shock --!>
   document.forms[0].delta.value = "0.0";
}

function Compute() {
  var delta = document.forms[0].delta.value;
  var M1 = document.forms[0].M1.value;

  var t1 = 0.0;
  var d0 = delta/180.0*3.141596; 
  var a1 = 2.0*Math.cos(t1)/Math.sin(t1);
  var a2 = M1*M1*Math.sin(t1)*Math.sin(t1) - 1.0;
  var a3 = 2.0 + (1.4 + Math.cos(2.0*t1))*M1*M1;
  var d1 = Math.atan(a1*a2/a3);
  var e1 = d0-d1;
  var t2 = 20.0/180.0*3.1415925;
  var a1 = 2.0*Math.cos(t2)/Math.sin(t2);
  var a2 = M1*M1*Math.sin(t2)*Math.sin(t2) - 1.0;
  var a3 = 2.0 + (1.4 + Math.cos(2.0*t2))*M1*M1;
  var d2 = Math.atan(a1*a2/a3);
  var e2 = d0-d2;
  var count = 1;
  while (Math.abs(e2) > 1.0e-5) {
   var count = count+1;
   var a1 = (e2 - e1)/(t2 - t1);
   var a2 = e2 - a1*t2;
   var t1 = t2;
   var t2 = - a2/a1;
   var e1 = e2;
   var a1 = 2.0*Math.cos(t2)/Math.sin(t2);
   var a2 = M1*M1*Math.sin(t2)*Math.sin(t2) - 1.0;
   var a3 = 2.0 + (1.4 + Math.cos(2.0*t2))*M1*M1;
   var d2 = Math.atan(a1*a2/a3);
   var e2 = d0-d2;
  
   if (count > 100) {
    document.forms[1].theta.value = "detached";
    document.forms[1].M2.value = " ";
    document.forms[1].p21.value = " ";
    return;
   }
  }
  
  var theta = t2*180.0/3.1415926
  document.forms[1].theta.value = theta;
  var a1 = M1*Math.sin(t2);
  var a2 = Math.sqrt((0.4*a1*a1 + 2.0)/(2.8*a1*a1 -0.4));
  var M2 = a2/(Math.sin(t2-d0));
  document.forms[1].M2.value = M2;

  var p21 = (2.8*a1*a1 - 0.4)/2.4;
  
  document.forms[1].p21.value = p21;

  roundAll();
}

// Rounding

function roundAll(){

   document.forms[0].M1.value = truncNum(document.forms[0].M1.value,9)
   document.forms[0].delta.value = truncNum(document.forms[0].delta.value,7)

   document.forms[1].theta.value =truncNum(document.forms[1].theta.value,7)
   document.forms[1].M2.value =truncNum(document.forms[1].M2.value,7)
   document.forms[1].p21.value =truncNum(document.forms[1].p21.value,7)
   return;
}

function truncNum(inputVal, rsize) {
   var instr = " " + inputVal
   var inputlength = instr.length
   if (inputlength<=rsize+1) return instr.substring(1, inputlength);
   var epos = strpos(instr, "e")
   if ( epos > rsize+1) {
     var instr1 = instr.substring(1,rsize+1) + instr.substring(epos,inputlength);
     return instr1;
   }
   var rounded = instr.substring(1, rsize+1);
   return rounded;
}

function strpos(str, ch) {
   for (var i = 0; i < str.length; i++)
      if (str.substring(i, i+1) == ch) return i;
   return -1;
}