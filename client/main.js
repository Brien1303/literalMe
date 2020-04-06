import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';

Template.mainBody.helpers({
	allBooks(){
		return booksdb.find();
	},
});

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/

Template.myJumbo.events({
	'click .js-save' (event, instance){
		var bookName = $('#Title').val();
		var bookLink = $('#bookURL').val();
		var Des = $('#Description').val();
		booksdb.insert({
			"Title" : bookName,
			"bookURL" : bookLink,
			"Description": Des
		});
		console.log ("saving..." + "Title:" + bookName + "URL:"+ bookLink + "Description:"+ Des);
				$("#addImageModal").modal("hide");
				$("#Title").val("");
				$("#bookURL").val("");
				$("#Description").val("");

	},
	'input #bookURL'(event, instance){
			$(".mountains").attr ("src", $ ("#bookURL") .val());
			console.log($("#bookURL").val());
		}

});

Template.veiwBook.events({
'click .js.delete' (event, instance){
	var myId = $ ('#veiwId').val();
	$("#deleteId").val(myId);
	$('#confirmModal').modal('show');
},
'click .js-confirm'(event, instance){
	var myId = $('#deleteId').val();
	$("#"+myId).fadeOut('slow',function(){
		booksdb.remove({_id:myId});
	});
},

	
});

Template.mainBody.events({
	'click .js-veiwBook'(event, instance){
		$("#veiwBookModal").modal("show");
		var myId = this._id;
		var theTitle = booksdb.findOne({_id:myId}).title;
		var thePath = booksdb.findOne({_id:myId}).path;
		var theDes = booksdb.findOne({_id:myId}).des;
		var theAuthor = booksdb.findOne({_id:myId}).author;
		$("#veiwId").val(myId);
		$("#veiwTitle").val(myTitle);
		$("#veiwDes").val(myDes);
		$("#veiwAuthor").val(myAuthor);
		$("#veiwHolder").attrc("src", thePath);

		var myId = this._id;
		instance.veiws.set(instance).set(instance.veiws.get(myId) + 1);
	},

})