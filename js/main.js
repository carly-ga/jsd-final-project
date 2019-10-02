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


	// input event to resize input textareas to fit text
	$('body').on('input', '#input textarea', function() {
		$(this)[0].style.height = $(this)[0].scrollHeight + 'px'
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
		const indent = getStyle('indent', 40)
		console.log(`Left indent: ${indent}px`)

		const spaceBetween = getStyle('spaceBetween', 10)
		console.log(`Space between items: ${spaceBetween}px`)

		const spaceAboveBelow = getStyle('spaceAboveBelow', 20)
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
			li.style.textAlign = 'left'
		})

		// style last item
		// make bottom margin 0 - overrides gmail default
		// add class 'lastListItem'
		const lastLi = styledLis.pop()
		lastLi.style.margin = 0
		lastLi.className = 'lastListItem'
		styledLis.push(lastLi)

		// style first item
		// add class 'firstListItem'
		const firstLi = styledLis.shift()
		firstLi.className = 'firstListItem'
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
		$('#output textarea:last')[0].style.height = $('#output textarea:last')[0].scrollHeight + 5 + 'px'

		/* -------------------------------- */

		// log and display output mso
		mso = `<!--[if mso]><style type="text/css">${listTag} {margin:0 !important;} li {margin-left:${indent}px !important;} li.firstListItem {margin-top:${spaceAboveBelow}px !important;} li.lastListItem {margin-bottom:${spaceAboveBelow}px !important;}</style><![endif]-->`
		console.log(`mso: ${mso}`)
		$('#output textarea:first').text(mso)
		$('#output textarea:first')[0].style.height = $('#output textarea:first')[0].scrollHeight + 5 + 'px'

		/* -------------------------------- */


	})


	// get list styles
	const getStyle = (style, fallback) => {
		if ($("input[name=" + style + "]").val().length === 0) {
			return fallback
		} else {
			return $("input[name=" + style + "]").val()
		}
	}


})