$(function(){


	// click event to add list item
	$('#increment div:first').click(() => {

		// append new textarea inside #items div
		const newTextArea = '<textarea rows="1" form="submit" placeholder="Start typing..." spellcheck="false" class="increment"></textarea>'
		$('div#items').append(newTextArea)

	})



	// click event to remove list item
	$('#increment div:last').click(() => {

		// remove last textarea with class .increment
		// first two textareas do not have class .increment
		$('div#items textarea.increment:last').remove()

	})



	// submit event to run program
	$('#submit').submit((event) => {

		event.preventDefault()
		console.log('Form submitted')

		// create array of list items, store in jquery variable $items
		const $items = $('#items textarea')

		// find total number of items
		const totalItems = $('#items textarea').length
		console.log(`total items: ${totalItems}`)

		// create empty array for bare lis
		const bareLis = []

		$.each($items, function(index, itemObject) {

			// extract item values
			const item = itemObject.value
			console.log(`item ${index}: ${item}`)

			// wrap each item in html li tag
			const itemHtml = `<li>${item}</li>`

			// push each li tag, as a string, to the empty bareLis array
			bareLis.push(itemHtml)

		})

		// join all li strings into one string
		let itemsHtml = bareLis.join('')

		// parse string into true html li tags
		itemsHtml = $.parseHTML(itemsHtml)

		// create global variable for space between list items using var
		// input does not allow negative numbers
		if ($('input[name="spaceBetween"]').val().length === 0) {
			var spaceBetween = 0
			console.log(`space between: ${spaceBetween}px`)
		} else {
			var spaceBetween = $('input[name="spaceBetween"]').val()
			console.log(`space between: ${spaceBetween}px`)
		}

		// add bottom margins to all li tags
		// creates space between list items
		itemsHtml.forEach(function(item) {
			item.style.margin = `0 0 ${spaceBetween}px`
		})

		// manipulate last item
		// make bottom margin 0 - overrides gmail default
		// add class 'last'
		const lastItem = itemsHtml.pop()
		lastItem.style.margin = 0
		lastItem.className = 'last'
		itemsHtml.push(lastItem)

		// manipulate first item
		// add class 'first'
		const firstItem = itemsHtml.shift()
		firstItem.className = 'first'
		itemsHtml.unshift(firstItem)

		console.log(itemsHtml)

		// create empty array for styled lis
		let styledLis = []

		// push styled items to global array as strings
		itemsHtml.forEach(function(item) {
			styledLis.push(item.outerHTML)
		})

		// join styled item strings into one string
		styledLis = styledLis.join('')
		console.log(styledLis)

	})





})