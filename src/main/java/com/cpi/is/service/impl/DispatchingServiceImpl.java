package com.cpi.is.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;

import com.cpi.is.dao.impl.DispatchingDAOImpl;
import com.cpi.is.entity.DispatchingEntity;
import com.cpi.is.entity.FinishedProductListEntity;
import com.cpi.is.service.DispatchingService;

public class DispatchingServiceImpl implements DispatchingService {
	
	private DispatchingDAOImpl dispatchingDAO;
	
	public DispatchingDAOImpl getDispatchingDAO() {
		return dispatchingDAO;
	}

	public void setDispatchingDAO(DispatchingDAOImpl dispatchingDAO) {
		this.dispatchingDAO = dispatchingDAO;
	}
	
	private DispatchingEntity jsonToEntity(JSONObject json) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	    Date dispatchDate = null;
	    try {
	        dispatchDate = dateFormat.parse(json.getString("dispatchDate"));
	    } catch (ParseException e) {
	        e.printStackTrace();
	    }
	    
		return new DispatchingEntity(
				Long.parseLong(json.getString("dispatchTrackId")),
				json.getString("dispatchTypeCd"),
				Long.parseLong(json.getString("fplId")),
				Long.parseLong(json.getString("quantity")),
				Long.parseLong(json.getString("branchId")),
				json.getString("destination"),
				dispatchDate);
	}
	
	@Override
	public List<DispatchingEntity> getData(Long branchId) throws Exception {
		return dispatchingDAO.getData(branchId);
	}

	@Override
	public String saveData(HttpServletRequest request, List<FinishedProductListEntity> finishedProductList) throws Exception {
		String validation = validateData(request);
		String results = "";
		
		if(validation.equals("success")) {
			String quantityValidation = validateQuantity(request, finishedProductList);
			if(quantityValidation.equals("success")) {
				try {
					results = 	dispatchingDAO.saveData(
							jsonToEntity(new JSONObject(request.getParameter("data"))));
				} catch(Exception e) {
					e.printStackTrace();
				}
			} else {
				return quantityValidation;
			}
			
			if(results.equals("success")) {
				return results;
			} else {
				return "Unable to save Dispatching Data";
			}
		} else {
			return validation;
		}
	}

	@Override
	public String deleteData(HttpServletRequest request) throws Exception {
		String validation = validateData(request);
		String results = "";
		
		if(validation.equals("success")) {
			try {
				results = 	dispatchingDAO.deleteData(
						jsonToEntity(new JSONObject(request.getParameter("data"))));
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			if(results.equals("success")) {
				return results;
			} else {
				return "Unable to delete Dispatching Data";
			}
		} else {
			return "Unable to delete Dispatching data";
		}
	}
	
	public String validateData(HttpServletRequest request) throws Exception{
		JSONObject json = new JSONObject(request.getParameter("data"));
		String validation = "success";
		String errorResult = "Please fill-out the dispatching form properly";
		
		if (!json.has("dispatchTrackId") || !(json.get("dispatchTrackId") instanceof String)) {
			validation = errorResult;
		} else if (!json.has("dispatchTypeCd") || !(json.get("dispatchTypeCd") instanceof String)) {
			validation = errorResult;
		} else if (!json.has("fplId") || !(json.get("fplId") instanceof String)) {
			validation = errorResult;
		} else if (!json.has("quantity") || !(json.get("quantity") instanceof String)) {
			validation = errorResult;
		} else if (!json.has("branchId") || !(json.get("branchId") instanceof String)) {
			validation = errorResult;
		} else if (!json.has("destination") || !(json.get("destination") instanceof String)) {
			validation = errorResult;
		} else if (!json.has("dispatchDate") || !(json.get("dispatchDate") instanceof String)) {
			validation = errorResult;
		} else if (json.getString("dispatchTrackId").length() < 1 || json.getString("dispatchTrackId").length() > 14) {
			validation = errorResult;
		} else if (!json.getString("dispatchTrackId").matches("^[0-9]\\d*$")) {
			validation = errorResult;
		} else if (json.getString("fplId").length() < 1 || json.getString("fplId").length() > 14) {
			validation = errorResult;
		} else if (!json.getString("fplId").matches("^[1-9]\\d*$")) {
			validation = errorResult;
		} else if (json.getString("quantity").length() < 1 || json.getString("quantity").length() > 14) {
			validation = errorResult;
		} else if (!json.getString("quantity").matches("^[0-9]+$")) {
			validation = errorResult;
		} else if (json.getString("branchId").length() < 1 || json.getString("branchId").length() > 14) {
			validation = errorResult;
		} else if (!json.getString("branchId").matches("^[1-9]\\d*$")) {
			validation = errorResult;
		} else if (json.getString("dispatchTypeCd").length() < 1 || json.getString("dispatchTypeCd").length() > 10) {
			validation = errorResult;
		} else if (json.getString("destination").length() < 1 || json.getString("destination").length() > 50) {
			validation = errorResult;
		} else {
	        try {
	        	LocalDate.parse(json.getString("dispatchDate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
	        } catch (DateTimeParseException e) {
	        	validation = errorResult;
	        }
		}
		
		return validation;
	}
	
	public String validateQuantity(HttpServletRequest request, List<FinishedProductListEntity> finishedProductList) throws Exception{
		JSONObject json = new JSONObject(request.getParameter("data"));
		String validation = "Please fill-out the dispatching form properly test";

		List<DispatchingEntity> dispatchingEntities = getData(Long.parseLong(json.getString("branchId")));
		
		outerloop:
        for (FinishedProductListEntity finishedProduct : finishedProductList) {
	    	if(finishedProduct.getFplId() == Long.parseLong(json.getString("fplId"))) {
	        	if(finishedProduct.getDateFinished().getTime() > 
	        			(new SimpleDateFormat("yyyy-MM-dd").parse(json.getString("dispatchDate")).getTime())) {
	    			break outerloop;
	        	}
	    		if(Long.parseLong(json.getString("dispatchTrackId")) == 0){
	    			if(finishedProduct.getQuantity() < Long.parseLong(json.getString("quantity"))) {
		    			break outerloop;
		    		} else {
		    			validation = "success";
		    			break outerloop;
		    		}
	    		}else {
		    		for(DispatchingEntity dispatchingEntity : dispatchingEntities) {
		    			if(dispatchingEntity.getDispatchTrackId() == Long.parseLong(json.getString("dispatchTrackId"))) {
				    		if((finishedProduct.getQuantity() + dispatchingEntity.getQuantity()) 
				    				< Long.parseLong(json.getString("quantity"))) {
				    			break outerloop;
				    		} else {
				    			validation = "success";
				    			break outerloop;
				    		}
		    			}
		    		}	
	    		}
	    	}
        }

		return validation;
	}

	@Override
	public Long getDispatchCount(Long branchId) throws Exception {
	    return dispatchingDAO.getDispatchCount(branchId);
	}
	

}
