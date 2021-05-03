package academy.loader.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Sheet {
	
	private String name;
	private List<Map<String,String>> rows = new ArrayList<>();
	private Map<String,String> columns;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Map<String, String>> getRows() {
		return rows;
	}
	public void setRows(List<Map<String, String>> rows) {
		this.rows = rows;
	}
	public Map<String, String> getColumns() {
		return columns;
	}
	public void setColumns(Map<String, String> columns) {
		this.columns = columns;
	}

	
		

}
