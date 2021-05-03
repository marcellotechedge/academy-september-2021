package academy.loader.parse.configuration;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class ParserConfiguration {
	
	private ParseConfiguration configuration;
	
	public ParserConfiguration(String json){
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			configuration=mapper.readValue(json, ParseConfiguration.class);
		} catch (JsonProcessingException e) {
			
		}
	}

	public ParseConfiguration getConfiguration() {
		return configuration;
	}

	public void setConfiguration(ParseConfiguration configuration) {
		this.configuration = configuration;
	}
	
	

}
