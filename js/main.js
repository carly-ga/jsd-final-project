$(function(){

	//PLAN TO OVERWRITE CODE BLOCKS WITH NEW HTML WHEN THE USER HITS SUBMIT
	//const defaultHtmlOpen = '<ul align="left" type="disc" style="margin:0; padding:0 0 0 25px;">'
	//const defaultHtmlClose = '</ul>'
	//const defaultHtmlItems = '<li style="margin:0 0 10px 0;" class="first"></li><li style="margin:0 0 10px 0;"></li><li style="margin:0;" class="last"></li>'

	// click event to add list item
	$('#increment div:first').click(() => {

		// append new textarea inside #items div
		const newTextArea = '<textarea rows="1" form="submit" placeholder="Start typing..." spellcheck="false" class="increment"></textarea>'
		$('div#items').append(newTextArea)

	})

	// click event to remove list item
	$('#increment div:last').click(() => {

		// remove last textarea with class .increment
		$('div#items textarea.increment:last').remove()

	})


	// submit event to run program
	$('#submit').submit((event) => {

		event.preventDefault()
		console.log('Form submitted')

		// array of list items
		const $items = $('#items textarea')

		$.each($items, function(index, object) {

			const item = object.value
			const itemHtml = `<li style="margin:0;" class="last">${object.value}</li>`

			// print item list to console
			console.log(`itemHtml: ${itemHtml}`)

		});



	})





})