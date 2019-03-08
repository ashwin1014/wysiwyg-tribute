window.onload = function() {
  $('[data-toggle="tooltip"]').tooltip();
  if(isIE()) document.execCommand("defaultParagraphSeparator", false, "div");
  addFonts();
};


const fontFamily = ['Georgia', 'Times New Roman', 'Arial', 'Comic Sans MS', 'Tahoma', 'Trebuchet MS', 'Verdana','Courier New','Roboto', 'Helvetica', 'Palatino', 'Garamond', 'Impact'];
let fontDropDownList = '';
let combinedArray = [];

let commonFieldsArray = [
  {isCommon: "true", value: "Unique EventId", name: "UniqueIdPlaceholder", key: "common-uniqueeventid", class: "commonFieldsArray" },
  {isCommon: "true", value: "Project Name Label", name: "ProjectNamePlaceholder", key: "common-projectnamelbl" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Status", name: "FormCurrentStatusPlaceholder", key: "common-status" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Event Title", name: "EventTitleDescription", key: "common-eventtitle" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Form Name Review", name: "FormNamePlaceholder", key: "common-formnamereview" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Category", name: "CategoriesAssignedToForm", key: "common-category" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Classification", name: "ClassificationExecutedInForm", key: "common-classification" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Date Event", name: "DateEventPlaceholder", key: "common-dateevent" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Due Date of Event", name: "DueDateEventPlaceholder", key: "common-duedateevent" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Reporter", name: "ReporterDescriptionPlaceholder", key: "common-reporter" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Expiration Date", name: "ExpirationDatePlaceholder", key: "common-expirationdate" , class: "commonFieldsArray"},
  {isCommon: "true", value: "Renewal Date", name: "RenewalDatePlaceholder", key: "common-renewaldate" , class: "commonFieldsArray"}
];

let standardVariableArray = [
  {isCommon: "false", value:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum", name: "Lorem ipsum", key: "Lorem ipsum1", class: "standardVariableArray"},
  {isCommon: "false", value:"dolor sit amet", name: "dolor sit amet", key: "dolor sit amet2", class: "standardVariableArray"},
  {isCommon: "false", value:"consectetur adipiscing elit", name: "consectetur adipiscing elit", key: "consectetur adipiscing elit3", class: "standardVariableArray"},
  {isCommon: "false", value:"JavaScript", name: "JavaScript", key: "JavaScript4", class: "standardVariableArray"},
  {isCommon: "false", value:"Python Django", name: "Python Django", key: "Python Django5", class: "standardVariableArray"},
  {isCommon: "false", value:"Python Flask", name: "Python Flask", key: "Python Flask6", class: "standardVariableArray"},
  {isCommon: "false", value:"MEAN Stack", name: "MEAN Stack", key: "MEAN Stack7", class: "standardVariableArray"},
  {isCommon: "false", value:"MERN Stack", name: "MERN Stack", key: "MERN Stack8", class: "standardVariableArray"},
  {isCommon: "false", value:"Underscore Js", name: "Underscore Js", key: "Underscore Js9", class: "standardVariableArray"},
  {isCommon: "false", value:"Ember Js", name: "Ember Js", key: "Ember Js10", class: "standardVariableArray"},
  {isCommon: "false", value:"Angular Js", name: "Angular Js", key: "Angular Js11" , class: "standardVariableArray"},
  {isCommon: "false", value:"React Js", name: "React Js", key: "React Js12" , class: "standardVariableArray"},  
];


combinedArray = commonFieldsArray;

standardVariableArray.forEach(function(ele){
  combinedArray.push(ele);
});


const doc = document.getElementById('emailContent');

const executeEditorCommand = function(ele) {
  let command = ele.getAttribute("data-command");
  let val = ele.getAttribute("data-font");
  val=val?val:"";
  document.execCommand(command, false, val);
  // doc.focus();
  // doc.click();
};

const debounce = function(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const isIE = function () {
  return document.all || (!!window.MSInputMethodContext && !!document.documentMode);
};


const onContentKeydown = debounce(function(e) {
  if(e.key === '@'){
    addVariableHeaders();
    document.querySelectorAll('.tribute-container ul li')[0].classList.add('highlight');
  }
},200);

const onContentKeyup = debounce(function(e) {
   if(e.key === 'Backspace' && document.querySelectorAll('.tribute-container .header').length === 0 && document.querySelectorAll('.tribute-container ul li').length === combinedArray.length){
      addVariableHeaders();
      document.querySelectorAll('.tribute-container ul li')[0].classList.add('highlight');
   }
},200);


const addFonts = function() {
    fontFamily.sort().map(function(ele){
      fontDropDownList+='<button type="button" onclick="executeEditorCommand(this)" data-command="fontName" data-font="'+ele+'" class="list-group-item" style="font-family:'+ele+'">'+ele+'</button>';
    });
   document.querySelector('.dropdown-menu').innerHTML = fontDropDownList;
};


const addVariableHeaders = function() {
  let commonVariableHeader = document.createElement("span");
  let standardVariableHeader = document.createElement("span");
  let textnodeStandard = document.createTextNode("Questions");
  let textnodeCommon = document.createTextNode("Common");
  commonVariableHeader.appendChild(textnodeCommon);
  standardVariableHeader.appendChild(textnodeStandard);
  commonVariableHeader.setAttribute('class','header');
  standardVariableHeader.setAttribute('class','header');
  document.querySelector('.tribute-container').children[0].insertBefore(commonVariableHeader, document.querySelector('.tribute-container').children[0].childNodes[0]);
  document.querySelector('.tribute-container').children[0].insertBefore(standardVariableHeader, document.querySelector('.tribute-container').children[0].childNodes[12]);
  document.querySelector('.tribute-container').scrollTop = 0;
};

document.querySelector('#inserLinkBtn').addEventListener('click', function(){
  let val = document.querySelector('#link').value;
  document.execCommand('createLink', false, val);
});


var tribute = new Tribute({
  trigger: '@',
  values: combinedArray,
  allowSpaces: true,
  fillAttr: 'value',
  lookup: 'value',
  selectClass: 'highlight',
  requireLeadingSpace: true,
  selectTemplate: function(item) {
    return '<span contenteditable="false" data-key="' + item.original.key.trim() + '" data-iscommon="' + item.original.isCommon + '" class="' + item.original.class + '">[' + item.original.value + ']</span>';
  },
  noMatchTemplate: function() {
    return '<span class="paddinglr-5px">No items found</span>';
  }
});

tribute.attach(doc);
