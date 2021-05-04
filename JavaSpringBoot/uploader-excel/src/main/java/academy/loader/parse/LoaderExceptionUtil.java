package academy.loader.parse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class LoaderExceptionUtil {
	
	@Autowired
	private  Environment env;
	
	private static final String ERROR_PREFIX="error.loader.";
	private static final String ERROR_CODE_SUFFFIX=".code";
	private static Logger log = LogManager.getLogger();
	
	public  LoaderException getGenericLoaderException(String errorKey,Object...values) {

		String message=env.getProperty(ERROR_PREFIX+errorKey,"unexpected");
		String errorCode=env.getProperty(ERROR_PREFIX+errorKey+ERROR_CODE_SUFFFIX,"undefined");
		String fm=null;
		try {
			if(values !=null && values.length >0 && message !=null)
				for(Object v : values) message+=" %s";
			fm=String.format(message, values);
		}
		catch(Exception e) {
			log.error("Error formatting loader exception",e);
			fm=message;
		}
		return new LoaderException(fm, errorCode);
	}
	
	public  LoaderException getLoaderException(String errorKey,Integer columnIndex,Integer rowIndex) {
		errorKey = errorKey == null ? "unexpected" : errorKey;
		LoaderException e =getGenericLoaderException(errorKey);		
		e.setColumnIndex(columnIndex);
		e.setRowIndex(rowIndex);
		
		return e;
		
	}
	
	public  LoaderException getLoaderException(String errorKey,Row row,Cell cell,int columnIndex,Object...values) {
		errorKey = errorKey == null ? "unexpected" : errorKey;
			
		LoaderException e =getGenericLoaderException(errorKey,values);
		
		e.setColumnIndex(columnIndex);
		e.setRowIndex(row.getRowNum());
//		if(cell!=null)
//			e.setAddress(cell.getAddress());
		return e;
		
	}

}
