function getBranchId() {
	$.each(branchId, function(index, data) {
		if (data.branchId == branchIdUser) {
			$('.inputBranchId').val(data.branchId + ' - ' + data.branchName);
			$('.inputBranchId').attr("dataBranchId", data.branchId);
		}
	});
}

getBranchId();

function getMaterialCode() {
	let html = '';
	$.each(materialCode, function(index, data) {
		html += '<option value="' + data.materialCd + '">' + data.materialCd + ' - ' + data.materialCodeName + '</option>'
	});
	$('.selMaterialCode').append(html);
}

getMaterialCode();

$('.rawUserId').val(userId);



if (typeof data === 'undefined' || data === null) { let data = ""; }
if (typeof callback === 'undefined' || callback === null) { let callback = ""; }
if (typeof observer === 'undefined' || observer === null) { let observer = ""; }

var editButton = function(value, data, cell, row, options) {
	let thisButton = '<button class="px-4 py-2 text-white bg-indigo-500 rounded editModalButton"> Edit </button>';
	thisButton += '<button class="px-4 py-2 ml-5 text-white bg-red-500 rounded deleteModalButton"> Delete </button>'
	return thisButton;
};

var divTable = new Tabulator("#divTableTabulator", {
	layout: "fitDataFill",
	data: rawMaterialList, 
	pagination: 'local',
	pagination: true,
	paginationSize: 10,
	paginationSizeSelector: [5, 10, 15, 20],
	paginationCounter: "rows",
	selectableRows: 1,
	columns: [
		{ title: "ID", field: 'materialListId', minWidth: 50 },
		{ title: "Code", field: 'materialCd', minWidth: 50 },
		{ title: "Name", field: 'materialName.materialCodeName', minWidth: 100 },
		{ title: "Quantity", field: 'quantity', minWidth: 50 },
		{ title: "Date Receive", field: 'dateReceive', minWidth: 100 },
		{ title: "User ID", field: 'userId', minWidth: 50 },
		{ title: "Branch", field: 'branch.branchName', minWidth: 100 },
		{ title: "Action", headerSort: false, formatter: editButton, minWidth: 200 },
	],
});


$(".rawMaterialListForm").submit(function(e) {
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

$("#btnShowRawMaterialList").click(function() {
	$.get("RawMaterialListController", {
		action: "showRawMaterialList"
	}, function(response) {
		$("#divContent").html(response)
	});
});

$('#deleteSaveModalButton').click(function(event) {
	event.stopImmediatePropagation();
	$.post('RawMaterialListController', {
		action: 'deleteData',
		data: JSON.stringify(data)
	}, function(response) {
		if (response.includes('success')) {
			closeDeleteModal();
			$('#btnShowRawMaterialList').click();
		} else {
			$('.errorMessage').text(response);
		}
	});
});

function populateForm(row) {
	$('#rawMaterialListIdUpdate').val(row.materialListId);
	$('#materialCodeUpdate').val(row.materialCd);
	$('#rawMaterialListQuantityUpdate').val(row.quantity);
	$('#rawMaterialListDateReceiveUpdate').val(row.dateReceive);
	$('#userIdUpdate').val(row.userId);
	$('#branchIdUpdate').val(row.branchId + " - " + row.branch.branchName);
	data = {
		materialListId: row.materialListId.toString(),
		materialCd: row.materialCd.toString(),
		quantity: row.quantity.toString(),
		dateReceive: row.dateReceive.toString(),
		userId: row.userId.toString(),
		branchId: row.branchId.toString()
	};
}

function validate(data) {
	let valid = true;
	if (data.materialListId === '' || data.materialCd === '' || data.quantity === '' ||
		data.dateReceive === '' || data.userId === '' || data.branchId === '') {
		$('.errorMessage').text("Please correctly fill-out all required fields");
		valid = false;
	} else if (!(/^[0-9]\d*$/.test(data.materialListId))) {
		$('.errorMessage').text("Material List ID should only contain positive numbers");
		valid = false;
	} else if (data.materialListId > 99999999999999) {
		$('.errorMessage').text("Material List ID value is too large");
		valid = false;
	} else if (data.materialCd.length > 10) {
		$('.errorMessage').text("Material Code characters should be less than 11");
		valid = false;
	} else if (!(/^[0-9]\d*$/.test(data.quantity))) {
		$('.errorMessage').text("Quantity should only contain positive numbers and zero");
		valid = false;
	} else if (data.quantity > 99999999999999) {
		$('.errorMessage').text("Quantity value is too large");
		valid = false;
	} else if (!(!isNaN(Date.parse(data.dateReceive)) && (new Date(data.dateReceive).toISOString().startsWith(data.dateReceive)))) {
		$('.errorMessage').text("Please enter valid date");
		valid = false;
	} else if (!(/^[1-9][0-9]*$/.test(data.userId))) {
		$('.errorMessage').text("User ID should only contain positive numbers");
		valid = false;
	} else if (data.userId > 99999999999999) {
		$('.errorMessage').text("User ID value is too large");
		valid = false;
	} else if (!(/^[1-9][0-9]*$/.test(data.branchId))) {
		$('.errorMessage').text("Branch ID should only contain positive numbers");
		valid = false;
	} else if (data.branchId > 99999999999999) {
		$('.errorMessage').text("Branch ID value is too large");
		valid = false;
	}
	return valid;
}

function sendData(data) {
	if (validate(data)) {
		$.post('RawMaterialListController', {
			action: 'saveData',
			data: JSON.stringify(data)
		}, function(response) {
			if (response.includes('success')) {
				closeAddModal();
				closeEditModal();
				$('#btnShowRawMaterialList').click();
			} else {
				$('.errorMessage').text(response);
			}
		});
	}
}

function addData() {
	let data = {
		materialListId: "0",
		materialCd: $('#selMaterialCode').val().toString(),
		quantity: $('#rawMaterialListQuantityCreate').val().toString(),
		dateReceive: $('#rawMaterialListDateReceiveCreate').val().toString(),
		userId: userId.toString(),
		branchId: branchIdUser.toString()
	};
	sendData(data);
}

function updateData() {
	let data = {
		materialListId: $('#rawMaterialListIdUpdate').val().toString(),
		materialCd: $('#materialCodeUpdate').val().toString(),
		quantity: $('#rawMaterialListQuantityUpdate').val().toString(),
		dateReceive: $('#rawMaterialListDateReceiveUpdate').val().toString(),
		userId: $('#userIdUpdate').val().toString(),
		branchId: branchIdUser.toString()
	};
	sendData(data);
}

$('#btnCreateRawMaterialList').click(addData);
$('#btnUpdateRawMaterialList').click(updateData);