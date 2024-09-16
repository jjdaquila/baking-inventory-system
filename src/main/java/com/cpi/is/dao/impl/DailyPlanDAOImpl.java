package com.cpi.is.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.cpi.is.dao.DailyPlanDAO;
import com.cpi.is.entity.DailyPlanEntity;
import com.cpi.is.util.HBUtil;

public class DailyPlanDAOImpl implements DailyPlanDAO {
	
	@Override
	public List<DailyPlanEntity> getData(Long branchId) throws Exception {
		List<DailyPlanEntity> dailyplannedproduction = null;
		try (Session session = HBUtil.getSessionFactory().openSession()) {
			dailyplannedproduction = (List<DailyPlanEntity>) 
				session.createQuery("From DailyPlanEntity T WHERE T.branchId = :branchId ORDER BY T.dppId DESC", DailyPlanEntity.class)
				.setParameter("branchId", branchId)
				.list();
		}
		return dailyplannedproduction;
	}

	@Override
	public String saveData(DailyPlanEntity item) throws Exception {
		Transaction transaction = null;
		try (Session session = HBUtil.getSessionFactory().openSession()) {
			transaction = session.beginTransaction();
			if (0 == item.getDppId()) {
				item.setDppId(null);
				session.persist(item);
			} else {
				session.merge(item);
			}
			transaction.commit();
		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			
			throw e;
		}
		return "success";
	}

	@Override
	public String deleteData(DailyPlanEntity item) throws Exception {
		Transaction transaction = null;
		try (Session session = HBUtil.getSessionFactory().openSession()) {
			transaction = session.beginTransaction();
			session.remove(item);
			transaction.commit();
		} catch (Exception e) {
			if (transaction != null) {
				transaction.rollback();
			}
			throw e;
		}
		return "success";
	}
	
	public Long getDailyCount(Long branchId) throws Exception {
	    Long count = null;
	    try (Session session = HBUtil.getSessionFactory().openSession()) {
	        count = (Long) session.createQuery("SELECT COUNT(*) FROM DailyPlanEntity T WHERE T.branchId = :branchId", Long.class)
	                              .setParameter("branchId", branchId)
	                              .uniqueResult();
	    }
	    return count;
	}
}
