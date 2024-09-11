$(document).ready(function(){
    $(".menu-btn").click(function(){
        var buttonId = $(this).attr('id');
        var url, action;

        switch (buttonId) {
			case 'btnToDash':
			    url = 'DashboardController';
			    action = 'showDashboard';
			    $("#divVeryOuter").hide();
			    $("#divOuter").show(); 
			    break;
            case 'btnToRaw':
                url = 'RawMaterialListController';
                action = 'showRawMaterialList';
                $("#divVeryOuter").hide();
                $("#divOuter").show(); 
                break;
            case 'btnToDaily':
                url = 'DailyPlannedProductionController';
                action = 'showDailyPlannedProduction';
                $("#divVeryOuter").hide();
                $("#divOuter").show(); 
                break;
			case 'btnToFinishedProductList':
			    url = 'FinishedProductListController';
			    action = 'showFinishedProductList';
			    $("#divVeryOuter").hide();
			    $("#divOuter").show();
			    break;
            case 'btnToDispatching':
                url = 'DispatchingController';
                action = 'showDispatching';
                $("#divVeryOuter").hide();
                $("#divOuter").show();
                break;
            case 'btnToReport':
                url = 'ReportGenerationController';
                action = 'showReportGeneration';
                $("#divVeryOuter").hide(); 
                $("#divOuter").show(); 
                break;
            case 'btnToMaintenance':
                url = 'MaintenanceController';
                action = 'showMaintenance';
                $("#divVeryOuter").hide(); 
                $("#divOuter").show();
                break;

			
            default:
                return;
        }


        $.get(url, { action: action }, function(response){
            if (buttonId === 'btnMainMenu') {
                $("#divVeryOuter").html(response);
            } else {
                $("#divContent").html(response);
            }
        });
    });
	
	$("#btnMainMenu").click(function() {
		$("#divOuter").hide(); 
		$("#divVeryOuter").show(); 
	});
	
	$("#btnLogout").click(function() {
		$.post("UserController", {
			action: "logout"
		}, function(response) {
			$("#divMain").html(response);
			$("#divMenu").html("");
			/*history.go();*/
		});
	});
	
});
