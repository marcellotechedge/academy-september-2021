package academy.loader.service;

import java.io.InputStream;

import academy.loader.model.Data;

public interface DataParserService {

	Data parseData(InputStream is, String user, String fileName, String parserConfigurationFileJson);

	Data parseData(InputStream is, String user, String fileName);

}