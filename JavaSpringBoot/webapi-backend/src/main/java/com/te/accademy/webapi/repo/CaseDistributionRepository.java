package com.te.accademy.webapi.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.te.accademy.webapi.datamodel.CaseDetail;
import com.te.accademy.webapi.datamodel.CaseDistribution;
import com.te.accademy.webapi.datamodel.Country;

public interface CaseDistributionRepository extends JpaRepository<CaseDistribution, Integer>, CaseSummaryCustomQuery {

	@Query("SELECT DISTINCT new com.te.accademy.webapi.datamodel.Country(c.continentExp, c.countryTerritoryCode, c.countriesAndTerritories) FROM CaseDistribution c")
	List<Country> findDistinctCountries();

	CaseDetail findCaseById(Integer id);
}
