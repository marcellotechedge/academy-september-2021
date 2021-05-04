package academy.loader.parse;

import java.io.InputStream;

import academy.loader.model.Data;
import academy.loader.parse.configuration.ParserConfiguration;

public interface DataParser {

	public Data parse(InputStream is) throws LoaderException;
	
	public Data parse(String filename,InputStream is) throws LoaderException;

	public String getUser();

	public void setUser(String user);
	
	public ParserConfiguration getParserConfiguration();

	public void setParserConfiguration(ParserConfiguration parserConfiguration);


}
