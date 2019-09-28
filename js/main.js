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

		/* -------------------------------- */

		// log total number of items
		const totalItems = $('#items textarea').length
		console.log(`Total items: ${totalItems}`)

		/* -------------------------------- */

		// create variables for list styles
		const listMarker = $('select')[0].value
		console.log(`List marker: ${listMarker}`)

		// call getStyle()
		// inputs do not allow negative numbers
		const indent = getStyle('indent')
		console.log(`Left indent: ${indent}px`)

		const spaceBetween = getStyle('spaceBetween')
		console.log(`Space between items: ${spaceBetween}px`)

		const spaceAboveBelow = getStyle('spaceAboveBelow')
		console.log(`Space above and below list: ${spaceAboveBelow}px`)

		/* -------------------------------- */

		// create empty array for bare li strings
		const bareLis = []

		// create array of list items
		// wrap each item in html li tag
		// push each li tag, as a string, to emptsy bareLis array
		const $items = $('#items textarea')

		$.each($items, function(index, input) {

			const item = input.value.trim()

			if (item) {
				console.log(`Item ${index + 1}: ${item}`)
				const itemHtml = `<li>${item}</li>`
				bareLis.push(itemHtml)
			}

		})

		// create array of true html li tags
		let styledLis = bareLis.join('')
		styledLis = $.parseHTML(styledLis)

		/* -------------------------------- */

		// add bottom margins to all li tags
		// creates space between list items
		styledLis.forEach(function(li) {
			li.style.margin = `0 0 ${spaceBetween}px`
		})

		// style last item
		// make bottom margin 0 - overrides gmail default
		// add class 'last'
		const lastLi = styledLis.pop()
		lastLi.style.margin = 0
		lastLi.className = 'last'
		styledLis.push(lastLi)

		// style first item
		// add class 'first'
		const firstLi = styledLis.shift()
		firstLi.className = 'first'
		styledLis.unshift(firstLi)

		/* -------------------------------- */

		// create global listTag variable based on listMarker variable
		if (listMarker === '1' || listMarker === 'A' || listMarker === 'a') {
			var listTag = 'ol'
		} else {
			var listTag = 'ul'
		}

		// create and style list html array
		let html = `<${listTag} align="left"></${listTag}>`
		html = $.parseHTML(html)
		html = html[0]
		html.style.listStyleType = listMarker
		html.style.padding = `0 0 0 ${indent}px`
		html.style.margin = `${spaceAboveBelow}px 0`
		if (indent === 0) {
			html.style.listStylePosition = `inside`
		}

		/* -------------------------------- */

		// inject styledLis into list html array
		styledLis.forEach(function(li) {
			html.appendChild(li)
		})

		// log and display output HTML
		html = html.outerHTML
		console.log(`HTML: ${html}`)
		$('#output textarea:last').text(html)

		/* -------------------------------- */

		// log and display output mso
		mso = `<!--[if mso]><style type="text/css">${listTag} {margin:0 !important;} li {margin-left:${indent}px !important;} li.first {margin-top:${spaceAboveBelow}px !important;} li.last {margin-bottom:${spaceAboveBelow}px !important;}</style><![endif]-->`
		console.log(`mso: ${mso}`)
		$('#output textarea:first').text(mso)

	})


	// get list styles
	const getStyle = style => {
		if ($("input[name=" + style + "]").val().length === 0) {
			return 0
		} else {
			return $("input[name=" + style + "]").val()
		}
	}


})