package com.cpi.is.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.cpi.is.entity.DailyPlanEntity;

public interface DailyPlanService {
	
	List<DailyPlanEntity> getData() throws Exception;
	String saveData(HttpServletRequest request) throws Exception;
	String deleteData(HttpServletRequest request) throws Exception;
	String validateData(HttpServletRequest request) throws Exception;
}
