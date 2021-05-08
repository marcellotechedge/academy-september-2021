package com.te.accademy.webapi.datamodel;

import java.math.BigInteger;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class CaseDetail {

	private Integer id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd	HH:mm:ss")
	private Date dateRep;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dateRepString;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM")
	private Date yearWeek;

	private Integer casesWeekly;

	private Integer deathsWeekly;

	private String countryCode;

	private String continent;

	private String country;

	private BigInteger popData2019;

	private Double average;

	public CaseDetail(//
			Integer id, //
			Integer casesWeekly, //
			String continentExp, //
			String countriesAndTerritories, //
			String countryTerritoryCode, //
			Integer deathsWeekly, //
			BigInteger popData2019, //
			Date yearWeek //
	) {
		this.id = id;
		this.casesWeekly = casesWeekly;
		this.continent = continentExp;
		this.country = countriesAndTerritories;
		this.countryCode = countryTerritoryCode;
		this.deathsWeekly = deathsWeekly;
		this.dateRep = yearWeek;
		this.dateRepString = yearWeek;
		this.popData2019 = popData2019;
		this.yearWeek = yearWeek;
		this.average = 0.0;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDateRep() {
		return dateRep;
	}

	public void setDateRep(Date dateRep) {
		this.dateRep = dateRep;
	}

	public Date getDateRepString() {
		return dateRepString;
	}

	public void setDateRepString(Date dateRepString) {
		this.dateRepString = dateRepString;
	}

	public Date getYearWeek() {
		return yearWeek;
	}

	public void setYearWeek(Date yearWeek) {
		this.yearWeek = yearWeek;
	}

	public Integer getCasesWeekly() {
		return casesWeekly;
	}

	public void setCasesWeekly(Integer casesWeekly) {
		this.casesWeekly = casesWeekly;
	}

	public Integer getDeathsWeekly() {
		return deathsWeekly;
	}

	public void setDeathsWeekly(Integer deathsWeekly) {
		this.deathsWeekly = deathsWeekly;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getContinent() {
		return continent;
	}

	public void setContinent(String continent) {
		this.continent = continent;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public BigInteger getPopData2019() {
		return popData2019;
	}

	public void setPopData2019(BigInteger popData2019) {
		this.popData2019 = popData2019;
	}

	public Double getAverage() {
		return average;
	}

	public void setAverage(Double average) {
		this.average = average;
	}

}
