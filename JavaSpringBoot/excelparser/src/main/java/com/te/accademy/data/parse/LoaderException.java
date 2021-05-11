package com.te.accademy.data.parse;

import org.apache.poi.ss.util.CellAddress;

public class LoaderException extends Exception {
	

	private static final long serialVersionUID = 1L;
	
	private int rowIndex=-1,columnIndex=-1;
	private String message;
	private String errorCode;
	private CellAddress address;
	
	
	
	public CellAddress getAddress() {
		return address;
	}

	public void setAddress(CellAddress address) {
		this.address = address;
	}

	public LoaderException(int row,int column,String message) {
		this.rowIndex=row;
		this.columnIndex=column;
		this.message=message;
	}
	
	public LoaderException(int row,int column,String message,String errorCode) {
		this.rowIndex=row;
		this.columnIndex=column;
		this.message=message;
		this.errorCode=errorCode;
	}
	
	public LoaderException(String message,String errorCode) {
		this.message=message;
		this.errorCode=errorCode;
	}
	


	public int getRowIndex() {
		return rowIndex;
	}

	public void setRowIndex(int rowIndex) {
		this.rowIndex = rowIndex;
	}

	public int getColumnIndex() {
		return columnIndex;
	}

	public void setColumnIndex(int columnIndex) {
		this.columnIndex = columnIndex;
	}

	public String getMessage() {
		if((rowIndex != -1))
			return String.format(message+" row %s column %s %s", rowIndex+1,columnIndex+1,address!=null? address.toString():"");
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	
	
	

}
