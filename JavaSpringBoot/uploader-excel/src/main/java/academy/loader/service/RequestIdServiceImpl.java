package academy.loader.service;

import java.text.SimpleDateFormat;
import java.util.Date;


import org.apache.commons.lang.RandomStringUtils;
import org.springframework.stereotype.Service;

@Service
public class RequestIdServiceImpl implements RequestIdService {
	
	@Override
	public String getId(String user) {
		
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
		String id = sdf.format(new Date());		
		return String.format("%s_%s_%s", id,user,RandomStringUtils.randomAlphanumeric(5));
	}
	
	@Override
	public String getId() {
		return getId("unknown");
	}

}
