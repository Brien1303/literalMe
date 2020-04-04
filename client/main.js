import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';

Template.allBooks.helpers({
	allbooks(){
		return booksdb.find();
	},
})

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
		console.log ("saving...");
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
