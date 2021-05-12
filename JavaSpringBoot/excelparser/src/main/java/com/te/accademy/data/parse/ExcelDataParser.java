package com.te.accademy.data.parse;

import java.io.InputStream;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.te.accademy.data.Data;
import com.te.accademy.data.parse.configuration.ParserConfiguration;

public class ExcelDataParser implements DataParser {

	Logger log = Logger.getLogger("ExcelParser");

	private String user;
	private ParserConfiguration parserConfiguration;

	public ExcelDataParser() {
		log.log(Level.INFO, "ExcelDataParser created");
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public ParserConfiguration getParserConfiguration() {
		return parserConfiguration;
	}

	public void setParserConfiguration(ParserConfiguration parserConfiguration) {
		this.parserConfiguration = parserConfiguration;
	}

	public void postProcess() {

	}

	private Workbook getWorkbook(String filename, InputStream is) {
		try {
			/*
			 * if(filename.toLowerCase().endsWith("xlsx")) return StreamingReader.builder()
			 * .rowCacheSize(1000) // number of rows to keep in memory (defaults to 10)
			 * .bufferSize(4096) // buffer size to use when reading InputStream to file
			 * (defaults to 1024) .open(is); // InputStream or File for XLSX file (required)
			 */

			return WorkbookFactory.create(is);
		} catch (Exception e) {
			log.log(Level.SEVERE, e.getMessage());

			return null;
		}

	}

	public Data parse(String filename, InputStream is) throws LoaderException {
		try {
			Data data = new Data();

			Workbook workbook = getWorkbook(filename, is);

			for (int i = 0; i < workbook.getNumberOfSheets(); i++) {

				Sheet sheet = workbook.getSheetAt(i);

				com.te.accademy.data.Sheet dataSheet = processSheet(sheet);
				data.getSheets().add(dataSheet);

			}
			return data;
		} catch (Exception e) {
			log.log(Level.SEVERE, e.getMessage());
		}
		return null;
	}

	private com.te.accademy.data.Sheet processSheet(Sheet sheet) {
		com.te.accademy.data.Sheet dataSheet = new com.te.accademy.data.Sheet();
		dataSheet.setName(sheet.getSheetName());
		Row header = sheet.getRow(0);
		Map<String, String> renaming = parserConfiguration.getConfiguration().getSheets().get(sheet.getSheetName());
		renaming = renaming == null ? new HashMap<String, String>() : renaming;

		Map<String, String> columnMap = new LinkedHashMap<>();
		Map<Integer, String> columnMapByIndex = new LinkedHashMap<>();

		if (header != null)
			for (Cell cell : header) {
				String column = cell.getAddress().formatAsString();
				String newName = renaming.get(column);
				newName = newName == null ? cell.getStringCellValue() : newName;
				newName = newName == null ? column : newName;
				columnMap.put(column, newName);
				columnMapByIndex.put(cell.getColumnIndex(), newName);
			}

		dataSheet.setColumns(columnMap);
		FormulaEvaluator formulaEvaluator = sheet.getWorkbook().getCreationHelper().createFormulaEvaluator();
		DataFormatter dataFormatter = new DataFormatter();

		for (int i = 1; i <= sheet.getLastRowNum(); i++) {
			Row row = sheet.getRow(i);
			Map<String, String> rowMap = new HashMap<>();
			for (Cell c : row) {
				String cellContent = dataFormatter.formatCellValue(c, formulaEvaluator);
				String key = columnMapByIndex.get(c.getColumnIndex());
				key = key == null ? c.getAddress().formatAsString() : key;
				rowMap.put(key, cellContent);
			}
			dataSheet.getRows().add(rowMap);
		}

		return dataSheet;

	}

	private boolean checkIfRowIsEmpty(Row row) {
		if (row == null) {
			return true;
		}
		if (row.getLastCellNum() <= 0) {
			return true;
		}
		for (int cellNum = row.getFirstCellNum(); cellNum < row.getLastCellNum(); cellNum++) {
			Cell cell = row.getCell(cellNum);
			if (cell != null && cell.getCellType() != CellType.BLANK) {
				return false;
			}
		}
		return true;
	}

	@Override
	public Data parse(InputStream is) throws LoaderException {
		return parse("unamed.xlsx", is);
	}

}
