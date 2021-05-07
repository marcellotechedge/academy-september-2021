package academy.receiver.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.te.accademy.webapi.client.api.CaseDistroControllerApi;
import com.te.accademy.webapi.client.invoker.ApiClient;

@Configuration
public class WebApiConfig {

	@Value("${webApiUrl}")
	private String webApiUrl;

	@Bean
	public CaseDistroControllerApi caseDistroControllerApi() {
		return new CaseDistroControllerApi(webApiClient());
	}

	@Bean
	public ApiClient webApiClient() {
		return new ApiClient().setBasePath(webApiUrl);
	}
}
