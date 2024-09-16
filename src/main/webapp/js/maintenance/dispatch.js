if (typeof data === 'undefined' || data === null) { let data = ""; }
if (typeof callback === 'undefined' || callback === null) { let callback = ""; }
if (typeof observer === 'undefined' || observer === null) { let observer = ""; }

var editButton = function(value, data, cell, row, options) {
	let thisButton = '<button class="px-4 py-2 text-white bg-indigo-500 rounded editModalButton"> Edit </button>';
	thisButton += '<button class="px-4 py-2 ml-5 text-white bg-red-500 rounded deleteModalButton"> Delete </button>'
	return thisButton;
};

var divTable = new Tabulator("#divTableTabulator", {
	layout: "fitColumns",
	data: dispatchType,
	pagination: 'local',
	pagination: true,
	paginationSize: 10,
	paginationSizeSelector: [5, 10, 15, 20],
	paginationCounter: "rows",
	selectableRows: 1,
	columns: [
		{ title: "Code", field: 'dispatchTypeCd', minWidth: 50 },
		{ title: "Name", field: 'dispatchTypeName', minWidth: 100 },
		{ title: "Action", headerSort: false, formatter: editButton, minWidth: 200 },
	],
});

$(".dispatchForm").submit(function(e) {
	e.preventDefault();
});

divTable.on('rowClick', function() {
	let row = divTable.getSelectedData()[0];
	if (row !== undefined) {
		populateForm(row);
	}
})

callback = function(mutationsList, observer) {
	for (let mutation of mutationsList) {
		if (mutation.type === 'childList') {
			$(".editModalButton").off("click");
			$(".editModalButton").on('click', function() {
				editModal.classList.remove("closing");
				editModal.showModal();
				editModal.classList.add("showing");
			});
			$(".deleteModalButton").off("click");
			$(".deleteModalButton").on('click', function() {
				$("#deleteModal").removeClass("closing")
				deleteModal.showModal();
				$("#deleteModal").addClass("showing")
			});
		}
	}
};

observer = new MutationObserver(callback);
observer.observe(document.getElementById('divTableTabulator'), { childList: true, subtree: true });

$("#btnDispatch").click(function() {
	$.get("MaintenanceController", {
		action: "showDispatch"
	}, function(response) {
		$("#divContent").html(response)
	});
});

$('#deleteSaveModalButton').click(function(event) {
	event.stopImmediatePropagation();
	$.post('MaintenanceController', {
		action: 'deleteDispatchData',
		data: JSON.stringify(data)
	}, function(response) {
		if (response.includes('success')) {
			closeDeleteModal();
			$('#btnDispatch').click();
		} else {
			$('.errorMessage').text(response);
		}
	});
});

function populateForm(row) {
	$('#dispatchTypeCodeUpdate').val(row.dispatchTypeCd);
	$('#dispatchTypeNameUpdate').val(row.dispatchTypeName);
	data = {
		dispatchTypeCd: row.dispatchTypeCd.toString(),
		dispatchTypeName: row.dispatchTypeName.toString()
	};
}

function validate(data) {
	let valid = true;
	if (data.dispatchTypeCd === '' || data.dispatchTypeName === '') {
		$('.errorMessage').text("Please correctly fill-out all required fields");
		valid = false;
	} else if (data.dispatchTypeCd.length > 10) {
		$('.errorMessage').text("Dispatch Type Code characters should be less than 11");
		valid = false;
	} else if (data.dispatchTypeName.length > 50) {
		$('.errorMessage').text("Dispatch Type Name characters should be less than 51");
		valid = false;
	}
	return valid;
}

function sendData(data) {
	if (validate(data)) {
		$.post('MaintenanceController', {
			action: 'saveDispatchData',
			data: JSON.stringify(data)
		}, function(response) {
			if (response.includes('success')) {
				closeAddModal();
				closeEditModal();
				$('#btnDispatch').click();
			} else {
				$('.errorMessage').text(response);
			}
		});
	}
}

function addData() {
	let data = {
		dispatchTypeCd: $('#dispatchTypeCodeCreate').val().toString(),
		dispatchTypeName: $('#dispatchTypeNameCreate').val().toString()
	};
	sendData(data);
}

function updateData() {
	let data = {
		dispatchTypeCd: $('#dispatchTypeCodeUpdate').val().toString(),
		dispatchTypeName: $('#dispatchTypeNameUpdate').val().toString()
	};
	sendData(data);
}

$('#btnCreateDispatchType').click(addData);
$('#btnUpdateDispatchType').click(updateData);