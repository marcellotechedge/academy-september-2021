package com.te.accademy.webapi.datamodel;

public class Country {

	private String continent;

	private String code;

	private String country;

	public Country(String continent, String code, String country) {
		this.continent = continent;
		this.code = code;
		this.country = country;
	}

	public String getContinent() {
		return continent;
	}

	public void setContinent(String continent) {
		this.continent = continent;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
