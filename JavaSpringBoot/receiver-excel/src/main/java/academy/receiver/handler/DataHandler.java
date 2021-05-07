package academy.receiver.handler;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedClass;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import com.te.accademy.webapi.client.api.CaseDistroControllerApi;
import com.te.accademy.webapi.client.model.CaseDistribution;
import com.te.accademy.webapi.client.model.Country;

import academy.loader.model.Data;
import academy.loader.model.Sheet;

@Component
public class DataHandler {

	@Autowired
	private CaseDistroControllerApi caseDistroControllerApi;

	Map<String, Country> countryMap = new HashMap<String, Country>();

	@PostConstruct
	private void init() {
		List<Country> countries = caseDistroControllerApi.getAllUsingGET();
		for (Country country : countries) {
			countryMap.put(country.getCountry(), country);
		}
	}

	static class CaseDistributionBuilder {
		String country;
		Date date;
		BigDecimal notificationRate;
		Integer casesWeekly;
		Integer deathsWeekly;

		public CaseDistributionBuilder withCountry(String country) {
			this.country = country;

			return this;
		}

		public CaseDistributionBuilder withDate(String date) throws Exception {
			SimpleDateFormat df = new SimpleDateFormat("d/M/yy");
			this.date = df.parse(date);

			return this;
		}

		public CaseDistributionBuilder withNotificationRate(String notificationRate) throws Exception {
			this.notificationRate = new BigDecimal(notificationRate.replaceAll(",", "."));

			return this;
		}

		public CaseDistributionBuilder withCasesWeekly(String casesWeekly) throws Exception {
			this.casesWeekly = Integer.parseInt(casesWeekly);

			return this;
		}

		public CaseDistributionBuilder withDeathsWeekly(String deathsWeekly) throws Exception {
			this.deathsWeekly = Integer.parseInt(deathsWeekly);

			return this;
		}

		public CaseDistribution build() {
			CaseDistribution n = new CaseDistribution();

			n.setCasesWeekly(this.casesWeekly);
			n.setYearWeek(date);
			n.setCountriesAndTerritories(country);
			n.setNotificationRate(notificationRate);
			n.setDeathsWeekly(deathsWeekly);

			return n;
		}
	}

	public void receiveMessage(String message) {
		System.out.println("received : " + message);
		ObjectMapper mapper = new ObjectMapper();
		try {
			Data data = mapper.readValue(message, Data.class);

			System.out.println("from json:" + mapper.writerWithDefaultPrettyPrinter().writeValueAsString(data));

			mapper.setAnnotationIntrospector(new JacksonAnnotationIntrospector() { //
				@Override
				public Class<?> findPOJOBuilder(AnnotatedClass ac) { //
					if (CaseDistribution.class.equals(ac.getRawType())) { //
						return CaseDistributionBuilder.class;
					}
					return super.findPOJOBuilder(ac);
				} //
			});

			for (Sheet sheet : data.getSheets()) {
				for (Map<String, String> row : sheet.getRows()) {
					CaseDistribution c = mapper.convertValue(row, CaseDistribution.class);
					Country country = countryMap.get(c.getCountriesAndTerritories());
					if (c != null) {
						c.setContinentExp(country.getContinent());
						c.setCountryTerritoryCode(country.getCode());
					}

					System.out.println("c:" + mapper.writerWithDefaultPrettyPrinter().writeValueAsString(c));
					
					caseDistroControllerApi.insertCaseUsingPOST(c);
				}
			}

		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
