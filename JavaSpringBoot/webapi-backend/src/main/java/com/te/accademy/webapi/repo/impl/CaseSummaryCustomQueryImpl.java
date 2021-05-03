package com.te.accademy.webapi.repo.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.util.StringUtils;

import com.te.accademy.webapi.datamodel.CaseDistribution;
import com.te.accademy.webapi.datamodel.view.CaseDetail;
import com.te.accademy.webapi.datamodel.view.CaseSummary;
import com.te.accademy.webapi.repo.CaseSummaryCustomQuery;

public class CaseSummaryCustomQueryImpl implements CaseSummaryCustomQuery {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<CaseSummary> findCaseSummaries(Date from, Date to, String country) {

		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<CaseSummary> query = cb.createQuery(CaseSummary.class);

		Root<CaseDistribution> root = query.from(CaseDistribution.class);

		query.multiselect(//
				root.get("countryTerritoryCode"), //
				root.get("countriesAndTerritories"), //
				root.get("continentExp"), //
				cb.sum(root.get("casesWeekly")).alias("totalCase"), //
				cb.sum(root.get("deathsWeekly")).alias("totalDeaths") //
		);

		List<Predicate> predicates = new ArrayList<>();
		if (StringUtils.hasText(country)) {
			predicates.add(cb.equal(root.get("countryTerritoryCode"), country));
		}

		if (from != null) {
			predicates.add(cb.greaterThanOrEqualTo(root.<Date>get("yearWeek"), from));
		}

		if (to != null) {
			predicates.add(cb.lessThanOrEqualTo(root.<Date>get("yearWeek"), to));
		}

		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

		query.groupBy(//
				root.get("countryTerritoryCode"), //
				root.get("countriesAndTerritories"), //
				root.get("continentExp") //
		);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<CaseDetail> findCaseDetails(Date from, Date to, String country) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<CaseDetail> query = cb.createQuery(CaseDetail.class);
		Root<CaseDistribution> root = query.from(CaseDistribution.class);

		List<Predicate> predicates = new ArrayList<>();
		if (StringUtils.hasText(country)) {
			predicates.add(cb.equal(root.get("countryTerritoryCode"), country));
		}

		if (from != null) {
			predicates.add(cb.greaterThanOrEqualTo(root.<Date>get("yearWeek"), from));
		}

		if (to != null) {
			predicates.add(cb.lessThanOrEqualTo(root.<Date>get("yearWeek"), to));
		}

		query.select(cb.construct(CaseDetail.class, //
				root.get("id"), //
				root.get("casesWeekly"), //
				root.get("continentExp"), //
				root.get("countriesAndTerritories"), //
				root.get("countryTerritoryCode"), //
				root.get("deathsWeekly"), //
				root.get("popData2019"), //
				root.get("yearWeek") //
		));
		query.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

		return entityManager.createQuery(query).getResultList();
	}

}
