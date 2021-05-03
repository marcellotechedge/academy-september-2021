package com.te.accademy.webapi.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.te.accademy.webapi.datamodel.CaseDistribution;
import com.te.accademy.webapi.datamodel.view.CaseDetail;

public interface CaseDistributionRepository extends JpaRepository<CaseDistribution, Integer>, CaseSummaryCustomQuery {

	public interface Country {

		String getContinent();

		String getCode();

		String getCountry();
	}

	@Query("SELECT DISTINCT c.continentExp as continent, c.countryTerritoryCode as code, c.countriesAndTerritories as country FROM CaseDistribution c")
	List<Country> findDistinctCountries();

	CaseDetail findCaseById(Integer id);
}
