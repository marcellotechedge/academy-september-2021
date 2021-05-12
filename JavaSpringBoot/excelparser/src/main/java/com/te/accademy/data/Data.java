package com.te.accademy.data;

import java.util.ArrayList;
import java.util.List;

public class Data {
	
	private String requestId;
	private String user;
	private String configuration;
	
	
	public String getConfiguration() {
		return configuration;
	}

	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	private List<Sheet> sheets = new ArrayList<Sheet>();

	public List<Sheet> getSheets() {
		return sheets;
	}

	public void setSheets(List<Sheet> sheets) {
		this.sheets = sheets;
	}
	
}
