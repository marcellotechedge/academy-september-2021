package academy.loader.parse;

import java.util.Map;

import org.apache.poi.ss.usermodel.Row;

public interface RowValidator {
	 void validateRow(Row row,Map<Integer,String> fieldsName, int lengthOfDates) throws LoaderException;

}
