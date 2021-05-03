package com.te.accademy.webapi.datamodel.view;

import java.io.Serializable;

public class CaseSummary implements Serializable {

	private String countryCode;

	private String continent;

	private String country;

	private Long totalCase;

	private Long totalDeaths;

	public CaseSummary( //
			String countryCode, //
			String continent, //
			String country, //
			Long totalCase, //
			Long totalDeaths //
	) {
		this.countryCode = countryCode;
		this.continent = continent;
		this.country = country;
		this.totalCase = totalCase;
		this.totalDeaths = totalDeaths;
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

	public Long getTotalCase() {
		return totalCase;
	}

	public void setTotalCase(Long totalCase) {
		this.totalCase = totalCase;
	}

	public Long getTotalDeaths() {
		return totalDeaths;
	}

	public void setTotalDeaths(Long totalDeaths) {
		this.totalDeaths = totalDeaths;
	}

}
