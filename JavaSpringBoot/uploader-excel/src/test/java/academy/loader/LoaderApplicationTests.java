package academy.loader;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import academy.loader.model.Data;
import academy.loader.parse.ExcelDataParser;
import academy.loader.parse.LoaderException;
import academy.loader.parse.configuration.ParseConfiguration;
import academy.loader.parse.configuration.ParserConfiguration;
import academy.loader.service.DataParserService;

@SpringBootTest
@ActiveProfiles("unit-test")
class LoaderApplicationTests {

	@Test
	void contextLoads() {
	}
	
	@Autowired
	ExcelDataParser parser;
	
	@Autowired
	DataParserService parserService;
	

	
	@Test
	public void test2() throws IOException, LoaderException {
		String path= this.getClass().getClassLoader().getResource("configuration.json").getPath();
		InputStream is= this.getClass().getClassLoader().getResourceAsStream("OFF_CON_EXT2004434.xls");
		
		File f= new File(path);
		String content = new String ( Files.readAllBytes( Paths.get(f.getAbsolutePath()) ) );
		ParserConfiguration c= new ParserConfiguration(content);
			
		parser.setParserConfiguration(c);
		Data data = parser.parse("OFF_CON_EXT2004434.xls",is);
		assertNotNull(data);
	}
	
	@Test
	public void test3() throws IOException, LoaderException {
		String path= this.getClass().getClassLoader().getResource("configuration.json").getPath();
		InputStream is= this.getClass().getClassLoader().getResourceAsStream("OFF_CON_EXT2004434.xlsx");
		
		File f= new File(path);
		String content = new String ( Files.readAllBytes( Paths.get(f.getAbsolutePath()) ) );
		ParserConfiguration c= new ParserConfiguration(content);
			
		parser.setParserConfiguration(c);
		Data data =parser.parse("OFF_CON_EXT2004434.xlsx",is);
		assertNotNull(data);		
	}
	
	@Test
	public void testService() {
		String path= this.getClass().getClassLoader().getResource("configuration.json").getPath();
		//test xlsx
		File f= new File(path);
		InputStream is= this.getClass().getClassLoader().getResourceAsStream("OFF_CON_EXT2004434.xlsx");
		
		parserService.parseData(is, "test", "uuu.xlsx",Paths.get(f.getAbsolutePath()).toString());
	}

}
