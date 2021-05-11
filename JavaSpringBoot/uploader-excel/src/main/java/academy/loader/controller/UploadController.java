package academy.loader.controller;

import java.io.InputStream;
import java.nio.file.Paths;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import academy.loader.model.Data;
import academy.loader.model.UploadResponse;
import academy.loader.model.UploadResponseStatus;
import academy.loader.service.DataParserService;
import academy.loader.service.RequestIdService;

@RestController
public class UploadController {
	
	private static Logger log = LogManager.getLogger();
	
	@Value("${default.parser.configuration}")
	String defaultConfigurationFile;
	
	@Value("${default.parser.path}")
	String defaultConfigurationPath;
	
	@Value("${upload.queue.name}")
	String uploadQueuename;
	
	@Autowired
	RequestIdService requestIdService;
	
	@Autowired
	DataParserService dataParserService;
	
	@Autowired
	private RabbitTemplate messageBroker;
	
	
	
	@PostMapping("/upload")
	public ResponseEntity<UploadResponse> upload(@RequestParam("user") String user, @RequestPart("file") MultipartFile file) {
		UploadResponse  response = new UploadResponse();
		HttpStatus httpStatus= HttpStatus.OK;
		try {
			InputStream is=file.getInputStream();
			String filename = file.getOriginalFilename();
			Data data =dataParserService.parseData(is, user, filename,getConfigurationPath(defaultConfigurationFile));
			data.setRequestId(requestIdService.getId(user));
			data.setUser(user);
			response.setRequestId(data.getRequestId());
			response.setStatus(UploadResponseStatus.PUBLISHED);
			
			ObjectMapper mapper = new ObjectMapper();
			String json=mapper.writeValueAsString(data);
			
			log.debug("output:"+ json);
			
			messageBroker.convertAndSend(uploadQueuename,json);
		}
		catch(Exception e) {
			log.error("Error on upload",e);
			response.setStatus(UploadResponseStatus.ERROR);	
			httpStatus= HttpStatus.SERVICE_UNAVAILABLE;
		}
		
		return new ResponseEntity<>(response,httpStatus);
	}
	
	private String getConfigurationPath(String jsonFileName) {
		return Paths.get(defaultConfigurationPath,jsonFileName).toString();
	}
	
}
