package academy.receiver.handler;

import org.springframework.stereotype.Component;

import academy.loader.model.Data;

@Component
public class DataHandler {
	
	  public void receiveMessage(String message) {
		  	System.out.println("received : " + message);
	  }
	
}
